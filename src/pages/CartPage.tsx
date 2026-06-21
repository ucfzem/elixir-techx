
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, CreditCard, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h2>
          <p className="text-gray-500 mb-8">Découvrez notre sélection de produits high-tech</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
          >
            <ArrowLeft className="w-4 h-4" />
            Parcourir les produits
          </Link>
        </motion.div>
      </div>
    );
  }

  const shippingCost = totalPrice >= 50 ? 0 : 4.99;
  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
              Mon Panier
            </h1>
            <p className="text-gray-500 mt-1">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  className="flex gap-4 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover bg-gray-800"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-semibold text-white hover:text-cyan-400 transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center text-sm transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center text-sm transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-base font-bold text-cyan-400">
                        {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50">
              <h3 className="text-lg font-bold text-white mb-6">Résumé de la commande</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sous-total ({totalItems} articles)</span>
                  <span className="text-white font-medium">{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Livraison</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                    {shippingCost === 0 ? 'Gratuite' : shippingCost.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                {totalPrice < 50 && (
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Tag className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-cyan-400 leading-snug">
                      Plus que <strong>{(50 - totalPrice).toFixed(2)}€</strong> pour la livraison gratuite !
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {totalWithShipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
              >
                <CreditCard className="w-5 h-5" />
                Passer la commande
              </motion.button>

              <p className="text-[11px] text-gray-600 text-center mt-4">
                Paiement sécurisé • Données cryptées SSL 256-bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
