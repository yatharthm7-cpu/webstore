import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Clock, Activity, Server, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface ServerStatsWidgetProps {
  className?: string;
}

export default function ServerStatsWidget({ className }: ServerStatsWidgetProps) {
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uptimeDays, setUptimeDays] = useState(0);
  const [uptimeHours, setUptimeHours] = useState(0);
  const serverIP = "play.soulberry.fun";

  useEffect(() => {
    // calculate uptime since a fixed date (e.g. 6 months ago)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 142);
    startDate.setHours(startDate.getHours() - 5);

    const updateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setUptimeDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setUptimeHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
    };

    updateUptime();
    const uptimeInterval = setInterval(updateUptime, 1000 * 60 * 60);

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
        const data = await res.json();
        if (data.online) {
          setIsOnline(true);
          setOnlinePlayers(data.players.online);
          setMaxPlayers(data.players.max);
        } else {
          setIsOnline(false);
        }
      } catch (e) {
        console.error(e);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Poll every minute
    return () => {
      clearInterval(interval);
      clearInterval(uptimeInterval);
    };
  }, []);

  return (
    <div className={cn("bg-[#1A1116] rounded-xl border border-[#442934] shadow-2xl overflow-hidden max-w-sm w-full", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(255,102,153,0.3)]">
              <Server className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Server Status</h3>
              <p className="text-[#949BA4] text-xs font-mono">{serverIP}</p>
            </div>
          </div>
          <div className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", isOnline ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30")}>
            {loading ? "Pinging" : isOnline ? "Online" : "Offline"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#23171E] rounded-lg p-4 border border-[#442934]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--secondary)]" />
              <span className="text-[#DBDEE1] text-sm font-medium">Players Online</span>
            </div>
            <span className="text-white font-bold text-lg">
              {loading ? "..." : isOnline ? (
                <>
                  {onlinePlayers} <span className="text-[#949BA4] text-sm font-normal">/ {maxPlayers}</span>
                </>
              ) : "0"}
            </span>
          </div>

          <div className="bg-[#23171E] rounded-lg p-4 border border-[#442934]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[var(--secondary)]" />
              <span className="text-[#DBDEE1] text-sm font-medium">Server Uptime</span>
            </div>
            <span className="text-white font-bold text-lg">
              {uptimeDays}<span className="text-[#949BA4] text-sm font-normal mx-1">d</span>
              {uptimeHours}<span className="text-[#949BA4] text-sm font-normal ml-1">h</span>
            </span>
          </div>

          <div className="bg-[#23171E] rounded-lg p-4 border border-[#442934]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[var(--secondary)]" />
              <span className="text-[#DBDEE1] text-sm font-medium">Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold text-lg">
                20.0 <span className="text-[#949BA4] text-sm font-normal">TPS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
