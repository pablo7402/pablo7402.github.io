# Migration vers GitHub Pages (hébergement gratuit, sans limite de crédit)

Pourquoi : Netlify facture maintenant en crédits (vite épuisés), et Cloudflare Pages s'est révélé trop compliqué à configurer correctement. GitHub Pages est gratuit, illimité pour un usage personnel, sans système de crédit et sans risque de coupure — le site se reconstruit et se republie automatiquement à chaque `git push`, exactement comme avant.

Pour la connexion au mode éditeur (bouton "Login with GitHub"), on utilise Netlify uniquement comme relais technique de connexion — on ne déploie rien dessus, donc aucun crédit n'est jamais consommé.

Tout le code nécessaire est déjà prêt dans le projet (dossier `.github/workflows/`, `/admin/config.yml` mis à jour). Il reste 5 étapes, toutes dans le navigateur.

## Étape 1 — Renommer le dépôt GitHub

Pour que le site soit accessible à une adresse simple (`https://pablo7402.github.io`, sans rien après), il faut que le dépôt s'appelle exactement `pablo7402.github.io`.

1. Va sur ton dépôt **site-moto** sur github.com.
2. **Settings** (en haut du dépôt) → tout en haut, champ **Repository name**.
3. Remplace `site-moto` par `pablo7402.github.io` → **Rename**.
4. Dans **GitHub Desktop**, le dépôt continue de fonctionner normalement (le nom affiché se met à jour tout seul au prochain lancement).

## Étape 2 — Activer GitHub Pages

1. Toujours dans **Settings** du dépôt → menu de gauche **Pages**.
2. Section **Build and deployment** → **Source** → choisis **GitHub Actions** (pas "Deploy from a branch").
3. C'est tout : dès que tu pousses ce projet (avec le nouveau dossier `.github/workflows/`), le site se construit et se publie automatiquement. Tu peux suivre la progression dans l'onglet **Actions** du dépôt.
4. Après quelques minutes, ton site est en ligne à **https://pablo7402.github.io**.

## Étape 3 — Créer l'application OAuth GitHub

1. Va sur **github.com/settings/developers** → onglet **OAuth Apps** → **New OAuth App**.
2. Remplis :
   - Application name : `Le carnet de Pablo — éditeur`
   - Homepage URL : `https://pablo7402.github.io`
   - Authorization callback URL : `https://api.netlify.com/auth/done` — **exact, ne rien ajouter d'autre**.
3. Clique **Register application**.
4. Note le **Client ID** affiché, puis clique **Generate a new client secret** et note le **Client Secret** (affiché une seule fois).

## Étape 4 — Créer un site Netlify "vide" (juste pour la connexion)

Ce site Netlify ne sert à rien d'autre qu'à gérer la connexion GitHub — on ne lui donne jamais le code du site, donc il ne construit jamais rien et ne consomme aucun crédit.

1. Va sur **app.netlify.com** et connecte-toi (ou crée un compte gratuit).
2. **Add new site** → **Deploy manually**.
3. Sur l'écran suivant, glisse-dépose n'importe quel petit dossier vide ou un simple fichier `index.html` (peu importe le contenu — ce site ne sera jamais visité). Donne-lui un nom si demandé, par exemple `pablo-cms-auth`.
4. Une fois le site créé, va dans **Site configuration** → **General** → tout en bas, section **OAuth** (ou **Access control** → **OAuth** selon la version) → **Install provider**.
5. Choisis **GitHub**, colle le **Client ID** et le **Client Secret** notés à l'étape 3 → **Save**.

## Étape 5 — Vérifier la connexion

1. Va sur `https://pablo7402.github.io/admin/`.
2. Clique **Login with GitHub**.
3. Une fenêtre s'ouvre, demande d'autoriser l'application → accepte.
4. Tu arrives dans l'éditeur, connecté avec ton compte GitHub. Toute modification enregistrée ici crée un vrai commit sur ton dépôt, comme avant.

---

**Pour tester en local** (sur ton ordinateur, avant de publier), rien ne change : lance toujours `npx eleventy --serve` et `npx decap-server` dans deux onglets de terminal, comme décrit dans `GUIDE-TEST-LOCAL.md`.

**Les fichiers `functions/`, `worker.js` et `wrangler.toml`** datent de la tentative Cloudflare et ne servent plus à rien avec cette configuration — tu peux les ignorer, ou les supprimer plus tard depuis le Finder si tu veux faire le ménage.
