import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Programs = () => {
  const { formatPrice, t } = useSettings();

  const programs = [
    {
      title: 'Individual Assessment',
      price: 0,
      isFree: true,
      period: '/HR',
      features: [
        '1-on-1 technical focus',
        'Tailored to player\'s stage',
        'Competency assessment',
        'Development report'
      ],
      cta: 'Book Now',
      popular: false
    },
    {
      title: 'Development Package',
      price: 2400,
      isFree: false,
      period: '/ PERSON / 8 SESSIONS',
      features: [
        '8 structured sessions',
        'Stage-aligned curriculum',
        'Competency matrix tracking',
        'Monthly progress report',
        'Parent consultation'
      ],
      cta: 'Book Package',
      popular: true
    },
    {
      title: 'Team / Group Training',
      price: 800,
      isFree: false,
      period: '/ PERSON / 8 SESSIONS',
      features: [
        'Per Person rate',
        '8 structured sessions',
        'Tactical & technical focus',
        'Small-sided formats',
        'Group dynamic development'
      ],
      cta: 'Enquire',
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Book a Session</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">{t('programs')}</h1>
          <p className="text-xl text-[var(--text-primary)]/60 max-w-3xl mx-auto">
            Select the program that best fits your development needs. From 1-on-1 mastery to team excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {programs.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 flex flex-col relative ${p.popular ? 'border-brand-lime shadow-2xl shadow-brand-lime/10 scale-105 z-10 pt-16' : ''}`}
            >
              {p.popular && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-brand-lime text-black font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-black mb-2 uppercase">{p.title}</h3>
              <div className="flex flex-col gap-1 mb-8">
                <span className="text-3xl font-black text-brand-lime">
                  {p.isFree ? 'Free' : formatPrice(p.price)}
                </span>
                <span className="text-[9px] font-bold text-[var(--text-primary)]/40 uppercase tracking-widest leading-tight">{p.period}</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[var(--text-primary)]/70">
                    <CheckCircle2 className="text-brand-lime flex-shrink-0" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link 
                to="/contact" 
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all text-center ${p.popular ? 'bg-brand-lime text-black hover:scale-105' : 'bg-white/5 text-[var(--text-primary)] hover:bg-white/10'}`}
              >
                {t(p.cta.toLowerCase().replace(/\s+/g, '')) || p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Program CTA */}
        <div className="glass-card p-12 bg-gradient-to-r from-brand-card to-brand-lime/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black mb-6">Need a Custom <br />Development Plan?</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                We offer bespoke training solutions for elite academies, professional clubs, and individual players looking for long-term mentorship.
              </p>
            </div>
            <Link to="/contact" className="btn-primary whitespace-nowrap">
              Contact for Custom Plan <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
