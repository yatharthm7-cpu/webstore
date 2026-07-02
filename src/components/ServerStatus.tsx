import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface ServerStatusProps {
  isMobile?: boolean;
  variant?: 'default' | 'hero';
  onCopy?: () => void;
}

export default function ServerStatus({ isMobile = false, variant = 'default', onCopy }: ServerStatusProps) {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const serverIP = "play.soulberry.fun";

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
        const data = await res.json();
        if (data.online) {
          setIsOnline(true);
          setOnlinePlayers(data.players.online);
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
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    toast.success("IP copied to clipboard!");
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'hero') {
    return (
      <button
        onClick={handleCopy}
        className="relative group px-8 py-4 bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] rounded-lg font-bold text-sm uppercase tracking-widest transition-all flex flex-col items-center justify-center hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.2)] gap-2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/10 to-transparent group-hover:translate-x-[100%] transition-transform duration-1000 -translate-x-[100%]"></div>
        <div className="absolute inset-0 ring-1 ring-[var(--primary)]/0 group-hover:ring-[var(--primary)]/50 rounded-lg transition-all duration-300"></div>
        <div className="flex items-center relative z-10">
          {copied ? (
            <>
              <Check className="w-5 h-5 mr-2 text-green-500" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2 text-[var(--secondary)]" /> {serverIP}
            </>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 relative z-10">
          <div className={cn("w-2 h-2 rounded-full", isOnline ? "bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" : "bg-red-500")}></div>
          <span className="text-[var(--secondary)] text-xs">
            {loading ? "Pinging server..." : isOnline ? `${onlinePlayers} players online` : "Server offline"}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative flex items-center bg-[var(--muted)] border border-[var(--secondary)]/40 px-4 py-1.5 rounded-full gap-3 transition-colors hover:bg-[var(--card)] hover:border-[var(--secondary)] shadow-sm hover:shadow-[0_0_10px_rgba(255,102,153,0.2)]",
        isMobile ? "w-full justify-center" : ""
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", isOnline ? "bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" : "bg-red-500")}></div>
      <span className="text-xs font-mono text-white">{serverIP}</span>
      <span className="text-[var(--secondary)] text-xs font-bold uppercase">
        {loading ? "Pinging..." : isOnline ? `${onlinePlayers} Online` : "Offline"}
      </span>
      {copied ? (
        <Check className="h-3 w-3 text-green-500 ml-1" />
      ) : (
        <Copy className="h-3 w-3 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
      )}
    </button>
  );
}
