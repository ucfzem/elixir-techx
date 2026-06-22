import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Crown, ShoppingBag, CreditCard, LogOut } from 'lucide-react';
import { useUser, useAuth, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function AccountPage() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO title="Mon Compte" description="Gérez votre profil TechStore, vos commandes et vos informations personnelles." path="/account" />
        <SignedOut>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Vous n'êtes pas connecté</h2>
            <p className="text-gray-500 mb-8">Connectez-vous pour accéder à votre compte</p>
            <Link
              to="/sign-in"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Se connecter
            </Link>
          </motion.div>
        </SignedOut>

        <SignedIn>
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                <h1 className="text-3xl font-black text-white">Mon Compte</h1>
              </div>
              <button
                onClick={() => { signOut(); navigate('/'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
            <p className="text-gray-500 ml-14">Gérez votre profil et vos commandes</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Crown, label: 'Statut', value: 'Membre Premium', color: 'from-yellow-500 to-orange-600' },
                  { icon: ShoppingBag, label: 'Commandes', value: '0', color: 'from-cyan-500 to-blue-600' },
                  { icon: CreditCard, label: 'Paiements', value: 'Aucun', color: 'from-purple-500 to-pink-600' },
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

              {/* Orders History Placeholder */}
              <div className="rounded-2xl bg-gray-900/50 border border-gray-800/50 p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">Aucune commande</h3>
                <p className="text-sm text-gray-500 mb-4">Vous n'avez pas encore passé de commande</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:from-cyan-400 transition-all"
                >
                  Parcourir les produits
                </Link>
              </div>
            </div>

            {/* User Detail */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 overflow-hidden">
                {/* Avatar header */}
                <div className="relative h-24 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20">
                  <div className="absolute -bottom-8 left-6">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="w-16 h-16 rounded-2xl border-2 border-gray-900 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-cyan-500/30">
                        {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-12 px-6 pb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {user?.fullName || user?.emailAddresses?.[0]?.emailAddress || 'Utilisateur'}
                  </h3>
                  <p className="text-sm text-cyan-400 mb-6">
                    Membre depuis {user?.createdAt ? formatDate(new Date(user.createdAt)) : '...'}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                      <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[11px] text-gray-500 uppercase tracking-wider">Email</div>
                        <div className="text-sm text-gray-300 break-all">
                          {user?.primaryEmailAddress?.emailAddress || 'Non renseigné'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/70 border border-gray-800/50">
                      <Calendar className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[11px] text-gray-500 uppercase tracking-wider">Date d'inscription</div>
                        <div className="text-sm text-gray-300">
                          {user?.createdAt ? formatDate(new Date(user.createdAt)) : '...'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="mt-6 pt-6 border-t border-gray-800/50">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Actions rapides</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/cart"
                        className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Mon panier
                      </Link>
                      <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                        <User className="w-3.5 h-3.5" />
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
