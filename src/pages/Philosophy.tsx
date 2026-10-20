import { motion } from 'motion/react';
import { User, RefreshCw, Brain, Layout, Star, Quote } from 'lucide-react';

const Philosophy = () => {
  const principles = [
    {
      icon: User,
      title: 'Child-Centered Learning',
      desc: 'Every session places the player\'s individual abilities, interests, and learning styles at the center. Rather than directing from the front, the role of the coach is to serve as a facilitator.'
    },
    {
      icon: RefreshCw,
      title: 'Development Over Results',
      desc: 'Performance improvement is acquired progressively. Competency in foundational skills must precede advancement to complex concepts. We value growth over trophies.'
    },
    {
      icon: Brain,
      title: 'Holistic Player Formation',
      desc: 'Football develops far more than technical skill. Leadership, teamwork, commitment, resilience, and responsibility are cultivated alongside ball mastery.'
    },
    {
      icon: Layout,
      title: 'Structured Curriculum Design',
      desc: 'Built on three core elements — Curriculum Aims, Curriculum Organization, and Curriculum Evaluation — sessions reflect purposeful design and measurable outcomes.'
    }
  ];

  const testimonials = [
    {
      text: "Coach Chris completely transformed my son's relationship with the ball. Within three months, his confidence had improved beyond anything managing in two years.",
      author: "Sarah R.",
      role: "Parent of U8 Player",
      initials: "SR"
    },
    {
      text: "The curriculum design is unlike anything I've seen at this level. Coach Chris understands developmental age, not just chronological age.",
      author: "David M.",
      role: "Club Director",
      initials: "DM"
    },
    {
      text: "I've worked with a lot of coaches, but the way Coach Chris questions players creates real ownership of the game.",
      author: "Jordan K.",
      role: "U17 Player",
      initials: "JK"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Approach & Values</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">Coaching Philosophy</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Our philosophy is rooted in the belief that every child has a unique developmental path. We don't just coach players; we nurture future leaders through the beautiful game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {principles.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group hover:border-brand-lime/30 transition-all"
            >
              <div className="w-16 h-16 bg-brand-lime/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <p.icon className="text-brand-lime w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black mb-6">{p.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth & Development Section */}
        <div className="glass-card p-12 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-8">Growth & Maturation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Physical and emotional changes that occur as people mature affect all aspects of life, including sport. A child-centered coach needs to understand the different phases of development and how they can affect sports performance. We consider not only the player's physical needs but also their social, emotional, and cognitive needs.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The development age of the player is of primary importance. As a player's developmental age can differ by as much as two years from their chronological age, it is important that all content and teaching methodologies are appropriate to development.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">What People Say</span>
          <h2 className="text-4xl md:text-6xl font-black mb-16">Player & Parent Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-brand-lime text-brand-lime" />)}
                  </div>
                  <Quote className="text-brand-lime/20 mb-4" size={40} />
                  <p className="text-[var(--text-primary)] italic mb-8 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-brand-lime">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider">{t.author}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
