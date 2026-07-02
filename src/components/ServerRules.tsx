import { motion } from 'motion/react';
import { ShieldAlert, Bug, MessageCircleWarning, Ghost, Gavel, Handshake } from 'lucide-react';
import { cn } from '../lib/utils';

interface Rule {
  title: string;
  description: string;
  icon: React.ElementType;
}

const RULES: Rule[] = [
  {
    title: "No Cheating or Hacking",
    description: "The use of modified clients, x-ray resource packs, auto-clickers, or any unfair advantages is strictly prohibited and will result in a permanent ban.",
    icon: ShieldAlert,
  },
  {
    title: "No Exploiting Bugs",
    description: "Duplication glitches, server exploits, or abusing unintended game mechanics is not allowed. Please report any bugs you find.",
    icon: Bug,
  },
  {
    title: "Respect All Players",
    description: "While PvP and trash talk are part of the game, extreme toxicity, hate speech, racism, and real-life threats are not tolerated.",
    icon: MessageCircleWarning,
  },
  {
    title: "No Spawn Trapping",
    description: "Continuously killing players at their spawn point or deliberately making a spawn point inescapable is prohibited.",
    icon: Ghost,
  },
  {
    title: "In-Game Scamming",
    description: "Scamming using in-game items is generally allowed in this cutthroat environment. However, real-life money trading or scamming is strictly banned.",
    icon: Handshake,
  },
  {
    title: "Do Not Impersonate Staff",
    description: "Pretending to be a staff member or claiming you have authority you don't possess will lead to an immediate mute or ban.",
    icon: Gavel,
  }
];

export default function ServerRules({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {RULES.map((rule, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--primary)]/50 transition-colors group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-6 border border-[var(--border)] group-hover:scale-110 group-hover:border-[var(--primary)]/30 transition-all duration-300">
              <rule.icon className="w-6 h-6 text-[var(--secondary)]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{rule.title}</h3>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
              {rule.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
