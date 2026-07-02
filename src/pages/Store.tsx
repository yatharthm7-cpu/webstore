import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, Star, Zap, Crown, Sparkles, LayoutGrid, Table as TableIcon, X, Diamond, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import type { StorePackage } from '../types';

const PACKAGES: StorePackage[] = [
  {
    id: 'elite',
    name: 'Elite',
    price: '$0.78',
    inrPrice: '₹ 69',
    themeColor: '#A63BDA',
    features: [
      'Infinite ELITE Kit every 7 days',
      'Yellow chat color',
      '+500 Coins',
      'Sethome slots: 1 → 3',
      'Auction slots: 1 → 3'
    ],
    detailedFeatures: [
      { category: 'Perks:', items: ['Infinite ELITE Kit [168h].', 'Chat Color Yellow.', '+500 Coins.'] },
      { category: 'Increase:', items: ['Sethome [1 → 3].', 'Auction slots [1 → 3].'] }
    ]
  },
  {
    id: 'warrior',
    name: 'Warrior',
    price: '$1.68',
    inrPrice: '₹ 149',
    themeColor: '#1EA8FF',
    features: [
      'Infinite WARRIOR Kit every 7 days',
      'Orange chat color',
      '+1,100 Coins',
      'Sethome slots: 3 → 5',
      'Auction slots: 3 → 5',
      'Vaults: 1 → 2',
      'Use /hat'
    ],
    detailedFeatures: [
      { category: 'Perks:', items: ['Infinite WARRIOR Kit every 7 days.', 'Orange chat color.', '+1,100 Coins.'] },
      { category: 'Increase:', items: ['Sethome slots: 3 → 5.', 'Auction slots: 3 → 5.', 'Vaults: 1 → 2.'] },
      { category: 'Permission:', items: ['Use /hat.'] }
    ]
  },
  {
    id: 'master',
    name: 'Master',
    price: '$3.37',
    inrPrice: '₹ 299',
    themeColor: '#18D5C4',
    tag: 'MOST POPULAR',
    features: [
      'Infinite MASTER Kit every 7 days',
      'Aqua chat color',
      '+2,100 Coins',
      'Sethome slots: 5 → 7',
      'Auction slots: 5 → 7',
      'Vaults: 2 → 3',
      'Order: 7 → 9',
      'Use /hat, /craft, /enderchest'
    ],
    detailedFeatures: [
      { category: 'Perks:', items: ['Infinite MASTER Kit [168h].', 'Chat Color Aqua.', '+2,100 Coins.'] },
      { category: 'Increase:', items: ['Sethome [5 → 7].', 'Auction slots [5 → 7].', 'Vaults [2 → 3].', 'Order [7 → 9].'] },
      { category: 'Permission:', items: ['Use /hat', 'Use /craft', 'Use /enderchest'] }
    ]
  },
  {
    id: 'gladiator',
    name: 'Gladiator',
    price: '$6.18',
    inrPrice: '₹ 549',
    themeColor: '#FF4A1A',
    features: [
      'Infinite GLADIATOR Kit every 7 days',
      'Purple chat color',
      '+3,500 Coins',
      'Sethome slots: 7 → 10',
      'Auction slots: 7 → 10',
      'Vaults: 3 → 5',
      'Order: 9 → 13',
      'Use /hat, /craft, /enderchest, /nick'
    ],
    detailedFeatures: [
      { category: 'Perks:', items: ['Infinite GLADIATOR Kit every 7 days.', 'Purple chat color.', '+3,500 Coins.'] },
      { category: 'Increase:', items: ['Sethome slots: 7 → 10.', 'Auction slots: 7 → 10.', 'Vaults: 3 → 5.', 'Order: 9 → 13.'] },
      { category: 'Permission:', items: ['Use /hat', 'Use /craft', 'Use /enderchest', 'Use /nick'] }
    ]
  },
  {
    id: 'berryplus',
    name: 'Berry+',
    price: '$10.51',
    inrPrice: '₹ 1000',
    themeColor: '#FF1FA8',
    tag: 'BEST VALUE',
    features: [
      'Infinite BERRY+ Kit every 7 days',
      'Pink chat color',
      '+5,600 Coins',
      'Sethome slots: 10 → 15',
      'Auction slots: 10 → 15',
      'Vaults: 5 → 7',
      'Order: 13 → 15',
      'Use /anvil, /nick, /hat, /craft',
      'Use /enderchest, /lay, /disposal',
      'Use /grindstone, /smithingtable',
      'Use /feed & /heal'
    ],
    detailedFeatures: [
      { category: 'Perks:', items: ['Infinite BERRY+ Kit [168h].', 'Chat Color Pink.', '+5,600 Coins.'] },
      { category: 'Increase:', items: ['Sethome [10 → 15].', 'Auction slots [10 → 15].', 'Vaults [5 → 7].', 'Order [13 → 15].'] },
      { category: 'Permission:', items: ['Use /anvil', 'Use /nick', 'Use /hat', 'Use /craft', 'Use /enderchest', 'Use /lay', 'Use /disposal', 'Use /grindstone', 'Use /smithingtable', 'Use /feed', 'Use /heal'] }
    ]
  }
];

