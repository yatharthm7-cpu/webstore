import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { ArrowRight, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<'java' | 'bedrock'>('java');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    
    login(username.trim(), platform);
    toast.success(`Logged in as ${username.trim()}`);
    navigate('/');
  };

  return (
    <div className="py-20 min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606778303063-440598b9f1d9?q=80&w=1920&h=1080&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(255,102,153,0.3)]">
            <User className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-[var(--muted-foreground)] text-sm">Enter your Minecraft username to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPlatform('java')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                  platform === 'java' 
                    ? 'bg-[#159A5A]/20 border-[#159A5A] text-[#159A5A] shadow-[0_0_15px_rgba(21,154,90,0.2)]' 
                    : 'bg-[#1A1116] border-[var(--border)] text-gray-400 hover:bg-[#23171E]'
                }`}
              >
                Java Edition
              </button>
              <button
                type="button"
                onClick={() => setPlatform('bedrock')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                  platform === 'bedrock' 
                    ? 'bg-[#0078D7]/20 border-[#0078D7] text-[#0078D7] shadow-[0_0_15px_rgba(0,120,215,0.2)]' 
                    : 'bg-[#1A1116] border-[var(--border)] text-gray-400 hover:bg-[#23171E]'
                }`}
              >
                Bedrock Edition
              </button>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                Minecraft Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={platform === 'java' ? 'Notch' : 'Steve'}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[var(--primary)] hover:bg-[#A31845] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,102,153,0.3)] hover:shadow-[0_0_30px_rgba(255,102,153,0.5)] hover:scale-105"
          >
            Login to Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
