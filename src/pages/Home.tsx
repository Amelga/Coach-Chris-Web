import { motion } from 'motion/react';
import { ArrowRight, Trophy, Users, Target, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
            alt="Football field" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-[var(--text-primary)]">
              COACH <br />
              <span className="text-brand-lime">CHRIS</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[var(--text-primary)]/80 uppercase tracking-widest mb-8 border-l-4 border-brand-lime pl-6">
              Head Football Coach <br />
              <span className="text-[var(--text-primary)]/40 text-lg">Player Development Specialist</span>
            </p>
            <p className="text-lg text-[var(--text-primary)]/60 max-w-xl mb-10 leading-relaxed">
              Certified football development coach with deep expertise in child-centered methodology, multi-stage player progression, and tactical curriculum design. Dedicated to developing players from fundamentals through elite competition.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/programs" className="btn-primary">
                Book a Session <ArrowRight size={18} />
              </Link>
              <Link to="/pathway" className="btn-secondary">
                View Pathway
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-brand-lime/20 shadow-2xl shadow-brand-lime/10">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800" 
                alt="Coach Chris" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -left-10 glass-card p-6 z-20 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center">
                  <Trophy className="text-black" />
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-lime">12+ YRS</p>
                  <p className="text-xs uppercase font-bold text-[var(--text-primary)]/40">Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Development Stages', value: '5', icon: Target },
            { label: 'Touches / Session', value: '300+', icon: Activity },
            { label: 'Coaching Hours / Year', value: '540', icon: ChevronRight },
            { label: 'Player Retention', value: '98%', icon: Users },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[var(--text-primary)]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--border-color)]">
                <stat.icon className="text-brand-lime w-8 h-8" />
              </div>
              <p className="text-4xl font-black mb-1 text-[var(--text-primary)]">{stat.value}</p>
              <p className="text-xs uppercase font-bold text-[var(--text-primary)]/40 tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Integration Teaser */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto glass-card p-12 relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-brand-lime/20 to-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
              alt="Data visualization" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">AI-Powered Ecosystem</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-[var(--text-primary)]">Data-Driven <br />Performance</h2>
            <p className="text-lg text-[var(--text-primary)]/60 mb-10">
              We leverage AI-driven analytics to track player progression across 50+ technical and tactical competencies. Get real-time feedback and personalized development blueprints.
            </p>
            <Link to="/focus" className="btn-primary inline-flex">
              Explore Analytics <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Pathway */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Player Pathway</span>
              <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">5-Stage Model</h2>
            </div>
            <Link to="/pathway" className="hidden md:flex items-center gap-2 text-brand-lime font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all">
              View Full Pathway <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { id: '01', title: 'Active Start', age: 'Ages 3-5', desc: 'FMS, ball familiarisation, fun-first activities.' },
              { id: '02', title: 'Fundamentals', age: 'Ages 6-8', desc: 'Dribbling, passing introduction, 3v3-5v5 games.' },
              { id: '03', title: 'Learning to Train', age: 'Ages 9-11', desc: 'Specialist positions, passing combinations, 5v5-8v8.' },
              { id: '04', title: 'Training to Train', age: 'Ages 12-14', desc: 'Groups & units, 7v7-11v11.' },
              { id: '05', title: 'Training to Compete', age: 'Ages 15-18', desc: 'Full 11v11, whole-team systems.' },
            ].map((stage, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 hover:border-brand-lime/50 transition-colors group"
              >
                <span className="text-5xl font-black text-[var(--text-primary)]/10 group-hover:text-brand-lime/20 transition-colors mb-6 block">{stage.id}</span>
                <h3 className="text-xl font-black mb-2 text-[var(--text-primary)]">{stage.title}</h3>
                <p className="text-brand-lime text-xs font-bold uppercase tracking-widest mb-4">{stage.age}</p>
                <p className="text-sm text-[var(--text-primary)]/50 leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-[var(--text-primary)]">Ready to <span className="text-brand-lime">Develop?</span></h2>
          <p className="text-xl text-[var(--text-primary)]/60 mb-12">
            Whether working with a 4-year-old discovering the ball for the first time or a 17-year-old preparing for elite competition — every developmental stage deserves purposeful, expert coaching.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/contact" className="btn-primary text-lg px-12 py-6">
              Book a Session <ArrowRight size={20} />
            </Link>
            <Link to="/programs" className="btn-secondary text-lg px-12 py-6">
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
