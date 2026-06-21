
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Package, Clock, ChevronRight, Check, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
  created_at: string;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        // Fetch related products (same category)
        const relatedRes = await fetch(`/api/products?category=${data.category}`);
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 4));
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Produit introuvable</h2>
        <Link to="/" className="text-cyan-400 hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumb */}
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{product.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 aspect-square">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Category badge overlay */}
              <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600">
                {product.category}
              </span>
            </div>
            
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl rounded-3xl -z-10" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(127 avis)</span>
              </div>

              <p className="text-gray-400 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Meta info cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                <Package className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">Stock</div>
                  <div className={`text-sm font-semibold ${product.stock > 5 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {product.stock > 0 ? `${product.stock} unités` : 'Rupture de stock'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                <Clock className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">Date d'ajout</div>
                  <div className="text-sm font-semibold text-gray-300">
                    {formatDate(product.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-900/50 border border-cyan-500/20">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
                <span className="text-sm text-gray-500 mb-1.5">TTC</span>
              </div>
              <p className="text-xs text-gray-600">Livraison gratuite à partir de 50€ d'achat</p>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Quantité</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 flex items-center justify-center text-lg font-bold transition-all"
                >
                  −
                </button>
                <span className="w-14 text-center text-lg font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 flex items-center justify-center text-lg font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold transition-all duration-300 mb-6 ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : product.stock === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Ajouté au panier !
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier — {(product.price * quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </>
              )}
            </motion.button>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: 'Garantie 2 ans' },
                { icon: Truck, label: 'Livraison 24-48h' },
                { icon: RotateCcw, label: 'Retour 30 jours' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-900/50 border border-gray-800/30">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-[10px] text-gray-500 text-center leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-800/50">
          <h2 className="text-2xl font-bold text-white mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
