import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Clock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

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

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const categoryColors: Record<string, string> = {
    'Tech & Gadgets': 'from-cyan-500 to-blue-600',
    'Beauté & Bien-être': 'from-pink-500 to-rose-600',
    'Maison & Cuisine': 'from-amber-500 to-orange-600',
  };

  const gradient = categoryColors[product.category] || 'from-gray-500 to-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block h-full">
        <div className="relative h-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl border border-gray-800/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          {/* Image */}
          <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-900">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${gradient}`}>
              {product.category}
            </span>

            {/* Stock indicator */}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-red-500/90 text-white animate-pulse">
                Stock: {product.stock}
              </span>
            )}
            {product.stock === 0 && (
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-700 text-gray-400">
                Rupture
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1.5">
              {product.name}
            </h3>
            
            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {product.description}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-3 mb-4 text-[11px] text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(product.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                {product.stock} en stock
              </span>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Ajouter
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
