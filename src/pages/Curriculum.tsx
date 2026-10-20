import { motion } from 'motion/react';
import { Book, Target, Layout, CheckCircle2, Search, BarChart3 } from 'lucide-react';

const Curriculum = () => {
  const elements = [
    {
      id: '01',
      title: 'Curriculum Aims',
      desc: 'Defining what we are trying to achieve. Establishing standards at each stage of development so progress can be monitored and improvement targets established.',
      items: [
        'Provide attainment standards',
        'Reflect best practice',
        'Promote holistic development',
        'Establish high expectations'
      ]
    },
    {
      id: '02',
      title: 'Curriculum Organization',
      desc: 'How learning experiences are structured. Creating a relevant, coherent and engaging environment for all players, parents and coaches.',
      items: [
        'Establish an entitlement for every child',
        'Promote continuity and coherence',
        'Facilitate player transitions',
        'Increase stakeholder confidence'
      ]
    },
    {
      id: '03',
      title: 'Curriculum Evaluation',
      desc: 'Measuring success and impact. Using data-driven insights to refine coaching methods and ensure player progression matches the blueprint.',
      items: [
        'Competency matrix tracking',
        'Monthly progress reports',
        'Parent-coach consultations',
        'AI-driven performance analysis'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Blueprint</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8">The Head Coach <br />Blueprint</h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              A comprehensive game plan for youth development. Our curriculum is not just a set of drills; it's a holistic framework designed to build elite players and exceptional individuals.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Download Summary</button>
              <button className="btn-secondary">View Sample Drills</button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-12 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="text-black text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4">The</p>
                <h2 className="text-4xl font-black mb-2">HEAD COACH</h2>
                <h2 className="text-4xl font-black mb-8">BLUEPRINT</h2>
                <div className="w-48 h-48 mx-auto mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400" 
                    alt="Whistle icon" 
                    className="w-full h-full object-contain grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest border-t border-black/10 pt-4">A Comprehensive Game Plan</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elements Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {elements.map((el, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10"
            >
              <span className="text-brand-lime font-black text-4xl mb-6 block opacity-20">ELEMENT {el.id}</span>
              <h3 className="text-2xl font-black mb-6 uppercase">{el.title}</h3>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-sm">{el.desc}</p>
              <ul className="space-y-4">
                {el.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    <CheckCircle2 className="text-brand-lime" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Competency Matrix Preview */}
        <div className="glass-card p-12 border-brand-lime/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-2">Competency Matrix</h2>
              <p className="text-[var(--text-secondary)]">Tracking progress across 50+ technical and tactical skills.</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">(-) Introduced</span>
              <span className="bg-brand-lime/20 text-brand-lime px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-brand-lime/20">(+) Competency</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-white/40">Skill / Concept</th>
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-brand-lime text-center">Stage 1</th>
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-brand-lime text-center">Stage 2</th>
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-brand-lime text-center">Stage 3</th>
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-brand-lime text-center">Stage 4</th>
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-brand-lime text-center">Stage 5</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: 'Running with the ball', s1: '-', s2: '+', s3: '+', s4: '+', s5: '+' },
                  { name: 'Feints and dribble', s1: '', s2: '-', s3: '+', s4: '+', s5: '+' },
                  { name: 'Control - Foot', s1: '', s2: '-', s3: '+', s4: '+', s5: '+' },
                  { name: 'Ground - Inside of foot', s1: '', s2: '-', s3: '+', s4: '+', s5: '+' },
                  { name: 'Shooting - Instep', s1: '', s2: '-', s3: '+', s4: '+', s5: '+' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-[var(--text-primary)]">{row.name}</td>
                    <td className="py-4 px-4 text-center font-black text-xl">{row.s1}</td>
                    <td className="py-4 px-4 text-center font-black text-xl">{row.s2}</td>
                    <td className="py-4 px-4 text-center font-black text-xl">{row.s3}</td>
                    <td className="py-4 px-4 text-center font-black text-xl">{row.s4}</td>
                    <td className="py-4 px-4 text-center font-black text-xl">{row.s5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-xs text-white/30 italic">
            * Competency based coaching: competency in basic skills must be achieved before progressing to more complex skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
