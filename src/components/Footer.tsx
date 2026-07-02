import { MessageCircle, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Soulberry Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-xl tracking-tighter text-white">
                SOUL<span className="text-[var(--secondary)]">BERRY</span>
              </span>
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-sm">
              Soulberry is a premium Minecraft network offering unique experiences, 
              custom gamemodes, and a welcoming community. Join us today and start your adventure!
            </p>
            <p className="text-[var(--muted-foreground)] text-xs mt-4">
              Not affiliated with Mojang AB.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-[var(--secondary)] uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li><Link to="/store" className="hover:text-[var(--primary)] hover:scale-105 inline-block transition-all">Store & Ranks</Link></li>
              <li><Link to="/leaderboard" className="hover:text-[var(--primary)] hover:scale-105 inline-block transition-all">Player Leaderboards</Link></li>
              <li><Link to="/guides/staff" className="hover:text-[var(--primary)] hover:scale-105 inline-block transition-all">Staff Guide</Link></li>
              <li><Link to="/guides/media" className="hover:text-[var(--primary)] hover:scale-105 inline-block transition-all">Media Guide</Link></li>
              <li><a href="#" className="hover:text-[var(--primary)] hover:scale-105 inline-block transition-all">Rules & Policies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[var(--secondary)] uppercase tracking-widest mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://discord.gg/N7XCTXmzMu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#5865F2] hover:text-white hover:scale-110 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#FF0000] hover:text-white hover:scale-110 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Soulberry Network • Developed with Soul</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--secondary)] hover:scale-105 inline-block font-bold transition-all">Terms</a>
            <a href="#" className="hover:text-[var(--secondary)] hover:scale-105 inline-block font-bold transition-all">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
