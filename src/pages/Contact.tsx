import { motion } from 'motion/react';
import { Mail, Phone, Globe, MapPin, Send, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      playerName: formData.get('playerName'),
      playerAge: formData.get('playerAge'),
      parentEmail: formData.get('parentEmail'),
      programInterest: formData.get('programInterest'),
      message: formData.get('message'),
    };

    try {
      const mailtoLink = `mailto:chris@coachly.fitness?subject=Booking Request - ${data.programInterest}&body=Player: ${data.playerName}%0DAge: ${data.playerAge}%0DEmail: ${data.parentEmail}%0DProgram: ${data.programInterest}%0D%0D${data.message || ''}`;
      window.location.href = mailtoLink;
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to open email client. Please email us directly at chris@coachly.fitness');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get in Touch</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8">Start Your <br />Journey</h1>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Ready to take your game to the next level? Fill out the form below or reach out via our contact details. We'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-black">chris@coachly.fitness</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-xl font-black">+971 52 962 7774</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-black">Regional Football Academy, Dubai</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 md:p-12"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-brand-lime" size={40} />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Message Sent!</h3>
                <p className="text-white/60 mb-8">
                  Thank you for reaching out. Coach Chris has received your request and will contact you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary w-full justify-center"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Player Name</label>
                    <input 
                      required
                      name="playerName"
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-lime outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Player Age</label>
                    <input 
                      required
                      name="playerAge"
                      type="number" 
                      placeholder="12"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-lime outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Parent Email</label>
                  <input 
                    required
                    name="parentEmail"
                    type="email" 
                    placeholder="parent@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-lime outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Program Interest</label>
                  <select 
                    name="programInterest"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-lime outline-none transition-colors appearance-none"
                  >
                    <option className="bg-brand-navy">Individual Session</option>
                    <option className="bg-brand-navy">Development Package</option>
                    <option className="bg-brand-navy">Team Training</option>
                    <option className="bg-brand-navy">Custom Plan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="Tell us about your player's goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-lime outline-none transition-colors"
                  />
                </div>
                
                {error && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>
                )}

                <button 
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-32 glass-card h-96 overflow-hidden relative">
          <div className="absolute inset-0 bg-brand-navy/60 z-10 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="text-brand-lime mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-black mb-2">Visit Our Academy</h3>
              <p className="text-white/60">Dubai Sports City, United Arab Emirates</p>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1524168272322-bf73616d995e?auto=format&fit=crop&q=80&w=1200" 
            alt="Map placeholder" 
            className="w-full h-full object-cover grayscale opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
