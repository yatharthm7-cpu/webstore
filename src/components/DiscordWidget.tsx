import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

interface DiscordWidgetProps {
  className?: string;
}

export default function DiscordWidget({ className }: DiscordWidgetProps) {
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://discord.com/api/v9/invites/N7XCTXmzMu?with_counts=true');
        const data = await res.json();
        setOnlineMembers(data.approximate_presence_count || 0);
        setTotalMembers(data.approximate_member_count || 0);
      } catch (err) {
        console.error("Failed to fetch Discord stats", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("bg-[#1E1F22] rounded-xl border border-[#2B2D31] shadow-2xl overflow-hidden max-w-sm w-full", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#5865F2] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
              <MessageSquare className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Soulberry Discord</h3>
              <p className="text-[#949BA4] text-xs">Official Community</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#23A559] animate-pulse shadow-[0_0_8px_#23A559]"></div>
            <span className="text-[#DBDEE1] text-sm font-medium">
              <span className="text-white font-bold">{loading ? "..." : onlineMembers.toLocaleString()}</span> Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#80848E]"></div>
            <span className="text-[#DBDEE1] text-sm font-medium">
              <span className="text-white font-bold">{loading ? "..." : totalMembers.toLocaleString()}</span> Members
            </span>
          </div>
        </div>

        <a 
          href="https://discord.gg/N7XCTXmzMu"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white text-center rounded-lg font-bold transition-all shadow-[0_4px_14px_rgba(88,101,242,0.4)] hover:shadow-[0_6px_20px_rgba(88,101,242,0.6)] hover:-translate-y-0.5"
        >
          Join Server
        </a>
      </div>
    </div>
  );
}
