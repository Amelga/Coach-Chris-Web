import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ChevronDown, Trophy, Target, Users, BookOpen, 
  Calendar, Award, Activity, MessageSquare, Mail, Phone, 
  Globe, Instagram, Twitter, Facebook, ArrowRight, CheckCircle2
} from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Philosophy from './pages/Philosophy';
import DevelopmentModel from './pages/DevelopmentModel';
import Curriculum from './pages/Curriculum';
import TrainingFocus from './pages/TrainingFocus';
import Programs from './pages/Programs';
import Drills from './pages/Drills';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import CoachDashboard from './pages/dashboards/CoachDashboard';
import { ChatWidget } from './components/ChatWidget';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { UserProvider, useUser } from './context/UserContext';
import { Navigate } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
  subItems?: { name: string; path: string }[];
}

const CoachlyLogo = ({ size = "w-10 h-10" }: { size?: string }) => (
  <div className={`${size} flex items-center justify-center p-1`}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="2" y="4" width="6" height="6" rx="1.5" fill="currentColor" className="text-brand-lime" />
      <rect x="16" y="4" width="6" height="6" rx="1.5" fill="currentColor" className="text-brand-lime" />
      <rect x="9" y="14" width="6" height="6" rx="1.5" fill="currentColor" className="text-brand-lime" />
    </svg>
  </div>
);

const NavDropdown = ({ item, scrolled }: { item: NavItem, scrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useSettings();

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-brand-lime transition-colors py-2 ${isOpen ? 'text-brand-lime' : 'text-[var(--text-primary)]/70'}`}
      >
        {t(item.name.toLowerCase())}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 glass-card p-2 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {item.subItems?.map((sub) => (
                <Link
                  key={sub.name + sub.path}
                  to={sub.path}
                  className={`text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-all hover:bg-white/5 hover:text-brand-lime ${location.pathname === sub.path ? 'text-brand-lime bg-white/5' : 'text-[var(--text-primary)]/60'}`}
                >
                  {t(sub.name.toLowerCase().replace(/\s+/g, '')) || sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { t } = useSettings();
  const { user, profile, signIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { 
      name: 'Home', 
      path: '/',
      subItems: [
        { name: 'Coach', path: '/about' },
        { name: 'About Coachly', path: '/about' },
        { name: 'Pathway', path: '/pathway' },
        { name: 'Philosophy', path: '/philosophy' },
        { name: 'Settings', path: '/settings' },
      ]
    },
    { 
      name: 'Programs', 
      path: '/programs',
      subItems: [
        { name: 'Curriculum', path: '/curriculum' },
        { name: 'Drills', path: '/drills' },
        { name: 'Pricing', path: '/programs' },
      ]
    },
    { name: 'Pricing', path: '/programs' },
    { name: 'Reviews', path: '/testimonials' },
  ];

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md py-4 border-b border-[var(--border-color)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <CoachlyLogo />
          <span className="font-display text-3xl font-black tracking-tighter uppercase group-hover:text-brand-lime transition-colors text-[var(--text-primary)] flex items-center">
            Coachly<span className="w-2 h-2 bg-brand-lime ml-1 rounded-sm" />
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.subItems ? (
                <NavDropdown item={link} scrolled={scrolled} />
              ) : (
                <Link 
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-widest hover:text-brand-lime transition-colors ${location.pathname === link.path ? 'text-brand-lime' : 'text-[var(--text-primary)]/70'}`}
                >
                  {t(link.name.toLowerCase())}
                </Link>
              )}
            </div>
          ))}
          {user ? (
            <Link to="/dashboard" className="btn-primary py-2 px-6 text-xs">
              Dashboard
            </Link>
          ) : (
            <button onClick={signIn} className="btn-primary py-2 px-6 text-xs">
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[var(--bg-primary)] border-b border-[var(--border-color)] lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-2">
                  {link.subItems ? (
                    <>
                      <button 
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="flex items-center justify-between text-lg font-bold uppercase tracking-wider text-[var(--text-primary)]"
                      >
                        {t(link.name.toLowerCase())}
                        <ChevronDown size={20} className={`transition-transform ${mobileDropdowns[link.name] ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileDropdowns[link.name] && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-3 pl-4 overflow-hidden"
                          >
                            {link.subItems.map((sub) => (
                              <Link 
                                key={sub.name} 
                                to={sub.path} 
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]/60 hover:text-brand-lime"
                              >
                                {t(sub.name.toLowerCase().replace(/\s+/g, '')) || sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)]"
                    >
                      {t(link.name.toLowerCase())}
                    </Link>
                  )}
                </div>
              ))}
              {user ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary justify-center mt-4">
                  Dashboard
                </Link>
              ) : (
                <button onClick={() => { signIn(); setIsOpen(false); }} className="btn-primary justify-center mt-4">
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useSettings();
  return (
    <footer className="bg-[var(--bg-primary)] py-20 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 group">
            <CoachlyLogo size="w-8 h-8" />
            <span className="font-display text-2xl font-black uppercase group-hover:text-brand-lime transition-colors text-[var(--text-primary)] flex items-center">
              Coachly<span className="w-1.5 h-1.5 bg-brand-lime ml-1 rounded-sm" />
            </span>
          </div>
          <p className="text-[var(--text-primary)]/50 max-w-md mb-8">
            Dedicated to developing players from fundamentals through elite competition, across all five stages of the developmental pathway — ages 3 through 18.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center hover:bg-brand-lime hover:text-black transition-all text-[var(--text-primary)]">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center hover:bg-brand-lime hover:text-black transition-all text-[var(--text-primary)]">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center hover:bg-brand-lime hover:text-black transition-all text-[var(--text-primary)]">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold mb-6 text-brand-lime">Quick Links</h4>
          <ul className="space-y-4 text-sm text-[var(--text-primary)]/60">
            <li><Link to="/about" className="hover:text-brand-lime">{t('aboutCoach')}</Link></li>
            <li><Link to="/pathway" className="hover:text-brand-lime">{t('pathway')}</Link></li>
            <li><Link to="/curriculum" className="hover:text-brand-lime">{t('curriculum')}</Link></li>
            <li><Link to="/programs" className="hover:text-brand-lime">{t('programs')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-6 text-brand-lime">Contact</h4>
          <ul className="space-y-4 text-sm text-[var(--text-primary)]/60">
            <li className="flex items-center gap-2"><Mail size={16} /> chris@coachly.fitness</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +971 52 962 7774</li>
            <li className="flex items-center gap-2"><Globe size={16} /> www.coachly.fitness</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-primary)]/30">
        <p>© 2025 COACHLY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const DashboardRedirect = () => {
  const { user, profile, loading } = useUser();
  
  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (!profile?.onboarded) return <Navigate to="/onboarding" />;
  
  if (profile.role === 'coach') return <CoachDashboard />;
  return <ClientDashboard />;
};

export default function App() {
  return (
    <UserProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/philosophy" element={<Philosophy />} />
                <Route path="/pathway" element={<DevelopmentModel />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/focus" element={<TrainingFocus />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/drills" element={<Drills />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<DashboardRedirect />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </Router>
      </SettingsProvider>
    </UserProvider>
  );
}
