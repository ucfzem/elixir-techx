import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useUser } from '@clerk/clerk-react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import AffiliatePage from './pages/AffiliatePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800/50 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">TechStore</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Votre boutique en ligne de produits innovants à petits prix. Tech, beauté et maison livrés chez vous au Maroc et en Europe.
                  </p>
                </div>

                {/* Products */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Liens</h4>
                  <ul className="space-y-2">
                    <li><a href="/affiliate" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Affiliation</a></li>
                    <li><a href="/" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Boutique</a></li>
                    <li><a href="/cart" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Panier</a></li>
                    <li><a href="/account" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Mon Compte</a></li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
                  <ul className="space-y-2">
                    {['Centre d\'aide', 'Suivi de commande', 'Retours & Remboursements', 'Garantie', 'Contact'].map(item => (
                      <li key={item}>
                        <a href="#" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Newsletter</h4>
                  <p className="text-xs text-gray-500 mb-3">Recevez les offres exclusives et les nouveautés tech.</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="votre@email.fr"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white text-xs placeholder-gray-600 focus:border-cyan-500 outline-none"
                    />
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:from-cyan-400 transition-all">
                      OK
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-10 pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-600">© 2025 Elixir Techx. Tous droits réservés.</p>
                <div className="flex items-center gap-4">
                  {['Mentions légales', 'CGV', 'Confidentialité', 'Cookies'].map(link => (
                    <a key={link} href="#" className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
    </HelmetProvider>
  );
}
