import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

export default function StaffGuide() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 mb-6 flex items-center text-sm text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-[var(--primary)] transition-colors cursor-pointer">Guides</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)] font-medium">Staff</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-6 mb-12 pb-12 border-b border-[var(--border)]">
            <img 
              src="/staff.png" 
              alt="Staff Icon" 
              className="w-24 h-24 object-contain drop-shadow-lg transform rotate-3"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-display font-bold text-[var(--foreground)]">Staff</h1>
              <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest mt-1 block">
                Guide
              </span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">🤵</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">What staff do</h2>
              </div>
              <div className="px-2">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  The responsibilities of our staff team vastly varies depending on the role. But all involves carrying out the day to day operations required to keep the network running. This can involve anything from punishing rule breakers, to developing content features.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">🙋‍♂️</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">How do I become staff?</h2>
              </div>
              <div className="px-2 space-y-6">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  First of all, we're glad that you've taken an interest in joining the team! Staff applications usually open and close at various times throughout the year, and you are able to <a href="https://apply.soulberry.fun/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] underline underline-offset-2">apply here</a>.
                </p>
                
                <div>
                  <p className="text-[var(--foreground)] font-medium mb-3">To increase your chances of getting an interview:</p>
                  <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] ml-2">
                    <li>Do not use AI in your application</li>
                    <li>Do not submit multiple applications within 30 days</li>
                    <li>Ensure you meet all the requirements before applying</li>
                    <li>Being an active and dedicated player helps. We notice!</li>
                    <li>Write a professional and detailed application</li>
                  </ul>
                </div>

                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  You will likely hear back from a manager within 2 weeks of submitting your application for an interview. If you do not, consider your application denied.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 mb-4 flex items-center gap-3">
                <span className="text-xl">📰</span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">Extra information</h2>
              </div>
              <div className="px-2 space-y-6">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Only owner selected positions are paid. Manager selected positions are voluntary.
                </p>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  All new staff hired through applications start off as helper with the potential to climb the hierarchy.
                </p>

                <div className="pt-4 border-t border-[var(--border)]">
                  <h3 className="text-[var(--foreground)] font-bold mb-4">Staff Hierarchy:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-widest mb-3">Owner selected positions:</h4>
                      <ul className="space-y-2 text-[var(--muted-foreground)]">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Owner</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Manager</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Developer</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-widest mb-3">Manager selected positions:</h4>
                      <ul className="space-y-2 text-[var(--muted-foreground)]">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Admin</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Sr. Mod</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Moderator</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span> Helper</li>
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
