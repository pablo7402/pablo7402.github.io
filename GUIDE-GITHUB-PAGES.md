# Migration vers GitHub Pages (hébergement gratuit, sans limite de crédit)

Pourquoi : Netlify facture maintenant en crédits (vite épuisés), et Cloudflare Pages s'est révélé trop compliqué à configurer correctement. GitHub Pages est gratuit, illimité pour un usage personnel, sans système de crédit et sans risque de coupure — le site se reconstruit et se republie automatiquement à chaque `git push`, exactement comme avant.

Pour la connexion au mode éditeur (bouton "Login with GitHub"), on utilise Vercel — gratuit, uniquement pour gérer 2 petites fonctions de connexion (`/api/auth`, `/api/callback`), pas pour héberger le site. (On a d'abord essayé une astuce avec Netlify seul, mais elle ne fonctionne pas de façon fiable — Netlify bloque le renvoi de connexion vers un site hébergé ailleurs. Vercel, lui, fonctionne très bien pour ça.)

Tout le code nécessaire est déjà prêt dans le projet (dossier `.github/workflows/`, `api/`, `vercel.json`, `/admin/config.yml`). Il reste 6 étapes, toutes dans le navigateur.

## Étape 1 — Renommer le dépôt GitHub

Pour que le site soit accessible à une adresse simple (`https://pablo7402.github.io`, sans rien après), il faut que le dépôt s'appelle exactement `pablo7402.github.io`.

1. Va sur ton dépôt sur github.com.
2. **Settings** (en haut du dépôt) → tout en haut, champ **Repository name**.
3. Remplace le nom actuel par `pablo7402.github.io` → **Rename**.
4. Dans **GitHub Desktop**, le dépôt continue de fonctionner normalement.

## Étape 2 — Activer GitHub Pages

1. Toujours dans **Settings** du dépôt → menu de gauche **Pages**.
2. Si un message demande de rendre le dépôt public : **Settings → General → Danger Zone → Change visibility → Change to public**.
3. Section **Build and deployment** → **Source** → choisis **GitHub Actions**.
4. Envoie tes changements avec **GitHub Desktop** (Commit → Push origin) si ce n'est pas déjà fait. Suis la progression dans l'onglet **Actions** du dépôt.
5. Ton site est en ligne à **https://pablo7402.github.io**. (Si le tout premier déploiement échoue avec une erreur 404, clique **Re-run all jobs** sur cette page — ça passe presque toujours au deuxième essai.)

## Étape 3 — Créer l'application OAuth GitHub

1. Va sur **github.com/settings/developers** → onglet **OAuth Apps** → **New OAuth App**.
2. Remplis :
   - Application name : `Le carnet de Pablo — éditeur`
   - Homepage URL : `https://pablo7402.github.io`
   - Authorization callback URL : laisse ce champ de côté pour l'instant, tu le complèteras à l'étape 4 (tu auras besoin de l'adresse Vercel).
3. Clique **Register application**.
4. Note le **Client ID** affiché, puis clique **Generate a new client secret** et note le **Client Secret** (affiché une seule fois).

## Étape 4 — Créer le projet Vercel (connexion uniquement)

1. Va sur **vercel.com** et connecte-toi avec ton compte GitHub (bouton "Continue with GitHub").
2. **Add New** → **Project**.
3. Dans la liste de tes dépôts GitHub, trouve **pablo7402.github.io** → **Import**.
4. Laisse les réglages par défaut (le fichier `vercel.json` du projet indique déjà comment construire le site) → **Deploy**.
5. Après une minute, Vercel te donne une adresse du type `https://pablo7402-github-io.vercel.app` (ou un nom approchant) — note-la précisément.
6. Va dans les réglages du projet → **Settings** → **Environment Variables**. Ajoute deux variables :
   - `GITHUB_CLIENT_ID` → colle le Client ID de l'étape 3.
   - `GITHUB_CLIENT_SECRET` → colle le Client Secret de l'étape 3.
7. Après avoir ajouté les variables, va dans l'onglet **Deployments** → sur le dernier déploiement, menu **⋯** → **Redeploy** (pour que les variables soient bien prises en compte).

## Étape 5 — Compléter l'application OAuth GitHub

1. Retourne sur **github.com/settings/developers** → ton application → **Edit**.
2. Complète le champ **Authorization callback URL** avec l'adresse Vercel notée + `/api/callback` (exemple : `https://pablo7402-github-io.vercel.app/api/callback`).
3. **Update application**.

## Étape 6 — Vérifier la connexion

1. Ouvre `src/admin/config.yml` dans ton projet, ligne `base_url:` → remplace `https://TON-PROJET.vercel.app` par ta vraie adresse Vercel notée à l'étape 4 (sans `/api/callback` à la fin, juste l'adresse de base).
2. Envoie ce changement avec **GitHub Desktop** (Commit → Push origin).
3. Une fois le site republié (onglet Actions), va sur `https://pablo7402.github.io/admin/`.
4. Clique **Login with GitHub**. Une fenêtre s'ouvre, demande d'autoriser l'application → accepte.
5. Tu arrives dans l'éditeur, connecté avec ton compte GitHub. Toute modification enregistrée ici crée un vrai commit sur ton dépôt, comme avant.

---

**Pour tester en local** (sur ton ordinateur, avant de publier), rien ne change : lance toujours `npx eleventy --serve` et `npx decap-server` dans deux onglets de terminal, comme décrit dans `GUIDE-TEST-LOCAL.md`.

**Les fichiers `functions/`, `worker.js` et `wrangler.toml`** datent de la tentative Cloudflare et ne servent plus à rien avec cette configuration — tu peux les ignorer, ou les supprimer plus tard depuis le Finder si tu veux faire le ménage.

**Le projet Netlify "vide"** créé lors d'une tentative précédente (ex : `steady-muffin-6771cd`) ne sert plus à rien non plus — tu peux le supprimer depuis app.netlify.com → le projet → Project configuration → Danger zone → Delete project.
