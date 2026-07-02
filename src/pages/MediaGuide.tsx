import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Video } from 'lucide-react';

export default function MediaGuide() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 mb-6 flex items-center text-sm text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-[var(--primary)] transition-colors cursor-pointer">Guides</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)] font-medium">Media</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-6 mb-12 pb-12 border-b border-[var(--border)]">
            <img 
              src="/youtube.png" 
              alt="Media Icon" 
              className="w-24 h-24 object-contain drop-shadow-lg transform -rotate-3"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-display font-bold text-[var(--foreground)]">Media</h1>
              <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest mt-1 block">
                Guide
              </span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">🎥</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">What media do</h2>
              </div>
              <div className="px-2">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Our Media team consists of passionate content creators who make videos or stream their experiences on Soulberry. They help grow our community by showcasing gameplay, new updates, and engaging with their audiences across platforms like YouTube, TikTok, and Twitch.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">🙋‍♂️</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">How do I get the Media rank?</h2>
              </div>
              <div className="px-2 space-y-6">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  We're always looking to support growing creators! If you regularly produce content and want to join our Media team, you can <a href="https://apply.soulberry.fun/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] underline underline-offset-2">apply here</a>.
                </p>
                
                <div>
                  <p className="text-[var(--foreground)] font-medium mb-3">To increase your chances of being accepted:</p>
                  <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] ml-2">
                    <li>Have an active channel with a consistent upload/streaming schedule</li>
                    <li>Already have at least some content recorded on Soulberry</li>
                    <li>Maintain a positive, professional image in our community</li>
                    <li>Ensure your content aligns with our server rules and values</li>
                  </ul>
                </div>

                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Our Media Manager reviews applications regularly. You will be contacted via Discord if your application is accepted.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">⭐</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">Media Perks</h2>
              </div>
              <div className="px-2 space-y-6">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Being part of the Media team comes with exclusive benefits to help you create better content without interruptions.
                </p>

                <div className="pt-4 border-t border-[var(--border)]">
                  <h3 className="text-[var(--foreground)] font-bold mb-4">Rank Benefits:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-widest mb-3">In-Game Perks:</h4>
                      <ul className="space-y-2 text-[var(--muted-foreground)]">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Exclusive [Media] prefix</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Access to /nick to record in peace</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Priority queue bypassing</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Fly mode in hub areas for cinematics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-widest mb-3">Community Perks:</h4>
                      <ul className="space-y-2 text-[var(--muted-foreground)]">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Special Discord role and channel access</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Promote your content in official channels</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Direct contact with the management team</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
