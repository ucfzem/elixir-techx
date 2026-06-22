# Chronologie du projet Elixir TechX

## Objectif
Transformer un site statique React/Vite en une plateforme e-commerce dropshipping fonctionnelle avec Vercel, base de données, auth, admin, et paiement par virement — ciblant le Maroc et l'Europe avec des produits ultra-abordables (≤15€).

## Étapes réalisées

### 1. Infrastructure & Déploiement
- Déploiement Vercel initial du site React/Vite
- Configuration du domain (elixir-techx.vercel.app)
- Mise en place du déploiement automatique via GitHub (`main` branch)

### 2. Base de données & Backend API
- **Base Postgres** (Neon) avec tables `orders`, `order_items`, colonne `tracking`
- **API routes** sous `/api/` pour produits, commandes, sitemap
- Intégration des fonctionnalités serveurless Vercel

### 3. Authentification Clerk
- Inscription/connexion obligatoire pour passer commande
- Page compte client avec données réelles Clerk
- Admin visible uniquement pour `azer.tyu199p@gmail.com`

### 4. Paiement par virement bancaire
- Implémentation complète du checkout avec virement
- Formulaire de confirmation avec RIB/IBAN affiché après commande
- RIB en placeholder en attente des coordonnées bancaires du user

### 5. Administration
- Page admin avec tableau des commandes, statuts, actions
- Workflow: nouvelle → confirmée → expédiée → livrée
- Ajout de numéros de suivi

### 6. Catalogue produits (version finale)
- **Remplacement complet** de l'ancien catalogue (30 produits à 9,90€–39,90€)
- **Nouveau catalogue**: 30 produits à 4,99€–14,99€
- 3 catégories: Tech & Gadgets, Beauté & Bien-être, Maison & Cuisine
- Prix psychologiques (.99)

### 7. Images produits
- 30 images téléchargées depuis diverses sources (Google Images, sites marchands)
- 6 images converties (PNG/WebP → JPEG)
- 2 images réparées après échec de téléchargement initial
- Toutes les 30 images sont des JPEG valides et s'affichent correctement

### 8. SEO & UI
- Sitemap généré dynamiquement sous `/api/sitemap`
- Google Search Console tag déployé
- Hero, description, pied de page, filtres mis à jour
- Badges de catégorie colorés

### 9. Dépôt GitHub
- `https://github.com/ucfzem/elixir-techx`
- Déploiement auto Vercel sur push vers `main`

## En attente
- **RIB/IBAN du user** (banque marocaine) pour finaliser le paiement

## URLs
- **Live**: https://elixir-techx.vercel.app
- **Admin**: https://elixir-techx.vercel.app/admin (connecté avec `azer.tyu199p@gmail.com`)
- **GitHub**: https://github.com/ucfzem/elixir-techx
