
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, CreditCard, Tag, Loader2, CheckCircle, LogIn, Clock, FileText, Building2, Copy, Banknote, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import SEO from '../components/SEO';
import { checkout } from '../data/api';
import { useUser } from '@clerk/clerk-react';

const BANK_DETAILS = {
  bank: 'Votre Banque',
  rib: '_________________',
  iban: 'MA____________________________',
  titulaire: 'Nom du titulaire',
};

type PaymentMethod = 'virement' | 'cashplus';

export default function CartPage() {
  const { user, isSignedIn } = useUser();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderError, setOrderError] = useState('');
  const [copied, setCopied] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('virement');
  const [paymentCode, setPaymentCode] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckingOut(true);
    setOrderError('');
    try {
      const customer = {
        name: user?.fullName || user?.emailAddresses?.[0]?.emailAddress || 'Client',
        email: user?.primaryEmailAddress?.emailAddress || 'client@example.com',
        address: 'Paris, France',
      };
      const result = await checkout(
        items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        customer,
        paymentMethod
      );
      if (result.success) {
        setOrderId(result.order.id);
        setPaymentCode(result.order.payment_code);
        setOrderDone(true);
        clearCart();
      }
    } catch {
      setOrderError('Erreur de paiement. Veuillez réessayer.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex flex-col items-center justify-center px-4">
        <SEO title="Panier vide" description="Votre panier est vide. Découvrez notre sélection de produits high-tech." path="/cart" />
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
      <SEO title="Panier" description="Votre panier TechStore — révisez vos articles avant de passer commande." path="/cart" />
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
                      onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg' }}
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

              {orderError && (
                <p className="text-sm text-red-400 text-center mb-3">{orderError}</p>
              )}

              {orderDone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-3 py-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                    <span className="text-green-400 font-semibold">Commande confirmée !</span>
                    {orderId && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900/50 rounded-xl px-4 py-2 border border-gray-800">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        Commande #{orderId}
                      </div>
                    )}
                  </div>

                  {paymentCode ? (
                    /* Cash Plus Payment Info */
                    <div className="rounded-xl bg-gray-900/70 border border-emerald-500/20 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 px-4 py-3 border-b border-emerald-500/20">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                          <Banknote className="w-4 h-4" />
                          Cash Plus Payment
                        </div>
                      </div>
                      <div className="p-4 space-y-3 text-sm">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Rendez-vous dans <strong>n'importe quelle agence Cash Plus</strong> avec ce code de paiement.
                        </p>
                        <div className="flex flex-col items-center gap-2 py-4">
                          <div className="text-[10px] text-gray-600 uppercase tracking-widest">Code de paiement</div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-black tracking-widest text-emerald-400 font-mono bg-gray-950 px-4 py-2 rounded-xl border border-emerald-500/30">
                              {paymentCode}
                            </span>
                            <button
                              onClick={() => { navigator.clipboard.writeText(paymentCode); setCopied('code'); setTimeout(() => setCopied(''), 1500); }}
                              className="p-2 rounded-lg text-gray-600 hover:text-emerald-400 transition-colors"
                            >
                              {copied === 'code' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <div className="text-[10px] text-gray-600 mt-1">
                            Montant : <span className="text-emerald-400 font-bold">{totalWithShipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-950/50 border border-gray-800">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Présentez ce code à un agent Cash Plus. Votre commande sera traitée dès réception du paiement.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Bank Transfer Info */
                    <div className="rounded-xl bg-gray-900/70 border border-cyan-500/20 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 px-4 py-3 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                          <Building2 className="w-4 h-4" />
                          Virement bancaire
                        </div>
                      </div>
                      <div className="p-4 space-y-3 text-sm">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Veuillez transférer le montant total sur le compte ci-dessous.
                          Votre commande sera traitée dès réception du virement.
                        </p>
                        {[
                          { label: 'Banque', value: BANK_DETAILS.bank, key: 'bank' },
                          { label: 'RIB', value: BANK_DETAILS.rib, key: 'rib' },
                          { label: 'IBAN', value: BANK_DETAILS.iban, key: 'iban' },
                          { label: 'Titulaire', value: BANK_DETAILS.titulaire, key: 'titulaire' },
                        ].map(field => (
                          <div key={field.key} className="flex items-center justify-between gap-2">
                            <span className="text-gray-500 text-xs">{field.label}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-white font-mono text-xs">{field.value}</span>
                              <button
                                onClick={() => { navigator.clipboard.writeText(field.value); setCopied(field.key); setTimeout(() => setCopied(''), 1500); }}
                                className="p-1 rounded text-gray-600 hover:text-cyan-400 transition-colors"
                              >
                                {copied === field.key ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-800">
                          <span className="text-gray-500 text-xs">Montant</span>
                          <span className="text-cyan-400 font-bold text-sm">
                            {totalWithShipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-300 leading-relaxed">
                      <strong>Paiement en attente.</strong>
                      {paymentCode
                        ? ' Effectuez le paiement en agence Cash Plus pour valider votre commande.'
                        : ' Envoyez la preuve de virement par email à contact@elixir-techx.ma pour accélérer le traitement.'}
                    </p>
                  </div>

                  <Link to="/" className="text-sm text-cyan-400 hover:underline font-medium text-center">Continuer vos achats</Link>
                </motion.div>
              ) : isSignedIn ? (
                <div className="flex flex-col gap-3">
                  {/* Payment Method Selector */}
                  <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mode de paiement</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPaymentMethod('virement')}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                          paymentMethod === 'virement'
                            ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                            : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700'
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                        <span className="text-[11px] font-medium">Virement</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('cashplus')}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                          paymentMethod === 'cashplus'
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                            : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700'
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                        <span className="text-[11px] font-medium">Cash Plus</span>
                      </button>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                  >
                    {checkingOut ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CreditCard className="w-5 h-5" />
                    )}
                    {checkingOut ? 'Traitement...' : 'Passer la commande'}
                  </motion.button>
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
                >
                  <LogIn className="w-5 h-5" />
                  Connectez-vous pour commander
                </Link>
              )}

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
