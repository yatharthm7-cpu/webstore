import { useState } from 'react';
import { Trophy, Swords, Clock, Coins, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function Leaderboards() {
  const [category, setCategory] = useState<'kills' | 'playtime' | 'wealth'>('kills');

  const categories = [
    { id: 'kills', label: 'Top Kills', icon: Swords },
    { id: 'playtime', label: 'Most Playtime', icon: Clock },
    { id: 'wealth', label: 'Richest Players', icon: Coins },
  ] as const;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-[var(--secondary)] mx-auto mb-4" />
        <h1 className="text-4xl font-display font-black text-[var(--foreground)] mb-4">Leaderboards</h1>
        <p className="text-[var(--muted-foreground)]">See who rules the realm across different categories.</p>
      </div>

      {/* Category Selector */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
          {categories.map(c => {
            const Icon = c.icon;
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-[var(--primary)] text-white shadow-md' 
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Empty State */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-12 text-center max-w-2xl mx-auto mt-12"
      >
        <div className="w-20 h-20 bg-[var(--muted)] rounded-full mx-auto flex items-center justify-center mb-6 border border-[var(--border)]">
          <Activity className="w-10 h-10 text-[var(--secondary)]" />
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-3">Awaiting Players</h3>
        <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
          The leaderboards are currently empty. Real-time stats, wealth rankings, and playtime tracking will become active as soon as the server officially launches.
        </p>
        <div className="text-sm font-mono text-[var(--primary)] uppercase tracking-widest bg-[var(--background)] py-2 px-4 rounded-md inline-block border border-[var(--border)]">
          Tracking Offline
        </div>
      </motion.div>
    </div>
  );
}
