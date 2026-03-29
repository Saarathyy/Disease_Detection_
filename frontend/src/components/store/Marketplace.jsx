import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, ShoppingCart, Star } from 'lucide-react';
import { staggerContainer, fadeIn, scaleUp } from '../../utils/animations';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Neem Oil Spray 1L', category: 'Organic', price: 450, rating: 4.8, img: '/neem-oil.png' },
  { id: 2, name: 'NPK 19:19:19 Fertilizer 10kg', category: 'Chemicals', price: 1200, rating: 4.5, img: '/npk-19-19-19.png' },
  { id: 3, name: 'Drip Irrigation Starter Kit', category: 'Equipment', price: 3500, rating: 4.9, img: '/drip-irrigation.png' },
  { id: 4, name: 'High-Yield Wheat Seeds HW-222', category: 'Seeds', price: 850, rating: 4.6, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
  { id: 5, name: 'Copper Oxychloride Fungicide 500g', category: 'Chemicals', price: 320, rating: 4.4, img: '/copper-oxychloride.png' },
  { id: 6, name: 'Green World Organic Manure 50kg', category: 'Organic', price: 600, rating: 4.7, img: '/green-world-manure.png' },
  { id: 7, name: 'Pro Garden Pressure Spray 2L', category: 'Equipment', price: 650, rating: 4.8, img: '/pressure-spray.png' }
];

const CATEGORIES = ['All', 'Organic', 'Chemicals', 'Equipment', 'Seeds'];

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 h-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <motion.div variants={fadeIn}>
          <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-lg">
            <ShoppingBag className="w-10 h-10 text-primary-400" />
            Agri Marketplace
          </h2>
          <p className="mt-3 text-lg text-slate-300 max-w-xl font-medium">Curated organic solutions, machinery, and seeds precisely matched to your ongoing diagnostic needs.</p>
        </motion.div>
        
        <motion.div variants={fadeIn} className="flex gap-2 p-1.5 glass-panel rounded-full overflow-x-auto no-scrollbar border-white/10 border shadow-2xl">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        variants={staggerContainer}
        key={activeCategory} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            variants={scaleUp}
            className="group glass-card rounded-[24px] overflow-hidden flex flex-col"
          >
            {/* Image Skeleton / Placeholder Cover */}
            <div className="relative h-56 bg-slate-800 overflow-hidden border-b border-white/10">
               <div className="absolute top-4 left-4 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg border ${
                    product.category === 'Organic' ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/50' :
                    product.category === 'Chemicals' ? 'bg-orange-900/80 text-orange-300 border-orange-500/50' :
                    product.category === 'Seeds' ? 'bg-amber-900/80 text-amber-300 border-amber-500/50' :
                    'bg-blue-900/80 text-blue-300 border-blue-500/50'
                  }`}>
                    {product.category}
                  </span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-[5]"></div>
               <img 
                 src={product.img} 
                 alt={product.name} 
                 className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
               />
            </div>
            
            <div className="p-6 flex flex-col flex-grow text-left relative z-10 bg-slate-900/40">
              <h3 className="font-extrabold text-white text-lg leading-tight mb-2 line-clamp-2 drop-shadow-md">{product.name}</h3>
              
              <div className="flex items-center gap-1 mb-4 text-sm text-slate-300 font-bold mt-auto drop-shadow-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                {product.rating} <span className="text-slate-500 ml-1 font-medium">(120+ reviews)</span>
              </div>
              
              <div className="flex items-end justify-between border-t border-white/10 pt-5">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-bold tracking-widest uppercase">Price</span>
                  <span className="text-3xl font-black text-primary-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">₹{product.price}</span>
                </div>
                
                <button className="flex items-center justify-center bg-primary-600/20 text-primary-400 hover:bg-primary-500/40 hover:text-white p-3.5 rounded-2xl transition-all shadow-sm border border-primary-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <ShoppingCart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  );
};
