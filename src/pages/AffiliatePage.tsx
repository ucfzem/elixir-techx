import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag, ShoppingBag, TrendingUp, Award, ChevronRight, Percent, Sparkles, Rocket, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import { affiliateProducts, affiliatePlatforms, affiliateBenefits } from '../data/affiliate';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AffiliatePage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'aliexpress' | 'temu'>('all');

  const filtered = filter === 'all' ? affiliateProducts : affiliateProducts.filter(p => p.platform === filter);

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <SEO title="Affiliation — Offres exclusives" description="Découvrez les meilleures offres tech, beauté et maison via nos partenaires AliExpress et Temu. Économisez jusqu'à -50%." path="/affiliate" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <Percent className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Affiliation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Meilleures offres <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">via nos partenaires</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              Des produits sélectionnés chez AliExpress et Temu aux prix les plus bas.
              En cliquant, vous soutenez notre site — sans frais supplémentaires pour vous.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {affiliateBenefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50 text-center"
            >
              <span className="text-2xl mb-2 block">{b.icon}</span>
              <h3 className="text-sm font-semibold text-white mb-1">{b.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {affiliatePlatforms.map((p, i) => (
            <motion.a key={i} href={p.signupUrl} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}
              className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/50 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-lg font-bold text-white`}>
                  {p.logo}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 max-w-xs">{p.description}</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 border-b border-gray-800/50 pb-3">
          {(['all', 'aliexpress', 'temu'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'aliexpress' ? 'AliExpress' : 'Temu'}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <motion.a
              key={product.id}
              variants={itemAnim}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30 overflow-hidden transition-all duration-300"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-bold">
                  {product.badge}
                </div>
              )}
              {product.originalPrice && !product.badge && (
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold">
                  Promo
                </div>
              )}

              {/* Platform badge */}
              <div className={`absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                product.platform === 'aliexpress'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}>
                {product.platform === 'aliexpress' ? 'AE' : 'TM'}
              </div>

              {/* Image */}
              <div className="aspect-square bg-gray-800 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-black text-cyan-400">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-gray-600 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="text-[10px] text-gray-600 mt-1.5 flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  Voir l'offre
                </div>
              </div>

              {/* Hover glow */}
              {hoveredId === product.id && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/30 pointer-events-none" />
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center"
      >
        <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/10">
          <Rocket className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Vous voulez devenir partenaire ?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Inscrivez-vous aux programmes d'affiliation AliExpress et Temu pour générer des liens personnalisés.
            Remplacez les liens dans le fichier <code className="text-cyan-400 bg-gray-900 px-2 py-0.5 rounded text-xs">src/data/affiliate.ts</code>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://portals.aliexpress.com/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-red-500 transition-all"
            >
              AliExpress Affiliate <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://affiliate.temu.com/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-sm hover:from-red-400 hover:to-rose-500 transition-all"
            >
              Temu Affiliate <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-start gap-2 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
          <Shield className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
          <p className="text-[11px] text-gray-600 leading-relaxed">
            <strong className="text-gray-500">Disclaimer :</strong> Certains liens sur cette page sont des liens d'affiliation.
            Cela signifie que nous pouvons recevoir une commission si vous effectuez un achat via ces liens, sans coût supplémentaire pour vous.
            En tant que partenaire AliExpress et Temu, nous gagnons sur les achats éligibles.
          </p>
        </div>
      </div>
    </div>
  );
}
