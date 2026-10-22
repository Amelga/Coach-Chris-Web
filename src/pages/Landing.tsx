import { motion } from 'motion/react';
import {
  ArrowRight,
  Trophy,
  Users,
  Target,
  Activity,
  ChevronRight,
  CheckCircle2,
  Star,
  Quote,
  Mail,
  Globe,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * One-page landing page.
 *
 * Deliberately database-free: every section is static content so the page renders
 * with no Firestore dependency. The sign-up section links to /join, which holds
 * the real Firebase Auth form (email/password + Google) rather than duplicating
 * the form and its validation here.
 *
 * Content is reused from the existing pages (Home, Programs, Testimonials,
 * DevelopmentModel) so the copy stays consistent across the site.
 */

const STATS = [
  { label: 'Development Stages', value: '5', icon: Target },
  { label: 'Touches / Session', value: '300+', icon: Activity },
  { label: 'Coaching Hours / Year', value: '540', icon: ChevronRight },
  { label: 'Player Retention', value: '98%', icon: Users },
];

const PATHWAY = [
  { id: '01', title: 'Active Start', age: 'Ages 3-5', desc: 'FMS, ball familiarisation, fun-first activities.' },
  { id: '02', title: 'Fundamentals', age: 'Ages 6-8', desc: 'Dribbling, passing introduction, 3v3-5v5 games.' },
  { id: '03', title: 'Learning to Train', age: 'Ages 9-11', desc: 'Specialist positions, passing combinations, 5v5-8v8.' },
  { id: '04', title: 'Training to Train', age: 'Ages 12-14', desc: 'Groups & units, 7v7-11v11.' },
  { id: '05', title: 'Training to Compete', age: 'Ages 15-18', desc: 'Full 11v11, whole-team systems.' },
];

const PROGRAMS = [
  {
    title: 'Individual Assessment',
    price: 'Free',
    period: '/HR',
    features: ['1-on-1 technical focus', "Tailored to player's stage", 'Competency assessment', 'Development report'],
    popular: false,
  },
  {
    title: 'Development Package',
    price: 'AED 2,400',
    period: '/ PERSON / 8 SESSIONS',
    features: [
      '8 structured sessions',
      'Stage-aligned curriculum',
      'Competency matrix tracking',
      'Monthly progress report',
      'Parent consultation',
    ],
    popular: true,
  },
  {
    title: 'Team / Group Training',
    price: 'AED 800',
    period: '/ PERSON / 8 SESSIONS',
    features: [
      'Per Person rate',
      '8 structured sessions',
      'Tactical & technical focus',
      'Small-sided formats',
      'Group dynamic development',
    ],
    popular: false,
  },
];

const REVIEWS = [
  {
    text: "Coach Chris completely transformed my son's relationship with the ball. Within three months, his confidence had improved beyond anything managing in two years.",
    author: 'Sarah R.',
    role: 'Parent of U8 Player',
  },
  {
    text: "The curriculum design is unlike anything I've seen at this level. Coach Chris understands developmental age, not just chronological age. It's science-backed coaching at its best.",
    author: 'David M.',
    role: 'Club Director',
  },
  {
    text: "His focus on holistic development is what sets him apart. My son is not just a better player, but a more resilient and disciplined young man because of this program.",
    author: 'Elena G.',
    role: 'Parent of U14 Player',
  },
];

const BENEFITS = [
  'Child-centred, science-backed methodology',
  'Five-stage pathway from age 3 to 18',
  'Individual development plans and progress reports',
  '300+ ball touches per session',
  'Competency tracking across technical and tactical skills',
  'Parent consultations and transparent feedback',
];

const Landing = () => {
  return (
    <div className="pt-20">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
              Elite Football Development
            </span>
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-[var(--text-primary)]">
              COACH <br />
              <span className="text-brand-lime">CHRIS</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[var(--text-primary)]/80 uppercase tracking-widest mb-8 border-l-4 border-brand-lime pl-6">
              Head Football Coach <br />
              <span className="text-[var(--text-primary)]/40 text-lg">Player Development Specialist</span>
            </p>
            <p className="text-lg text-[var(--text-primary)]/60 max-w-xl mb-10 leading-relaxed">
              Certified football development coach with deep expertise in child-centred methodology, multi-stage player
              progression and tactical curriculum design — developing players from first touch through elite competition.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#join" className="btn-primary">
                Start Now <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#pathway" className="btn-secondary">
                View Pathway
              </a>
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
                alt="Coach Chris leading a training session"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-6 z-20 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center">
                  <Trophy className="text-black" aria-hidden="true" />
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

      {/* --------------------------------------------------------------- Stats */}
      <section className="py-20 bg-[var(--bg-card)]" aria-label="Coaching at a glance">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[var(--text-primary)]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--border-color)]">
                <stat.icon className="text-brand-lime w-8 h-8" aria-hidden="true" />
              </div>
              <p className="text-4xl font-black mb-1 text-[var(--text-primary)]">{stat.value}</p>
              <p className="text-xs uppercase font-bold text-[var(--text-primary)]/40 tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- About */}
      <section id="about" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Approach</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-[var(--text-primary)]">
              Development, <br />
              Not Just Drills
            </h2>
            <p className="text-lg text-[var(--text-primary)]/60 mb-8 leading-relaxed">
              Every player is on their own timeline. Sessions are built around developmental age rather than
              chronological age, so a child always trains at the level that challenges them without overwhelming them.
              The result is technique that holds up under pressure, and players who understand the game rather than
              simply following instructions.
            </p>
            <p className="text-lg text-[var(--text-primary)]/60 mb-10 leading-relaxed">
              From a four-year-old discovering the ball for the first time to a seventeen-year-old preparing for elite
              competition, each stage has a purpose and a measurable outcome.
            </p>
            <Link to="/about" className="btn-secondary inline-flex">
              More About Chris <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-10 space-y-5"
          >
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-lime shrink-0 mt-0.5" size={22} aria-hidden="true" />
                <span className="text-[var(--text-primary)]/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- Pathway */}
      <section id="pathway" className="py-32 px-6 bg-[var(--bg-card)] scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Player Pathway
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">5-Stage Model</h2>
            </div>
            <Link
              to="/pathway"
              className="hidden md:flex items-center gap-2 text-brand-lime font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
            >
              View Full Pathway <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PATHWAY.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 hover:border-brand-lime/50 transition-colors group"
              >
                <span className="text-5xl font-black text-[var(--text-primary)]/10 group-hover:text-brand-lime/20 transition-colors mb-6 block">
                  {stage.id}
                </span>
                <h3 className="text-xl font-black mb-2 text-[var(--text-primary)]">{stage.title}</h3>
                <p className="text-brand-lime text-xs font-bold uppercase tracking-widest mb-4">{stage.age}</p>
                <p className="text-sm text-[var(--text-primary)]/50 leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Programs */}
      <section id="programs" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Programs</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-[var(--text-primary)]">Choose Your Path</h2>
            <p className="text-xl text-[var(--text-primary)]/60 max-w-3xl mx-auto">
              Structured coaching built around measurable development — whether you want a one-off assessment or a
              full-season programme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-10 flex flex-col relative ${
                  program.popular ? 'border-brand-lime/60 lg:scale-105' : ''
                }`}
              >
                {program.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-lime text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-black mb-4 text-[var(--text-primary)]">{program.title}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-black text-brand-lime">{program.price}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]/40 ml-2">
                    {program.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-lime shrink-0 mt-0.5" size={18} aria-hidden="true" />
                      <span className="text-sm text-[var(--text-primary)]/70 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#join" className={program.popular ? 'btn-primary justify-center w-full' : 'btn-secondary justify-center w-full'}>
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-sm text-[var(--text-primary)]/50">
            Looking for something specific?{' '}
            <Link to="/programs" className="font-bold text-brand-lime hover:underline">
              See all programs
            </Link>
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- Testimonials */}
      <section id="testimonials" className="py-32 px-6 bg-[var(--bg-card)] scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">What Families Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.figure
                key={review.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 flex flex-col"
              >
                <Quote className="text-brand-lime/30 mb-6" size={36} aria-hidden="true" />
                <div className="flex gap-1 mb-6" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="text-brand-lime fill-brand-lime" size={16} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-[var(--text-primary)]/70 leading-relaxed mb-8 flex-1">
                  {review.text}
                </blockquote>
                <figcaption>
                  <p className="font-black text-[var(--text-primary)]">{review.author}</p>
                  <p className="text-xs uppercase tracking-widest text-[var(--text-primary)]/40">{review.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <p className="text-center mt-10 text-sm text-[var(--text-primary)]/50">
            <Link to="/testimonials" className="font-bold text-brand-lime hover:underline">
              Read all reviews
            </Link>
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- Signup */}
      <section id="join" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Get Started
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-[var(--text-primary)]">
              Create Your <span className="text-brand-lime">Account</span>
            </h2>
            <p className="text-lg text-[var(--text-primary)]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join the academy to book sessions, follow your development pathway and keep every progress report in one
              place. Sign up with your email or continue with Google.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link to="/join" className="btn-primary text-lg px-12 py-6 justify-center">
                Sign Up Free <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/join" className="btn-secondary text-lg px-12 py-6 justify-center">
                Sign In
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase font-bold tracking-widest text-[var(--text-primary)]/40">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-lime" aria-hidden="true" /> Secure sign-up
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} className="text-brand-lime" aria-hidden="true" /> Free assessment included
              </span>
              <span className="inline-flex items-center gap-2">
                <Users size={16} className="text-brand-lime" aria-hidden="true" /> All ages 3–18
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Contact */}
      <section id="contact" className="py-32 px-6 bg-[var(--bg-card)] scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-[var(--text-primary)]">
            Ready to <span className="text-brand-lime">Develop?</span>
          </h2>
          <p className="text-xl text-[var(--text-primary)]/60 mb-12">
            Get in touch to discuss the right programme for your player, or book your first session directly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-14">
            <Link to="/contact" className="btn-primary text-lg px-12 py-6 justify-center">
              Book a Session <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a href="mailto:chris@coachly.fitness" className="btn-secondary text-lg px-12 py-6 justify-center">
              <Mail size={20} aria-hidden="true" /> Email Chris
            </a>
          </div>

          <ul className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-[var(--text-primary)]/60">
            <li className="inline-flex items-center justify-center gap-2">
              <Mail size={16} className="text-brand-lime" aria-hidden="true" />
              <a href="mailto:chris@coachly.fitness" className="hover:text-brand-lime transition-colors">
                chris@coachly.fitness
              </a>
            </li>
            <li className="inline-flex items-center justify-center gap-2">
              <Globe size={16} className="text-brand-lime" aria-hidden="true" />
              <span>www.coachly.fitness</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Landing;
