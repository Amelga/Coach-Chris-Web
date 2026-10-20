import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Target, Users, Activity } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { updateProfile } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playerAge: '',
    experience: '',
    goals: [] as string[],
  });

  const goals = [
    'Technical Mastery',
    'Tactical Awareness',
    'Physical Conditioning',
    'Mental Toughness',
    'Team Integration'
  ];

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      await updateProfile({ onboarded: true, ...formData });
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-12 bg-brand-lime' : 'w-4 bg-white/10'}`} 
              />
            ))}
          </div>
          <h1 className="text-4xl font-black uppercase mb-4">Let's build your <span className="text-brand-lime">Pathway</span></h1>
          <p className="text-[var(--text-primary)]/60">Help us tailor the Coachly experience to your goals.</p>
        </div>

        <div className="glass-card p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <Users size={20} className="text-brand-lime" /> Player Age
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['3-5', '6-8', '9-11', '12-14', '15-18'].map((age) => (
                    <button
                      key={age}
                      onClick={() => setFormData({ ...formData, playerAge: age })}
                      className={`p-4 rounded-xl border transition-all font-bold ${
                        formData.playerAge === age 
                          ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                          : 'border-[var(--border-color)] hover:border-brand-lime/30'
                      }`}
                    >
                      {age} Years
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <Activity size={20} className="text-brand-lime" /> Experience Level
                </h3>
                <div className="space-y-4">
                  {['Beginner', 'Intermediate', 'Advanced', 'Elite'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, experience: level })}
                      className={`w-full p-6 rounded-xl border transition-all flex items-center justify-between font-bold ${
                        formData.experience === level 
                          ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                          : 'border-[var(--border-color)] hover:border-brand-lime/30'
                      }`}
                    >
                      {level}
                      {formData.experience === level && <CheckCircle2 size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <Target size={20} className="text-brand-lime" /> Primary Goals
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => {
                        const newGoals = formData.goals.includes(goal)
                          ? formData.goals.filter(g => g !== goal)
                          : [...formData.goals, goal];
                        setFormData({ ...formData, goals: newGoals });
                      }}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between font-bold ${
                        formData.goals.includes(goal) 
                          ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                          : 'border-[var(--border-color)] hover:border-brand-lime/30'
                      }`}
                    >
                      {goal}
                      {formData.goals.includes(goal) && <CheckCircle2 size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="btn-secondary flex-1 justify-center"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.playerAge) ||
                (step === 2 && !formData.experience) ||
                (step === 3 && formData.goals.length === 0)
              }
              className="btn-primary flex-1 justify-center disabled:opacity-50"
            >
              {step === 3 ? 'Complete' : 'Next'} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
