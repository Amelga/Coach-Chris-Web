import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

interface Message {
  id?: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: any;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { profile, user } = useUser();
  const location = useLocation();
  
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('chat_session_id');
    if (saved) return saved;
    const newId = `session_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('chat_session_id', newId);
    return newId;
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Firebase Real-time Sync
  useEffect(() => {
    const q = query(
      collection(db, 'chats', sessionId, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveMessage = async (text: string, sender: 'user' | 'ai') => {
    try {
      await addDoc(collection(db, 'chats', sessionId, 'messages'), {
        text,
        sender,
        timestamp: serverTimestamp(),
        sessionId
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  const getSystemInstruction = () => {
    const userRole = profile?.role || 'guest';
    const userName = profile?.displayName || 'Guest';
    const currentPage = location.pathname;
    const onboarded = profile?.onboarded ? 'Yes' : 'No';

    return `You are the Coachly Ecosystem Assistant, a premium AI guide for Coach Chris's football academy.
    
    CURRENT CONTEXT:
    - User: ${userName}
    - Role: ${userRole}
    - Current Page: ${currentPage}
    - Onboarded: ${onboarded}
    
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
    - Reference the current page (${currentPage}) to provide relevant help (e.g., if on /programs, explain the differences between packages).`;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');
    
    // 1. Save locally to Firebase
    await saveMessage(text, 'user');

    // 2. Get AI Response
    setIsTyping(true);
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: {
          systemInstruction: getSystemInstruction()
        }
      });
      
      const aiResponse = result.text || "I'm sorry, I couldn't process that. Coach Chris will get back to you soon.";
      await saveMessage(aiResponse, 'ai');
    } catch (err) {
      console.error("AI Error:", err);
      await saveMessage("I'm having a bit of trouble connecting to my brain. Coach Chris has been notified!", 'ai');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card w-[350px] md:w-[400px] h-[500px] flex flex-col mb-4 overflow-hidden shadow-2xl border-brand-lime/20"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-lime/20 border border-brand-lime/30 rounded-full flex items-center justify-center">
                  <Bot className="text-brand-lime" size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-[var(--text-primary)]">Coachly AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-pulse" />
                    <span className="text-[10px] text-[var(--text-primary)]/40 font-bold uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[var(--bg-card)]"
            >
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-xs text-[var(--text-primary)]/30 font-bold uppercase tracking-widest">Start a conversation</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={msg.id || i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-lime text-black rounded-tr-none shadow-sm' 
                      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none shadow-sm'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={`text-[8px] mt-1 font-bold uppercase opacity-50 ${msg.sender === 'user' ? 'text-black/60' : 'text-[var(--text-primary)]/40'}`}>
                      {msg.sender === 'user' ? 'You' : 'AI Assistant'} • {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-primary)] p-3 rounded-2xl rounded-tl-none border border-[var(--border-color)]">
                    <Loader2 className="animate-spin text-brand-lime" size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2 text-sm focus:border-brand-lime outline-none transition-colors text-[var(--text-primary)]"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-brand-lime text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        drag
        dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 80, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 102, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -8, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-lime/20 backdrop-blur-md text-brand-lime border border-brand-lime/30 rounded-full shadow-2xl flex items-center justify-center relative group cursor-grab active:cursor-grabbing"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full border-2 border-brand-navy shadow-lg" />
        )}
      </motion.button>
    </div>
  );
};
