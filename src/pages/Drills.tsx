import { motion } from 'motion/react';
import { Play, Info, ChevronRight, Target } from 'lucide-react';

const Drills = () => {
  const drills = [
    {
      title: "Spider's Web",
      stages: "Stages 1, 2 & 3 (Ages 3-11)",
      theme: "1v1 Attacking & Defending, Dribbling, Ball Mastery",
      desc: "Introduces young players to the concept of dribbling to space within a confined area. As more players join the 'web', less open space is available — an excellent teaching moment for the coach to discuss head up, looking for space and changing direction to avoid pressure.",
      setup: "20 x 20 yard square. 9 players each have a ball. 3 players start the web by linking arms.",
      img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Island Dribbling",
      stages: "Stages 2 & 3 (Ages 6-11)",
      theme: "Dribbling and turns, Attacking as an individual",
      desc: "This activity develops player's confidence using moves to beat a defender and improving player's vision. Players look to dribble through 'islands' as fast as possible, performing moves in the center of the islands.",
      setup: "20x25 playing area. Use cones to create 8 islands in the grid. Each player starts with a ball.",
      img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Micro Soccer",
      stages: "Stages 3, 4 & 5 (Ages 9-18)",
      theme: "Passing combinations, Attacking transition, Shooting",
      desc: "Encourages speed of play and positive transitions to attack. The game commences with 4v4 play. Defending team must drop one player back to create a 4v3 advantage for the attackers.",
      setup: "35x25 yard field with 5 yard end zones and small goals. Play is 4v4.",
      img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Sample Activities</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">Training Drills</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A glimpse into our methodology. These drills are designed to be high-intensity, cognitive-loaded, and fun.
          </p>
        </div>

        <div className="space-y-20">
          {drills.map((drill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video rounded-3xl overflow-hidden border-2 border-white/10">
                    <img 
                      src={drill.img} 
                      alt={drill.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center">
                      <Play className="text-black ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-brand-lime font-bold uppercase tracking-widest text-xs mb-4 block">{drill.stages}</span>
                <h2 className="text-4xl font-black mb-6 uppercase">{drill.title}</h2>
                <div className="flex items-center gap-2 mb-6 text-white/40 text-xs font-bold uppercase tracking-widest">
                  <Target size={14} className="text-brand-lime" />
                  {drill.theme}
                </div>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {drill.desc}
                </p>
                <div className="glass-card p-6 border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Info size={16} className="text-brand-lime" />
                    <span className="text-xs font-black uppercase tracking-widest">Set Up</span>
                  </div>
                  <p className="text-sm text-white/40">{drill.setup}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Drill Library CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-black mb-8">Access Full Drill Library</h2>
          <p className="text-white/60 mb-12 max-w-2xl mx-auto">
            Our full library contains over 200+ stage-aligned activities, complete with video demonstrations, coaching points, and AI-generated adaptations.
          </p>
          <button className="btn-primary mx-auto">
            Subscribe to Library <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drills;
