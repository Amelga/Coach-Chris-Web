import { motion } from 'motion/react';
import { Users, Calendar, Activity, TrendingUp, Settings as SettingsIcon, LogOut, Plus } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const CoachDashboard = () => {
  const { profile, signOut } = useUser();

  const stats = [
    { label: 'Total Players', value: '42', icon: Users, color: 'text-blue-500' },
    { label: 'Sessions Today', value: '6', icon: Calendar, color: 'text-brand-lime' },
    { label: 'Revenue (MTD)', value: '12.4k', icon: TrendingUp, color: 'text-brand-red' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 uppercase">Coach Console: {profile?.displayName}</h1>
          <p className="text-[var(--text-primary)]/60">Manage your academy and track player development.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary py-2 px-6">
            <Plus size={18} /> New Session
          </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-2">
            <Users size={20} className="text-brand-lime" /> Active Players
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-[var(--border-color)]">
                  <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/40">Player</th>
                  <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/40">Stage</th>
                  <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/40">Last Session</th>
                  <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/40 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {[
                  { name: 'Alex Johnson', stage: '03', last: 'Yesterday', status: 'On Track' },
                  { name: 'Sarah Miller', stage: '02', last: '3 days ago', status: 'Needs Focus' },
                  { name: 'Leo Garcia', stage: '05', last: 'Today', status: 'Elite' },
                ].map((player, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-bold">{player.name}</td>
                    <td className="py-4 text-brand-lime font-black">STAGE {player.stage}</td>
                    <td className="py-4 text-sm text-[var(--text-primary)]/60">{player.last}</td>
                    <td className="py-4 text-right">
                      <button className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]/40 group-hover:text-brand-lime transition-colors">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-2">
            <Activity size={20} className="text-brand-red" /> Academy Alerts
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Booking', msg: 'New assessment request from Mark R.', time: '10m ago' },
              { type: 'Report', msg: 'Sarah M. completed Stage 2 curriculum', time: '1h ago' },
              { type: 'Payment', msg: 'Leo G. renewed Development Package', time: '4h ago' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-[var(--border-color)]">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-red mb-1">{alert.type}</p>
                <p className="text-sm font-bold mb-1">{alert.msg}</p>
                <p className="text-[10px] text-[var(--text-primary)]/40 uppercase tracking-widest">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
