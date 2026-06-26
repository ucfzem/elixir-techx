import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Mail, MapPin, TrendingUp, DollarSign, Package, Clock, ChevronDown, ChevronUp, Loader2, Truck, CheckCircle, ExternalLink, Send, Banknote } from 'lucide-react';
import SEO from '../components/SEO';

type OrderItem = {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  total: number;
  status: string;
  tracking: string | null;
  payment_method: string;
  payment_code: string | null;
  created_at: string;
  items: OrderItem[];
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [trackingInputs, setTrackingInputs] = useState<Record<number, string>>({});
  const [updating, setUpdating] = useState<number | null>(null);

  const loadOrders = () => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, []);

  const toggle = (id: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    try {
      const tracking = trackingInputs[id] || null;
      await fetch('/api/fulfill', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, tracking }),
      });
      loadOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
  const pending = orders.filter(o => o.status === 'pending_payment').length;
  const toFulfill = orders.filter(o => o.status === 'confirmed').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;

  const statusBadge = (status: string, tracking?: string | null) => {
    const config: Record<string, { label: string; style: string }> = {
      pending_payment: { label: 'En attente', style: 'bg-amber-500/20 text-amber-400' },
      confirmed: { label: 'À commander', style: 'bg-blue-500/20 text-blue-400' },
      ordered: { label: 'Commandé fournisseur', style: 'bg-purple-500/20 text-purple-400' },
      shipped: { label: 'Expédié', style: 'bg-green-500/20 text-green-400' },
      fulfilled: { label: 'Livré', style: 'bg-gray-700 text-gray-300' },
    };
    const c = config[status] || { label: status, style: 'bg-gray-800 text-gray-400' };
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider ${c.style}`}>
          {c.label}
        </span>
        {tracking && (
          <span className="text-[10px] text-gray-600 font-mono">{tracking}</span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <SEO title="Administration" description="Tableau de bord administrateur TechStore" path="/admin" />
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Administration</h1>
            <p className="text-gray-500 text-sm">{orders.length} commande{orders.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: ShoppingBag, label: 'Total', value: orders.length, color: 'from-cyan-500 to-blue-600' },
            { icon: DollarSign, label: 'Revenu', value: `${totalRevenue.toFixed(2)} €`, color: 'from-green-500 to-emerald-600' },
            { icon: Package, label: 'À commander', value: toFulfill, color: 'from-blue-500 to-indigo-600' },
            { icon: Truck, label: 'Expédiées', value: shipped, color: 'from-purple-500 to-pink-600' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Workflow Guide */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 mb-6">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-blue-400" /> Flux dropshipping
          </h3>
          <ol className="text-xs text-gray-400 space-y-1 ml-5 list-decimal">
            <li>Client commande sur le site (statut: <span className="text-amber-400">en attente</span>)</li>
            <li>Vous commandez le produit sur <strong className="text-white">AliExpress</strong> avec l'adresse du client</li>
            <li>Marquez la commande comme <span className="text-purple-400">"commandé fournisseur"</span></li>
            <li>Ajoutez le numéro de suivi → marquez <span className="text-green-400">"expédié"</span></li>
          </ol>
        </div>

        {/* Orders */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p>Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden"
              >
                <button onClick={() => toggle(order.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-sm font-bold text-cyan-400">
                      #{order.id}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{order.customer_name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <Mail className="w-3 h-3" /> {order.customer_email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-cyan-400">{Number(order.total).toFixed(2)} €</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(order.created_at)}
                      </div>
                    </div>
                    {statusBadge(order.status, order.tracking)}
                    {expanded.has(order.id) ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                </button>

                {expanded.has(order.id) && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="border-t border-gray-800/50">
                    <div className="p-4 space-y-3 bg-gray-900/30">
                      {/* Address */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-900/50 rounded-xl px-3 py-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-600" /> {order.customer_address}
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-center gap-2 text-xs bg-gray-900/50 rounded-xl px-3 py-2">
                        {order.payment_method === 'cashplus' ? (
                          <>
                            <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Cash Plus</span>
                            {order.payment_code && (
                              <span className="text-emerald-400/60 font-mono ml-1">Code: {order.payment_code}</span>
                            )}
                          </>
                        ) : (
                          <>
                            <Banknote className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-cyan-400 font-medium">Virement bancaire</span>
                          </>
                        )}
                      </div>

                      {/* Items */}
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg bg-gray-900/50">
                          <span className="text-gray-300">{item.product_name} <span className="text-gray-600">×{item.quantity}</span></span>
                          <span className="text-gray-400 font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t border-gray-800/50 px-3">
                        <span className="text-gray-500 font-medium">Total</span>
                        <span className="text-cyan-400 font-bold">{Number(order.total).toFixed(2)} €</span>
                      </div>

                      {/* Fulfillment Actions */}
                      <div className="border-t border-gray-800/50 pt-3 mt-3">
                        <p className="text-[11px] text-gray-600 uppercase tracking-wider mb-2">Gestion de la commande</p>

                        {order.status === 'confirmed' && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => updateStatus(order.id, 'ordered')}
                              disabled={updating === order.id}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium hover:bg-purple-500/30 transition-all disabled:opacity-50"
                            >
                              {updating === order.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Package className="w-3.5 h-3.5" />}
                              Commandé fournisseur
                            </button>
                          </div>
                        )}

                        {(order.status === 'ordered' || order.status === 'confirmed') && (
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <input
                              placeholder="Numéro de suivi"
                              value={trackingInputs[order.id] || ''}
                              onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                              className="flex-1 min-w-[160px] px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs placeholder-gray-600 focus:border-cyan-500 outline-none"
                            />
                            <button
                              onClick={() => updateStatus(order.id, 'shipped')}
                              disabled={updating === order.id}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-all disabled:opacity-50"
                            >
                              {updating === order.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
                              Marquer expédié
                            </button>
                          </div>
                        )}

                        {order.status === 'shipped' && (
                          <button
                            onClick={() => updateStatus(order.id, 'fulfilled')}
                            disabled={updating === order.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-xs font-medium hover:bg-gray-700 transition-all disabled:opacity-50"
                          >
                            {updating === order.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            Marquer livré
                          </button>
                        )}

                        {order.status === 'pending_payment' && (
                          <button
                            onClick={() => updateStatus(order.id, 'confirmed')}
                            disabled={updating === order.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-all disabled:opacity-50"
                          >
                            {updating === order.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                            Paiement reçu → À commander
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
