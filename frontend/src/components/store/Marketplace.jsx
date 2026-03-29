import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, ShoppingCart, Star } from 'lucide-react';
import { staggerContainer, fadeIn, scaleUp } from '../../utils/animations';
import { useTranslation } from 'react-i18next';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Ugaoo Neem Oil Spray 100ml',
    category: 'Organic',
    price: 450,
    rating: 4.8,
    img: 'https://www.ugaoo.com/cdn/shop/files/Neem_Oil_100_ML.jpg?v=1747289957&width=1000',
    bgLight: true
  },
  {
    id: 2,
    name: 'NPK 19:19:19 Fertilizer 1kg',
    category: 'Chemicals',
    price: 320,
    rating: 4.5,
    img: '/shopping.webp',
    bgLight: true
  },
  {
    id: 3,
    name: 'Drip Irrigation Starter Kit',
    category: 'Equipment',
    price: 3500,
    rating: 4.9,
    img: 'https://m.media-amazon.com/images/I/81I6nU9M7mL._SL1500_.jpg',
    bgLight: true
  },
  {
    id: 4,
    name: 'High-Yield Wheat Seeds HW-222',
    category: 'Seeds',
    price: 850,
    rating: 4.6,
    img: 'https://m.media-amazon.com/images/I/71uL+mXy9CL._SL1500_.jpg',
    bgLight: true
  },
  {
    id: 5,
    name: 'Pro Garden Pressure Sprayer 2L',
    category: 'Equipment',
    price: 550,
    rating: 4.7,
    img: 'https://m.media-amazon.com/images/I/61x47K5XvNL._SL1500_.jpg',
    bgLight: true
  },
  {
    id: 6,
    name: 'Green World Organic Manure 5kg',
    category: 'Organic',
    price: 480,
    rating: 4.8,
    img: 'https://rukminim2.flixcart.com/image/1600/2140/j110uq80/soil-manure/p/h/g/50-organic-vermicompost-50-kgs-100-organic-natural-green-world-original-imaeq86fkrzzhv4g.jpeg?q=60',
    bgLight: true
  }
];

export const Marketplace = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: t('store.categories.all') },
    { id: 'Organic', label: t('store.categories.organic') },
    { id: 'Chemicals', label: t('store.categories.chemicals') },
    { id: 'Equipment', label: t('store.categories.equipment') },
    { id: 'Seeds', label: t('store.categories.seeds') },
  ];

  const filteredProducts = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 h-full pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <motion.div variants={fadeIn}>
          <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-lg">
            <ShoppingBag className="w-10 h-10 text-primary-400" />
            {t('store.title')}
          </h2>
          <p className="mt-3 text-lg text-slate-300 max-w-xl font-medium">
            {t('store.subtitle')}
          </p>
        </motion.div>

        <motion.div variants={fadeIn} className="flex gap-2 p-1.5 glass-panel rounded-full overflow-x-auto no-scrollbar border-white/10 border shadow-2xl">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === category.id
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        key={activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mt-12"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={scaleUp}
            whileHover={{ y: -20 }}
            className="group relative"
          >
            {/* 3D Stack Base Layers (Hidden until hover) */}
            <div className="absolute inset-x-4 -bottom-3 h-full bg-slate-800/40 rounded-[24px] transition-all duration-500 group-hover:-bottom-6 group-hover:bg-primary-500/10 z-0"></div>
            <div className="absolute inset-x-8 -bottom-6 h-full bg-slate-900/40 rounded-[24px] transition-all duration-700 group-hover:-bottom-12 group-hover:bg-primary-500/5 z-0"></div>

            {/* Hover Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-[26px] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 z-0"></div>

            {/* Main Primary Card */}
            <div className="relative glass-card rounded-[24px] overflow-hidden flex flex-col border border-white/10 group-hover:border-primary-500/50 transition-all duration-500 z-10 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
              <div className={`relative h-60 overflow-hidden border-b border-white/5 ${product.bgLight ? 'bg-white p-6' : 'bg-slate-800'}`}>
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg border ${product.category === 'Organic' ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/50' :
                      product.category === 'Chemicals' ? 'bg-orange-900/80 text-orange-300 border-orange-500/50' :
                        product.category === 'Seeds' ? 'bg-amber-900/80 text-amber-300 border-amber-500/50' :
                          'bg-blue-900/80 text-blue-300 border-blue-500/50'
                    }`}>
                    {product.category}
                  </span>
                </div>
                {!product.bgLight && <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-[5]"></div>}
                <img
                  src={product.img}
                  alt={product.name}
                  className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 ease-out ${!product.bgLight ? 'object-cover' : ''}`}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow text-left bg-slate-900/40">
                <h3 className="font-extrabold text-white text-lg leading-tight mb-2 line-clamp-2 drop-shadow-md">{product.name}</h3>

                <div className="flex items-center gap-1 mb-6 text-sm text-slate-300 font-bold mt-auto drop-shadow-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                  {product.rating} <span className="text-slate-500 ml-1 font-medium">({t('store.ratingLabel')})</span>
                </div>

                <div className="flex items-end justify-between border-t border-white/10 pt-5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase mb-1">{t('store.priceLabel')}</span>
                    <span className="text-2xl font-black text-primary-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">₹{product.price}</span>
                  </div>

                  <button className="flex items-center justify-center bg-primary-600/20 text-primary-400 hover:bg-primary-500 hover:text-white p-3.5 rounded-2xl transition-all shadow-sm border border-primary-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110">
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
