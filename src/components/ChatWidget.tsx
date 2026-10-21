import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useUser } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

// The Gemini key lives only on the server; the widget talks to /api/chat.
const AI_UNAVAILABLE_MESSAGE = "I'm having a bit of trouble connecting to my brain. Coach Chris has been notified!";

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
  const [uid, setUid] = useState<string | null>(null);

  // Firestore rules scope /chats to the message owner, so every visitor needs an
  // identity — including guests. Signed-in users already have one; guests get an
  // anonymous account. Listen first so an existing session does not trigger a
  // redundant sign-in.
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUid(currentUser.uid);
      } else {
        signInAnonymously(auth).catch((err) => {
          console.error('Anonymous sign-in failed:', err);
          setUid(null);
        });
      }
    });
    return () => unsubAuth();
  }, []);

  // Firebase Real-time Sync
  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, 'chats', sessionId, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        setMessages(msgs);
      },
      // Rules intentionally deny reading sessions that belong to someone else.
      (err) => console.error('Chat sync error:', err)
    );

    return () => unsubscribe();
  }, [sessionId, uid]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveMessage = async (text: string, sender: 'user' | 'ai') => {
    try {
      // uid is persisted so the rules can verify the writer owns the session.
      const authorId = auth.currentUser?.uid || uid;
      if (!authorId) return;
      await addDoc(collection(db, 'chats', sessionId, 'messages'), {
        text,
        sender,
        timestamp: serverTimestamp(),
        sessionId,
        uid: authorId
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  const getSystemInstruction = () => {
    // The system prompt now lives server-side in api/chat.ts. Kept as the first
    // user message so the assistant still receives the per-request context the
    // widget already had, while the model instruction itself stays private.
    const userRole = profile?.role || 'guest';
    const userName = profile?.displayName || 'Guest';
    const currentPage = location.pathname;
    const onboarded = profile?.onboarded ? 'Yes' : 'No';

    return `[Context for this conversation] User: ${userName} | Role: ${userRole} | Current page: ${currentPage} | Onboarded: ${onboarded}`;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');
    
    // 1. Save locally to Firebase
    await saveMessage(text, 'user');

    // 2. Get AI Response from the server-side proxy (the key never reaches the browser)
    setIsTyping(true);
    try {
      // Rebuild conversation history from Firestore, plus the per-request context line.
      const history = messages
        .filter((msg) => msg.text && msg.text.trim().length > 0)
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        }));
      const payloadMessages = [
        { role: 'user', content: getSystemInstruction() },
        ...history,
        { role: 'user', content: text },
      ].slice(-20);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok) {
        await saveMessage(AI_UNAVAILABLE_MESSAGE, 'ai');
        return;
      }

      const data = (await response.json()) as { reply?: string };
      const aiResponse = data?.reply?.trim() || "I'm sorry, I couldn't process that. Coach Chris will get back to you soon.";
      await saveMessage(aiResponse, 'ai');
    } catch (err) {
      console.error("AI Error:", err);
      await saveMessage(AI_UNAVAILABLE_MESSAGE, 'ai');
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
