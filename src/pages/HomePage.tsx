import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, Zap, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { WebSiteSchema, OrganizationSchema } from '../components/SchemaOrg';
import { fetchProducts } from '../data/api';
import type { Product } from '../data/products';

const categories = ['all', 'Tech & Gadgets', 'Beauté & Bien-être', 'Maison & Cuisine'];
const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'name_asc', label: 'Nom A-Z' },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ category, sort, search });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-950">
      <SEO
        title="Accueil"
        description="Elixir Techx — Votre boutique en ligne de gadgets tech, beauté et maison à petits prix. Livraison au Maroc et en Europe."
        path="/"
        keywords="elixir techx, gadgets pas chers, tech, beauté, maison, cuisine, maroc, e-commerce, dropshipping"
      />
      <WebSiteSchema />
      <OrganizationSchema />
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">💰 Jusqu'à -80% vs les marques — Livraison Maroc & Europe</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 leading-tight">
              Les meilleurs{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                petits prix
              </span>{' '}
              <br />Tech, Beauté & Maison
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Des gadgets innovants, produits de beauté et accessoires maison à partir de 4,99€.
              Livraison rapide au Maroc et en Europe.
            </p>
          </motion.div>

          {/* Features bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { icon: Zap, label: 'Prix Mini', desc: 'À partir de 4,99€' },
              { icon: Shield, label: 'Paiement Sécurisé', desc: 'Virement bancaire' },
              { icon: Truck, label: 'Livraison Partout', desc: 'Maroc & Europe' },
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800/50">
                <feat.icon className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">{feat.label}</div>
                  <div className="text-[11px] text-gray-500">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-gray-950/95 backdrop-blur-xl border-y border-gray-800/50">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {/* Category pills */}
              <div className="flex items-center gap-2">
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      category === cat
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {cat === 'all' ? 'Tous' : cat}
                  </button>
                ))}
              </div>

              {/* Sort toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 pt-4 border-t border-gray-800/50"
            >
              <div className="flex flex-wrap gap-2">
                {categories.slice(5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      category === cat
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <label className="text-xs text-gray-500">Trier :</label>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-xs focus:border-cyan-500 outline-none"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-56 bg-gray-900 rounded-t-2xl" />
                <div className="p-5 space-y-3 bg-gray-900/50 rounded-b-2xl border border-gray-800/50 border-t-0">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="flex justify-between pt-3">
                    <div className="h-6 bg-gray-800 rounded w-20" />
                    <div className="h-8 bg-gray-800 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <span className="text-cyan-400 font-semibold">{products.length}</span> produits trouvés
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
