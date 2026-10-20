import { motion } from 'motion/react';
import { Award, BookOpen, Users, Calendar, CheckCircle2 } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      period: '2020-Present',
      role: 'Head of Youth Development',
      org: 'REGIONAL FOOTBALL ACADEMY',
      desc: 'Leading the design and implementation of a full 5-stage player development curriculum across all age groups. Responsible for 18 assistant coaches and oversight of 400+ registered players.',
      tags: ['REGIONAL ACADEMY AWARD 2023', 'CURRICULUM DESIGN LEAD', '400+ PLAYERS MANAGED']
    },
    {
      period: '2016-2020',
      role: 'U12-U16 Head Coach',
      org: 'CITY FOOTBALL CLUB',
      desc: 'Guided three squads through Stages 3 and 4 of the development model. Focused on tactical awareness, positional specialization, and the transition from small-sided to full 11v11 formats.',
      tags: ['LEAGUE CHAMPIONS 2018', '3 NATIONAL TRIAL SELECTIONS', 'STAGE 3-4 SPECIALIST']
    },
    {
      period: '2012-2016',
      role: 'Grassroots Development Coach',
      org: 'COMMUNITY FOOTBALL FOUNDATION',
      desc: 'Delivered high-energy, fun-first sessions for players aged 3-8, grounded in fundamental movement skill development and ball familiarisation.',
      tags: ['NSCAA L1-L3 CERTIFIED', 'PROGRAMME ORIGINATOR', '120+ YOUNG PLAYERS']
    }
  ];

  const skills = [
    {
      category: 'Technical',
      title: 'Ball Mastery',
      items: [
        { name: 'Ball Control', level: 'Expert', val: 95 },
        { name: 'Dribbling Drills', level: 'Expert', val: 90 },
        { name: 'Feints & Moves', level: 'Advanced', val: 85 },
      ]
    },
    {
      category: 'Tactical',
      title: 'Tactical Principles',
      items: [
        { name: 'Penetration', level: 'Expert', val: 92 },
        { name: 'Width & Mobility', level: 'Expert', val: 90 },
        { name: 'Improvisation', level: 'Advanced', val: 80 },
      ]
    },
    {
      category: 'Curriculum',
      title: 'Curriculum Design',
      items: [
        { name: 'Curriculum Design', level: 'Expert', val: 98 },
        { name: 'Competency Assessment', level: 'Expert', val: 95 },
        { name: 'LTAD Framework', level: 'Expert', val: 94 },
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
            <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Coach</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8">Chris <br />Development</h1>
            <p className="text-xl text-brand-lime leading-relaxed mb-8">
              With over a decade of experience in youth football, I specialize in creating structured, child-centered environments where players can thrive. My approach combines traditional coaching excellence with modern data analytics.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-lime" />
                <span className="text-sm font-bold uppercase tracking-wider">NSCAA Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-lime" />
                <span className="text-sm font-bold uppercase tracking-wider">LTAD Specialist</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-lime" />
                <span className="text-sm font-bold uppercase tracking-wider">Coachly Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-lime" />
                <span className="text-sm font-bold uppercase tracking-wider">Elite Mentor</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" 
                alt="Coach Chris training" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-lime rounded-full flex items-center justify-center text-black font-black text-center p-4 rotate-12 shadow-2xl">
              CERTIFIED DEVELOPMENT COACH
            </div>
          </motion.div>
        </div>

        {/* Career Timeline */}
        <div className="mb-32">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Career Timeline</span>
          <h2 className="text-4xl md:text-6xl font-black mb-16">Experience & Achievements</h2>
          
          <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-[150px] before:top-0 before:bottom-0 before:w-0.5 before:bg-white/10">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-12 md:pl-48"
              >
                <div className="absolute left-0 md:left-[135px] top-0 w-8 h-8 bg-brand-navy border-4 border-brand-lime rounded-full z-10" />
                <div className="hidden md:block absolute left-0 top-1 text-sm font-black text-brand-lime uppercase tracking-widest w-32">
                  {item.period}
                </div>
                <div className="glass-card p-8">
                  <div className="md:hidden text-xs font-black text-brand-lime uppercase tracking-widest mb-2">
                    {item.period}
                  </div>
                  <h3 className="text-2xl font-black mb-1">{item.role}</h3>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{item.org}</p>
                  <p className="text-white/60 mb-6 leading-relaxed">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certified Skills */}
        <div>
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Verified Competencies</span>
          <h2 className="text-4xl md:text-6xl font-black mb-16">Certified Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <span className="text-brand-lime text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{skillGroup.category}</span>
                <h3 className="text-2xl font-black mb-8">{skillGroup.title}</h3>
                <div className="space-y-8">
                  {skillGroup.items.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest">{skill.name}</span>
                        <span className="text-[10px] font-black text-brand-lime uppercase">{skill.level}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.val}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-brand-lime"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
