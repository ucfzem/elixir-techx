
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Users, Crown, ShoppingBag, TrendingUp } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  created_at: string;
}

export default function AccountPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        if (data.length > 0) setSelectedCustomer(data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-black text-white">Mon Compte</h1>
          </div>
          <p className="text-gray-500 ml-14">Gérez votre profil et consultez l'historique des clients</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer List / Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Users, label: 'Clients inscrits', value: customers.length, color: 'from-cyan-500 to-blue-600' },
                { icon: Calendar, label: 'Inscrits ce mois', value: customers.filter(c => {
                  const d = new Date(c.created_at);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length, color: 'from-purple-500 to-pink-600' },
                { icon: Crown, label: 'Clients VIP', value: Math.floor(customers.length * 0.3), color: 'from-yellow-500 to-orange-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Customers Table */}
            <div className="rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden">
              <div className="p-5 border-b border-gray-800/50">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Clients Enregistrés
                </h2>
              </div>

              {loading ? (
                <div className="p-8 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-800 rounded w-1/3" />
                        <div className="h-3 bg-gray-800 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Adresse</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inscription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, i) => (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSelectedCustomer(customer)}
                          className={`border-b border-gray-800/30 cursor-pointer transition-colors hover:bg-gray-800/30 ${
                            selectedCustomer?.id === customer.id ? 'bg-cyan-500/5' : ''
                          }`}
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-sm font-bold text-cyan-400 border border-cyan-500/30">
                                {customer.name.charAt(0)}
                              </div>
                              <span className="font-medium text-white text-sm">{customer.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-400 hidden sm:table-cell">{customer.email}</td>
                          <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell max-w-[200px] truncate">{customer.address}</td>
                          <td className="px-5 py-4">
                            <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(customer.created_at)}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Selected Customer Detail */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 overflow-hidden">
              {selectedCustomer ? (
                <>
                  {/* Avatar header */}
                  <div className="relative h-24 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20">
                    <div className="absolute -bottom-8 left-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-cyan-500/30">
                        {selectedCustomer.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 px-6 pb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{selectedCustomer.name}</h3>
                    <p className="text-sm text-cyan-400 mb-6">Client depuis le {formatDate(selectedCustomer.created_at)}</p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                        <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase tracking-wider">Email</div>
                          <div className="text-sm text-gray-300 break-all">{selectedCustomer.email}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                        <MapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase tracking-wider">Adresse</div>
                          <div className="text-sm text-gray-300">{selectedCustomer.address}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                        <Calendar className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase tracking-wider">Date d'inscription</div>
                          <div className="text-sm text-gray-300">{formatDate(selectedCustomer.created_at)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="mt-6 pt-6 border-t border-gray-800/50">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Actions rapides</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Commandes
                        </button>
                        <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                          <User className="w-3.5 h-3.5" />
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-10 text-center">
                  <User className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Sélectionnez un client</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