const COIN_PACKAGES = [
  { id: 'coins_1000', name: '1,000 Coins', inrPrice: '₹299', image: '1000 coins.png' },
  { id: 'coins_2500', name: '2,500 Coins', inrPrice: '₹449', image: '2500 coins.png' },
  { id: 'coins_7500', name: '7,500 Coins', inrPrice: '₹699', image: '7500 coins.png' },
  { id: 'coins_9750', name: '9,750 Coins', inrPrice: '₹899', image: '9750 coins.png' },
  { id: 'coins_14000', name: '14,000 Coins', inrPrice: '₹1,199', image: '14000 coins.png' },
  { id: 'coins_32000', name: '32,000 Coins', inrPrice: '₹1,999', image: '32000 coins.png', isCrown: true }
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState<'ranks' | 'coins' | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedRank, setSelectedRank] = useState<StorePackage | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<typeof COIN_PACKAGES[0] | null>(null);
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedRank || selectedCoin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedRank, selectedCoin]);

  if (activeCategory === null) {
    return (
      <div className="py-12 min-h-screen flex items-center justify-center px-4 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&h=1080&auto=format&fit=crop')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <div className="w-full max-w-3xl bg-[#1D1719] rounded-xl border border-[#33252A] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-6 text-center border-b border-[#33252A] relative">
            <h2 className="text-2xl font-bold text-white tracking-wide">Select a Category</h2>
            <button onClick={() => navigate('/')} className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#251D21]">
            {/* Ranks Card */}
            <div 
              onClick={() => setActiveCategory('ranks')} 
              className="bg-[#661633] rounded-lg p-4 border border-[#8C153B] flex items-center gap-4 cursor-pointer hover:bg-[#7A1A3D] transition-all hover:scale-105 shadow-lg"
            >
              <img src="/rankshop.png" alt="Ranks" className="w-20 h-20 object-contain drop-shadow-md" />
              <div>
                <h3 className="text-white font-bold text-2xl mb-1 drop-shadow-sm">Ranks</h3>
                <p className="text-white/80 text-sm">Unlock more perks and fea...</p>
              </div>
            </div>
            
            {/* Coins Card */}
            <div 
              onClick={() => setActiveCategory('coins')} 
              className="bg-[#997B29] rounded-lg p-4 border border-[#BFA03B] flex items-center gap-4 cursor-pointer hover:bg-[#AA882E] transition-all hover:scale-105 shadow-lg"
            >
              <img src="/coinshop.png" alt="Coins" className="w-20 h-20 object-contain drop-shadow-md" />
              <div>
                <h3 className="text-white font-bold text-2xl mb-1 drop-shadow-sm">Coins</h3>
                <p className="text-white/80 text-sm">Purchase items from the c...</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-[#181315] space-y-6">
            <div>
              <h3 className="text-white font-bold mb-2">Support</h3>
              <p className="text-[#9E9398] text-sm leading-relaxed">
                Please open a ticket on our <a href="https://discord.gg/N7XCTXmzMu" target="_blank" rel="noopener noreferrer" className="text-[#C5B9BF] font-bold hover:underline">discord server</a> if you have any questions before checkout. You can also email <a href="mailto:sxpper@gmail.com" className="text-[#C5B9BF] font-bold hover:underline">sxpper@gmail.com</a>. Please note it may take up to 20 minutes to be credited in-game.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Refund Policy</h3>
              <p className="text-[#9E9398] text-sm leading-relaxed">
                All payments are final and non-refundable. Due to the digital nature of the products we sell, our products are intangible and exempt under the Consumer Protection Act 2015. This includes if the purchased items are no longer accessible due to a punishment on the network.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen relative">
      <div className="mb-8">
        <button 
          onClick={() => setActiveCategory(null)}
          className="flex items-center text-[var(--muted-foreground)] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </button>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-black text-[var(--foreground)] mb-6 tracking-tight capitalize">{activeCategory} Store</h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Support the server and get amazing perks in return! All purchases are processed securely and delivered automatically in-game.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 sticky top-24">
            <h3 className="font-bold text-[var(--foreground)] mb-4 px-2 uppercase tracking-widest text-xs">Categories</h3>
            <div className="space-y-1">
              {['ranks', 'coins'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors capitalize ${
                    activeCategory === cat 
                      ? 'bg-[var(--primary)] text-white shadow-lg' 
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Content */}
        <div className="flex-1">
          {activeCategory === 'ranks' && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-[var(--foreground)]">Server Ranks</h2>
              <div className="flex items-center bg-[var(--card)] rounded-lg p-1 border border-[var(--border)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md flex items-center transition-colors ${viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted-foreground)] hover:text-white'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md flex items-center transition-colors ${viewMode === 'table' ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted-foreground)] hover:text-white'}`}
                  title="Compare View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeCategory === 'ranks' && viewMode === 'table' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#2D1B22] rounded-2xl border border-[#442934] overflow-x-auto shadow-xl"
            >
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-6 border-b border-[#442934] bg-[#33232A] font-medium text-[var(--muted-foreground)] w-1/4">Perk / Feature</th>
                    {PACKAGES.map(pkg => (
                      <th key={pkg.id} className="p-6 border-b border-[#442934] bg-[#33232A] text-center w-[15%]">
                        <div className="text-xl font-display font-bold mb-1" style={{ color: pkg.themeColor }}>{pkg.name}</div>
                        <div className="text-lg font-bold text-white">{pkg.price}</div>
                        <div className="text-xs text-[var(--muted-foreground)] mt-1">{pkg.inrPrice}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#442934]">
                  {[
                    { label: 'Kit Cooldown', keys: ['7 days', '7 days', '7 days', '7 days', '7 days'] },
                    { label: 'Chat Color', keys: ['Yellow', 'Orange', 'Aqua', 'Purple', 'Pink'] },
                    { label: 'Bonus Coins', keys: ['+500', '+1,100', '+2,100', '+3,500', '+5,600'] },
                    { label: 'Sethome Slots', keys: ['3', '5', '7', '10', '15'] },
                    { label: 'Auction Slots', keys: ['3', '5', '7', '10', '15'] },
                    { label: 'Vaults', keys: ['1', '2', '3', '5', '7'] },
                    { label: 'Order Limit', keys: ['-', '-', '9', '13', '15'] },
                    { label: '/hat Command', keys: ['-', 'Yes', 'Yes', 'Yes', 'Yes'] },
                    { label: '/craft & /enderchest', keys: ['-', '-', 'Yes', 'Yes', 'Yes'] },
                    { label: '/nick', keys: ['-', '-', '-', 'Yes', 'Yes'] },
                    { label: '/anvil & /lay', keys: ['-', '-', '-', '-', 'Yes'] },
                    { label: 'Misc Commands', keys: ['-', '-', '-', '-', '/feed, /heal, /disposal, /grindstone, /smithingtable'] },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#33232A]/50 transition-colors">
                      <td className="p-4 font-medium text-[var(--foreground)] border-r border-[#442934]">{row.label}</td>
                      {row.keys.map((val, j) => (
                        <td key={j} className="p-4 text-center text-sm text-[var(--muted-foreground)] border-r border-[#442934] last:border-0">
                          {val === 'Yes' ? (
                            <Check className="w-5 h-5 mx-auto" style={{ color: PACKAGES[j].themeColor }} />
                          ) : val === '-' ? (
                            <X className="w-4 h-4 mx-auto text-[var(--muted-foreground)]/50" />
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-6 border-r border-[#442934]"></td>
                    {PACKAGES.map(pkg => (
                      <td key={pkg.id} className="p-6 text-center border-r border-[#442934] last:border-0">
                        <button 
                          className="w-full py-3 text-white rounded-xl text-sm font-bold transition-all hover:opacity-90 shadow-lg hover:scale-105"
                          style={{ backgroundColor: pkg.themeColor, color: pkg.id === 'elite' || pkg.id === 'warrior' || pkg.id === 'master' ? '#000' : '#fff' }}
                        >
                          Buy Now
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}

          {activeCategory === 'ranks' && viewMode !== 'table' && (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {PACKAGES.map((pkg, idx) => {
                  const Icon = pkg.id === 'elite' ? Star : 
                               pkg.id === 'warrior' ? Zap : 
                               pkg.id === 'gladiator' ? Sparkles : Crown;

                  return (
                    <motion.div
                      key={pkg.id}
                      onClick={() => setSelectedRank(pkg)}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ 
                        scale: 1.03, 
                        y: -8,
                        boxShadow: `0 15px 40px -10px ${pkg.themeColor}70, 0 0 20px ${pkg.themeColor}30`,
                        borderColor: pkg.themeColor,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-[#2D1B22] border-2 border-[#442934] rounded-xl overflow-hidden flex flex-col cursor-pointer shadow-lg group relative z-0 hover:z-10"
                    >
                      <div className="p-8 flex flex-col items-center justify-center relative min-h-[260px]">
                        {pkg.tag && (
                          <div 
                            className="absolute top-4 right-4 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10 shadow-lg"
                            style={{ backgroundColor: pkg.themeColor }}
                          >
                            {pkg.tag}
                          </div>
                        )}
                        {/* Glow effect behind icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                          <div className="w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: pkg.themeColor }} />
                        </div>
                        <div 
                          className="w-48 h-48 flex items-center justify-center z-10 transform transition-transform group-hover:scale-110 duration-500"
                        >
                          <img 
                            src={`/${pkg.id === 'berryplus' ? 'berry+' : pkg.id}.png`} 
                            alt={`${pkg.name} Rank`}
                            className="w-full h-full object-contain"
                            style={{ mixBlendMode: 'lighten' }}
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <Icon className="w-20 h-20 hidden" style={{ color: pkg.themeColor }} />
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex flex-col items-center text-center">
                        <h3 className="text-3xl font-black mb-2 tracking-wider uppercase drop-shadow-md" style={{ color: pkg.themeColor }}>
                          {pkg.name} Rank
                        </h3>
                        <div className="flex flex-col items-center mb-6">
                          <div className="text-[var(--muted-foreground)] text-xl font-medium">
                            {pkg.price}
                          </div>
                          <div className="text-[var(--muted-foreground)]/70 text-sm mt-1">
                            {pkg.inrPrice}
                          </div>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // prevent modal opening if just clicking button
                            toast.success(`${pkg.name} Rank added to cart!`);
                          }}
                          className="w-full py-4 bg-gradient-to-r from-[#8C153B] to-[#A31845] hover:from-[#A31845] hover:to-[#C01D51] text-white rounded font-bold transition-all text-base uppercase tracking-wider shadow-[0_0_15px_rgba(140,21,59,0.4)] hover:shadow-[0_0_25px_rgba(163,24,69,0.6)] hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          )}

          {activeCategory === 'coins' && (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COIN_PACKAGES.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    onClick={() => setSelectedCoin(pkg)}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -8,
                      boxShadow: `0 15px 40px -10px ${pkg.isCrown ? '#FDE047' : '#FBBF24'}70, 0 0 20px ${pkg.isCrown ? '#FDE047' : '#FBBF24'}30`,
                      borderColor: pkg.isCrown ? '#FDE047' : '#FBBF24',
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-[#2D1B22] border-2 border-[#442934] rounded-xl overflow-hidden flex flex-col cursor-pointer shadow-lg group relative z-0 hover:z-10"
                  >
                    <div className="p-8 flex flex-col items-center justify-center relative min-h-[220px] bg-[#33232A]">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="w-48 h-48 rounded-full blur-3xl bg-yellow-400" />
                      </div>
                      <div className="w-32 h-32 flex items-center justify-center z-10 transform transition-transform group-hover:scale-110 duration-500 relative">
                         {pkg.isCrown && <Crown className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 drop-shadow-md z-20 transform rotate-12" />}
                        <img 
                          src={`/${pkg.image}`} 
                          alt={pkg.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                        />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col items-center text-center bg-[#2D1B22] flex-1">
                      <h3 className="text-2xl font-black mb-4 tracking-wide text-yellow-400 drop-shadow-sm">
                        {pkg.name}
                      </h3>
                      <div className="flex flex-col items-center mb-6">
                        <div className="text-white text-xl font-bold">
                          {pkg.inrPrice} {pkg.isCrown && "👑"}
                        </div>
                      </div>
                      
                      <div className="mt-auto w-full">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`${pkg.name} added to cart!`);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black rounded font-bold transition-all text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Rank Details Modal */}
      <AnimatePresence>
        {selectedRank && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRank(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] max-h-[80vh] flex flex-col bg-[#2A1D23] rounded-xl border border-[#442934] shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#442934] bg-[#33232A]">
                <h2 className="text-2xl font-bold tracking-wide uppercase" style={{ color: selectedRank.themeColor }}>
                  {selectedRank.name} Rank
                </h2>
                <button 
                  onClick={() => setSelectedRank(null)}
                  className="p-1 hover:bg-[#442934] rounded-md transition-colors"
                >
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar text-[#E0D8DB]">
                {selectedRank.detailedFeatures?.map((featureBlock, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-xl mb-3 tracking-wide" style={{ color: selectedRank.themeColor }}>
                      {featureBlock.category}
                    </h3>
                    <ul className="space-y-3">
                      {featureBlock.items.map((item, i) => (
                        <li key={i} className="flex items-start text-lg">
                          <Diamond className="w-4 h-4 mt-1.5 mr-3 flex-shrink-0" style={{ color: selectedRank.themeColor }} />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-[#442934] bg-[#33232A] flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-2xl font-medium text-white">
                    {selectedRank.price}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-0.5">
                    {selectedRank.inrPrice}
                  </div>
                </div>
                <button 
                  onClick={() => toast.success(`${selectedRank.name} Rank added to cart!`)}
                  className="px-10 py-4 bg-gradient-to-r from-[#8C153B] to-[#A31845] hover:from-[#A31845] hover:to-[#C01D51] text-white rounded font-bold transition-all text-base uppercase tracking-wider shadow-[0_0_15px_rgba(140,21,59,0.4)] hover:shadow-[0_0_25px_rgba(163,24,69,0.6)] hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Coin Details Modal */}
      <AnimatePresence>
        {selectedCoin && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoin(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] flex flex-col bg-[#2A1D23] rounded-xl border border-[#442934] shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#442934] bg-[#2A1D23]">
                <h2 className="text-xl font-bold tracking-wide text-white">
                  {selectedCoin.name}
                </h2>
                <button 
                  onClick={() => setSelectedCoin(null)}
                  className="p-1 hover:bg-[#442934] rounded-md transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="p-6 bg-[#2A1D23]">
                <p className="text-[#DBDEE1] text-lg leading-relaxed font-medium">
                  Use coins in the in-game /coinshop to purchase items such as crate keys, perks, and more!
                </p>
              </div>

              <div className="px-6 py-5 border-t border-[#442934] bg-[#2A1D23] flex items-center justify-between">
                <div className="text-xl font-medium text-[#DBDEE1]">
                  {selectedCoin.inrPrice}
                </div>
                <button 
                  onClick={() => {
                    toast.success(`${selectedCoin.name} added to cart!`);
                    setSelectedCoin(null);
                  }}
                  className="px-10 py-3 bg-[#8C153B] hover:bg-[#A31845] text-white rounded font-bold transition-all text-base shadow-[0_0_15px_rgba(140,21,59,0.2)] hover:shadow-[0_0_20px_rgba(163,24,69,0.4)] hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
