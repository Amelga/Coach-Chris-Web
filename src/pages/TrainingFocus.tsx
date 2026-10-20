import { motion } from 'motion/react';
import { Activity, Brain, Zap, Target, BarChart3, PieChart } from 'lucide-react';

const TrainingFocus = () => {
  const focusAreas = [
    {
      icon: Activity,
      title: 'Technical Skills Focus',
      items: [
        'Ball mastery, dribbling, feints & turns',
        'Short, medium, and long-range passing',
        'Receiving surfaces control',
        'Shooting mechanics',
        'Crossing & swerve passes'
      ]
    },
    {
      icon: Brain,
      title: 'Tactical Awareness',
      items: [
        'Penetration, depth & support',
        'Pressure, cover, balance',
        'Transition phases',
        'Systems of play',
        'Decision-making speed'
      ]
    },
    {
      icon: Zap,
      title: 'Physical Development',
      items: [
        'Fundamental movement skills',
        'Speed, agility, coordination',
        'Age-appropriate strength',
        'Nutrition & recovery',
        'Injury prevention'
      ]
    },
    {
      icon: Target,
      title: 'Session Methodology',
      items: [
        'Guided discovery questioning',
        'Small-sided games intensity',
        'Modeled demonstrations',
        'Cognitive-loaded drills',
        'Competency matrix tracking'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Performance Data</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">Training Focus & Outcomes</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Our training is built on four pillars of excellence, ensuring a balanced development that prepares players for the highest levels of the game.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: 'Development Stages', val: '5' },
            { label: 'Ball Touches / Session', val: '300+' },
            { label: 'Max Coaching Hours / Year', val: '540' },
            { label: 'Player Retention Rate', val: '98%' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <p className="text-5xl font-black text-brand-lime mb-2">{stat.val}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {focusAreas.map((area, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-lime/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-all duration-300">
                  <area.icon size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase">{area.title}</h3>
              </div>
              <ul className="space-y-4">
                {area.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-4 text-white/60 group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 bg-brand-lime rounded-full" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* AI Analytics Teaser */}
        <div className="glass-card p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">AI-Driven <br />Performance Tracking</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                We use advanced computer vision and wearable data to track every movement, touch, and tactical decision. Our proprietary AI engine analyzes this data to provide personalized feedback and adjust the training intensity in real-time.
              </p>
              <div className="flex gap-8">
                <div>
                  <BarChart3 className="text-brand-lime mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">Real-time Stats</p>
                </div>
                <div>
                  <PieChart className="text-brand-lime mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">Growth Analysis</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Analytics Dashboard" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center animate-pulse">
                    <Activity className="text-black" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingFocus;
