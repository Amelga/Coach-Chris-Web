import { motion } from 'motion/react';
import { Target, Activity, Users, Trophy, ChevronRight } from 'lucide-react';

const DevelopmentModel = () => {
  const stages = [
    {
      id: '01',
      title: 'Active Start',
      age: 'Ages 3-5',
      focus: 'FMS, ball familiarisation, fun-first activities.',
      details: [
        'Fundamental movement skills (running, jumping, skipping)',
        'Ball familiarization and dribbling skills (one ball per child)',
        'Simple, fun sessions with high variety',
        'Emphasis on effort and praise over winning'
      ],
      color: 'from-blue-500/20 to-transparent'
    },
    {
      id: '02',
      title: 'Fundamentals',
      age: 'Ages 6-8',
      focus: 'Dribbling, passing introduction, 3v3-5v5 games.',
      details: [
        'Introduction to basic passing and receiving',
        'Focus on 1v1 attacking and defending',
        'Small-sided games (3v3 to 5v5)',
        'Developing technical confidence on the ball'
      ],
      color: 'from-green-500/20 to-transparent'
    },
    {
      id: '03',
      title: 'Learning to Train',
      age: 'Ages 9-11',
      focus: 'Specialist positions, passing combinations, 5v5-8v8.',
      details: [
        'Introduction to specialist positions',
        'Developing tactical awareness and decision making',
        'Advanced passing combinations and support play',
        'Transition from 5v5 to 8v8 formats'
      ],
      color: 'from-yellow-500/20 to-transparent'
    },
    {
      id: '04',
      title: 'Training to Train',
      age: 'Ages 12-14',
      focus: 'Groups & units, 7v7-11v11.',
      details: [
        'Focus on group and unit tactics',
        'Positional specialization and role clarity',
        'Transition to full 11v11 soccer',
        'Increased physical and mental conditioning'
      ],
      color: 'from-orange-500/20 to-transparent'
    },
    {
      id: '05',
      title: 'Training to Compete',
      age: 'Ages 15-18',
      focus: 'Full 11v11, whole-team systems.',
      details: [
        'Whole-team systems and tactical flexibility',
        'High-performance competition preparation',
        'Advanced physical conditioning and recovery',
        'Elite-level mental toughness and leadership'
      ],
      color: 'from-red-500/20 to-transparent'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Player Pathway</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">5-Stage Development Model</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Development occurs on a continuum where development is more important than the chronological age of the player. Our model ensures every player receives the right coaching at the right time.
          </p>
        </div>

        <div className="space-y-8">
          {stages.map((stage, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br ${stage.color}`}
            >
              <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                <div className="flex-shrink-0">
                  <span className="text-8xl font-black text-white/10 block leading-none mb-4">{stage.id}</span>
                  <div className="bg-brand-lime text-black font-black px-4 py-1 rounded text-sm uppercase tracking-widest inline-block">
                    {stage.age}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-4xl font-black mb-4">{stage.title}</h3>
                  <p className="text-xl text-brand-lime font-bold mb-8 uppercase tracking-wider">{stage.focus}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stage.details.map((detail, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <ChevronRight className="text-brand-lime mt-1 flex-shrink-0" size={18} />
                        <span className="text-white/70 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continuum Model Info */}
        <div className="mt-32 glass-card p-12 border-brand-lime/20">
          <h2 className="text-3xl font-black mb-8">The Development Continuum</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Developmental differences between players of the same age are common place and can correlate to +/- 2 years of chronological age. Thus, in a mixed ability group of 10 year old players, it is feasible to have players performing at a level of an average 8 year old and an average 12 year old - a 4 year development range.
          </p>
          <div className="h-4 bg-white/5 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-brand-lime to-red-500 opacity-50" />
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white z-10" />
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <span>Stage 1 (3-5 YRS)</span>
            <span>Stage 3 (9-11 YRS)</span>
            <span>Stage 5 (15-18 YRS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentModel;
