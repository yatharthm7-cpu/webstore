import { ArrowRight, Swords, Gem, ServerCrash, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import ServerStatus from '../components/ServerStatus';
import { cn } from '../lib/utils';

import DiscordWidget from '../components/DiscordWidget';
import ServerStatsWidget from '../components/ServerStatsWidget';
import ServerRules from '../components/ServerRules';

function Particles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);
  
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -500],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--background)] py-24 sm:py-32 border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&h=600&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
        <Particles />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
            <img src="/banner.png" alt="Soulberry Banner" className="w-full max-w-2xl mx-auto rounded-lg shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-[var(--primary)]/30" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Welcome to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] drop-shadow-[0_0_10px_rgba(255,102,153,0.5)]">Soulberry</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--secondary)] font-medium tracking-[0.2em] text-sm md:text-base uppercase mb-10"
          >
            Lifesteal • PvP • Player Economy
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
          >
            <ServerStatus variant="hero" />
            <Link 
              to="/store"
              className="px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--primary)] text-white rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-300 ease-in-out transform shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center justify-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,102,153,0.6)]"
            >
              Visit Store <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Swords, title: 'Lifesteal SMP', desc: 'Steal hearts from your enemies in thrilling PvP combat.' },
              { icon: Gem, title: 'Player Economy', desc: 'A fully player-driven economy with dynamic shops and auctions.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-center group hover:border-[var(--primary)] transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--muted)] rounded-xl flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                  <feature.icon className="w-8 h-8 text-[var(--primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">{feature.title}</h3>
                <p className="text-[var(--muted-foreground)]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 bg-[var(--background)] relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1920&h=600&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
              Server Rules
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Follow these guidelines to ensure a fair and enjoyable experience for everyone on Soulberry.
            </p>
          </div>
          <ServerRules />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--muted-foreground)]">Everything you need to know about Soulberry mechanics and rules.</p>
          </div>
          
          <div className="space-y-2">
            {[
              {
                question: 'What is Lifesteal?',
                answer: 'In Lifesteal, when you kill a player, you steal one of their hearts. If you die to another player, you lose a heart. It adds high stakes to every PvP encounter!'
              },
              {
                question: 'What happens if I lose all my hearts?',
                answer: 'If you reach 0 hearts, you will be temporarily banned from the server or placed into spectator mode, depending on the current season rules. Friends can revive you using a Revive Beacon.'
              },
              {
                question: 'Can I craft hearts?',
                answer: 'No, you cannot craft hearts. You must earn them by defeating other players in PvP combat or obtaining them through server events!'
              },
              {
                question: 'Are there any rules against griefing?',
                answer: 'While Lifesteal is a chaotic mode, we have strict rules against exploiting, cheating, and spawn trapping. Certain areas may be protected, but generally, your base is vulnerable, so hide it well!'
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-[var(--background)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary)]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-[var(--card)] p-8 md:p-12 rounded-3xl border border-[var(--border)] shadow-2xl">
            <div className="flex-1 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--background)] border border-[var(--border)] mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              >
                <ServerCrash className="w-8 h-8 text-[var(--primary)]" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tighter"
              >
                Join the Community
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[var(--muted-foreground)] max-w-xl mb-8 text-base md:text-lg"
              >
                We are working hard behind the scenes to prepare the ultimate Soulberry experience. 
                Join our Discord to get real-time news, participate in giveaways, and chat with other players before launch!
              </motion.p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row justify-center gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              >
                <ServerStatsWidget />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              >
                <DiscordWidget />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const delay = index !== undefined ? index * 0.1 : 0;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="border border-[var(--border)] rounded-lg bg-[var(--card)] overflow-hidden"
    >
      <button 
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-[var(--muted)] transition-colors duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-[var(--foreground)]">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-[var(--muted-foreground)] transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-[var(--muted-foreground)] text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
