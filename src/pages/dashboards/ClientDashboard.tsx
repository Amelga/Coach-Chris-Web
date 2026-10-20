import { motion } from 'motion/react';
import { LayoutDashboard, Calendar, Activity, Award, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const { profile, signOut } = useUser();

  const stats = [
    { label: 'Sessions Completed', value: '12', icon: Calendar, color: 'text-blue-500' },
    { label: 'Avg Performance', value: '8.4', icon: Activity, color: 'text-brand-lime' },
    { label: 'Competencies', value: '24/50', icon: Award, color: 'text-brand-red' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 uppercase">Welcome back, {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-[var(--text-primary)]/60">Track your progress and upcoming sessions.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/settings" className="btn-secondary py-2 px-6">
            <SettingsIcon size={18} /> Settings
          </Link>
          <button onClick={signOut} className="btn-secondary py-2 px-6 border-red-500/20 text-red-500 hover:bg-red-500/5">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]/40">{stat.label}</span>
            </div>
            <p className="text-4xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-2">
            <Calendar size={20} className="text-brand-lime" /> Upcoming Sessions
          </h3>
          <div className="space-y-4">
            {[
              { date: 'Oct 12, 2025', time: '16:00', type: 'Individual Assessment', coach: 'Chris' },
              { date: 'Oct 15, 2025', time: '17:30', type: 'Development Session', coach: 'Chris' },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-[var(--border-color)]">
                <div>
                  <p className="font-bold">{session.type}</p>
                  <p className="text-xs text-[var(--text-primary)]/40 uppercase tracking-widest">{session.date} • {session.time}</p>
                </div>
                <button className="text-brand-lime text-xs font-bold uppercase tracking-widest hover:underline">Reschedule</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-2">
            <Award size={20} className="text-brand-red" /> Recent Achievements
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Dribbling Mastery', desc: 'Completed Stage 2 fundamentals', date: '2 days ago' },
              { title: 'Perfect Attendance', desc: '10 sessions in a row', date: '1 week ago' },
            ].map((ach, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-[var(--border-color)]">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
                  <Award size={18} />
                </div>
                <div>
                  <p className="font-bold">{ach.title}</p>
                  <p className="text-xs text-[var(--text-primary)]/40">{ach.desc} • {ach.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
