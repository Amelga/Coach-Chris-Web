import { GoogleGenAI } from "@google/genai";

/**
 * POST /api/chat — server-side Gemini proxy for the Coachly chat widget.
 *
 * Why this exists: the widget used to construct a GoogleGenAI client in the
 * browser with VITE_GEMINI_API_KEY, which inlines the key into the public JS
 * bundle. The key now lives only in the server environment as GEMINI_API_KEY
 * and never reaches the client. Only { reply } is ever returned.
 */

// Minimal structural types for the Vercel Node runtime. Declared locally so the
// function does not need the @vercel/node dev dependency.
interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
}

// ---- Limits ---------------------------------------------------------------

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 12000;

const MODEL = "gemini-3-flash-preview";

/**
 * Rate limiting.
 *
 * In-memory fixed-window counter, keyed by client IP. This is intentionally
 * simple and has two known limits:
 *   1. It resets whenever the serverless instance is recycled (cold start) and
 *      is not shared between concurrent instances, so a determined caller can
 *      exceed the nominal budget by spreading requests.
 *   2. On Vercel the client IP comes from x-forwarded-for, which a caller can
 *      spoof when talking to the function directly.
 * A durable limiter (Upstash Redis / Vercel KV) is the correct later upgrade;
 * this is enough to stop accidental loops and casual abuse.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (rateLimitBuckets.size > 5000) {
    for (const [key, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
    }
  }

  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

function getClientIp(req: ApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (typeof raw === "string" && raw.length > 0) return raw.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

// ---- Input validation -----------------------------------------------------

type ChatRole = "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

type ValidationResult =
  | { ok: true; messages: { role: ChatRole; parts: { text: string }[] }[] }
  | { ok: false; error: string };

function parseBody(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "Body must be a JSON object." };
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages)) {
    return { ok: false, error: "Field 'messages' must be an array." };
  }
  if (messages.length === 0) {
    return { ok: false, error: "Field 'messages' must not be empty." };
  }
  if (messages.length > MAX_MESSAGES) {
    return { ok: false, error: `At most ${MAX_MESSAGES} messages are allowed.` };
  }

  let totalChars = 0;
  const cleaned: ChatMessage[] = [];

  for (const entry of messages) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return { ok: false, error: "Each message must be an object." };
    }
    const { role, content } = entry as { role?: unknown; content?: unknown };

    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "Each message role must be 'user' or 'assistant'." };
    }
    if (typeof content !== "string") {
      return { ok: false, error: "Each message content must be a string." };
    }

    const text = content.trim();
    if (text.length === 0) {
      return { ok: false, error: "Message content must not be empty." };
    }
    if (text.length > MAX_CHARS_PER_MESSAGE) {
      return { ok: false, error: `Each message must be at most ${MAX_CHARS_PER_MESSAGE} characters.` };
    }

    totalChars += text.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      return { ok: false, error: `Total message size must be at most ${MAX_TOTAL_CHARS} characters.` };
    }

    cleaned.push({ role, content: text });
  }

  return {
    ok: true,
    messages: cleaned.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
  };
}

// ---- System prompt --------------------------------------------------------
// Moved verbatim from the browser widget (src/components/ChatWidget.tsx) so it
// is no longer shipped to or editable by the client.

function buildSystemInstruction(): string {
  return `You are the Coachly Ecosystem Assistant, a premium AI guide for Coach Chris's football academy.

    ECOSYSTEM KNOWLEDGE:
    1. PROGRAMS & PRICING:
       - Individual Assessment: Free/HR. Focus on 1-on-1 technical mastery and competency report.
       - Development Package: 2400 AED (8 sessions). Includes stage-aligned curriculum, matrix tracking, and parent consultation.
       - Team / Group Training: 800 AED/person (8 sessions). Focus on tactical dynamics and small-sided games.
    2. PATHWAY: 5-stage developmental model for ages 3-18.
    3. DASHBOARDS:
       - Clients (Players/Parents) have a dashboard at /dashboard to track sessions, reports, and achievements.
       - Coaches have a dashboard at /dashboard to manage players and academy analytics.
    4. ONBOARDING: New users go through /onboarding to set their age, experience, and goals.
    5. NAVIGATION:
       - /programs: View pricing and book.
       - /pathway: Learn about the 5 stages.
       - /curriculum: Details on technical/tactical focus.
       - /contact: Direct booking and Telegram support.
       - /settings: Change language (EN/AR/ES), currency (AED/USD/EUR), and theme.

    GUIDELINES:
    - If GUEST: Encourage them to explore /programs or /pathway. Suggest signing up to start their Onboarding flow.
    - If CLIENT: Help them navigate their dashboard or find specific drills/curriculum details.
    - If COACH: Assist with academy management queries.
    - Be professional, energetic, and concise. Use football metaphors where appropriate.
    - If you don't know something, suggest they message Coach Chris directly via the /contact page (Telegram).
    - Only answer questions about the Coachly academy, its programmes, pathway and booking flow.`;
}

// ---- Handler --------------------------------------------------------------

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { allowed, retryAfterSeconds } = checkRateLimit(getClientIp(req));
  if (!allowed) {
    res.setHeader("Retry-After", String(retryAfterSeconds));
    res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
    return;
  }

  // Vercel parses JSON bodies automatically; tolerate a raw string body too.
  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Body must be valid JSON." });
      return;
    }
  }

  const parsed: ValidationResult = parseBody(body);
  if (parsed.ok === false) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Configuration error: log server-side only, never echo details to the client.
    console.error("api/chat: GEMINI_API_KEY is not set in the server environment.");
    res.status(500).json({ error: "The assistant is temporarily unavailable. Please try again later." });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: MODEL,
      contents: parsed.messages,
      config: { systemInstruction: buildSystemInstruction() },
    });

    const reply = (result.text || "").trim();
    if (!reply) {
      res.status(502).json({ error: "The assistant could not produce a reply. Please try again." });
      return;
    }

    res.status(200).json({ reply });
  } catch (err) {
    // Log a short server-side reason class only; never the token, key or upstream body.
    const status = (err as { status?: number })?.status;
    console.error("api/chat: upstream Gemini call failed", typeof status === "number" ? `(status ${status})` : "");

    if (status === 429) {
      res.status(429).json({ error: "The assistant is busy right now. Please try again shortly." });
      return;
    }
    if (typeof status === "number" && status >= 400 && status < 500) {
      res.status(502).json({ error: "The assistant is temporarily unavailable. Please try again later." });
      return;
    }
    res.status(502).json({ error: "The assistant is temporarily unavailable. Please try again later." });
  }
}
