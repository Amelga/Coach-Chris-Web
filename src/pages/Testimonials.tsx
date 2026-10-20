import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      text: "Coach Chris completely transformed my son's relationship with the ball. Within three months, his confidence had improved beyond anything managing in two years.",
      author: "Sarah R.",
      role: "Parent of U8 Player",
      img: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      text: "The curriculum design is unlike anything I've seen at this level. Coach Chris understands developmental age, not just chronological age. It's science-backed coaching at its best.",
      author: "David M.",
      role: "Club Director",
      img: "https://i.pravatar.cc/150?u=david"
    },
    {
      text: "I've worked with a lot of coaches, but the way Coach Chris questions players creates real ownership of the game. I feel like I'm finally learning HOW to play, not just where to run.",
      author: "Jordan K.",
      role: "U17 Player",
      img: "https://i.pravatar.cc/150?u=jordan"
    },
    {
      text: "Professional, dedicated, and incredibly knowledgeable. The progress reports we get are so detailed, it really helps us support our daughter's development at home.",
      author: "Michael T.",
      role: "Parent of U12 Player",
      img: "https://i.pravatar.cc/150?u=michael"
    },
    {
      text: "His focus on holistic development is what sets him apart. My son is not just a better player, but a more resilient and disciplined young man because of this program.",
      author: "Elena G.",
      role: "Parent of U14 Player",
      img: "https://i.pravatar.cc/150?u=elena"
    },
    {
      text: "The AI analytics provided after each session are a game changer. We can see exactly where the improvements are happening and what needs more work.",
      author: "Robert L.",
      role: "Elite Academy Scout",
      img: "https://i.pravatar.cc/150?u=robert"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Success Stories</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8">Player & Parent Reviews</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the players and parents who have experienced the Coach Chris difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex flex-col justify-between hover:border-brand-lime/30 transition-all group"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-brand-lime text-brand-lime" />)}
                </div>
                <Quote className="text-brand-lime/20 mb-6 group-hover:text-brand-lime/40 transition-colors" size={48} />
                <p className="text-white/80 italic text-lg leading-relaxed mb-10">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <img 
                  src={review.img} 
                  alt={review.author} 
                  className="w-14 h-14 rounded-full border-2 border-brand-lime/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-black text-sm uppercase tracking-widest">{review.author}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonial Teaser */}
        <div className="mt-32 glass-card p-12 relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200" 
              alt="Football background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Watch the Journey</h2>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto">
              See our players in action and hear their stories in our latest documentary series "The Pathway".
            </p>
            <button className="btn-primary mx-auto">
              Watch on YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
