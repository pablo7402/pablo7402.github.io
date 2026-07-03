# Migration Netlify → Cloudflare Pages

Pourquoi : le plan gratuit Netlify fonctionne maintenant par "crédits" (15 crédits par mise en ligne, 300 offerts/mois = 20 mises à jour max). Cloudflare Pages est gratuit avec 500 mises en ligne/mois et une bande passante illimitée — beaucoup plus confortable pour un usage actif. La contrepartie : la connexion au mode éditeur se fait maintenant avec ton compte GitHub (bouton "Login with GitHub") au lieu d'un mot de passe Netlify séparé — c'est même plus simple et tout aussi sécurisé, puisque seul un compte ayant les droits sur ton dépôt peut réellement enregistrer des modifications.

Tout le code nécessaire est déjà prêt dans le projet (dossier `functions/`, `/admin` mis à jour). Il reste 4 étapes, toutes dans le navigateur, aucune ligne de commande.

## Étape 1 — Créer le compte Cloudflare et connecter le site

1. Va sur **dash.cloudflare.com** et crée un compte gratuit (ou connecte-toi).
2. Dans le menu, choisis **Workers & Pages** → **Create** → onglet **Pages** → **Connect to Git**.
3. Autorise l'accès à GitHub si demandé, puis sélectionne ton dépôt **site-moto**.
4. Réglages de build :
   - Build command : `npm run build`
   - Build output directory : `_site`
5. Clique **Save and Deploy**. Attends la fin du premier déploiement.
6. Ton site est en ligne à une adresse du type `site-moto-xxx.pages.dev`. Note cette adresse, tu en auras besoin à l'étape 3.

## Étape 2 — Créer l'application OAuth GitHub

1. Va sur **github.com/settings/developers** → onglet **OAuth Apps** → **New OAuth App**.
2. Remplis :
   - Application name : `Site Moto CMS` (ou ce que tu veux)
   - Homepage URL : l'adresse notée à l'étape 1 (ex: `https://site-moto-xxx.pages.dev`)
   - Authorization callback URL : la même adresse + `/api/callback` (ex: `https://site-moto-xxx.pages.dev/api/callback`) — **c'est le champ le plus important, il doit être exact**.
3. Clique **Register application**.
4. Note le **Client ID** affiché, puis clique **Generate a new client secret** et note le **Client Secret** (il ne sera affiché qu'une fois).

## Étape 3 — Ajouter les identifiants dans Cloudflare

1. Retourne sur ton projet dans Cloudflare Pages → **Settings** → **Environment variables**.
2. Ajoute deux variables :
   - `GITHUB_CLIENT_ID` = le Client ID noté à l'étape 2
   - `GITHUB_CLIENT_SECRET` = le Client Secret noté à l'étape 2 (coche "Encrypt" si l'option est proposée)
3. Sauvegarde, puis relance un déploiement (onglet **Deployments** → **Retry deployment**) pour que les variables soient prises en compte.

## Étape 4 — Me donner les infos pour finaliser la config

Dis-moi simplement :
1. Le nom exact de ton dépôt GitHub (ex: `pablo7402/site-moto`)
2. L'adresse `.pages.dev` de ton site (ou ton nom de domaine si tu en configures un plus tard)

Je mettrai à jour `src/admin/config.yml` avec ces deux informations (actuellement des valeurs à remplacer : `TON-COMPTE-GITHUB/site-moto` et `https://TON-SITE.pages.dev`). Tu n'auras plus qu'à faire **Commit to main** puis **Push origin** dans GitHub Desktop.

## Ensuite

- Va sur `https://TON-SITE.pages.dev/admin/`, clique **Login with GitHub**, autorise l'application. Tu arrives directement dans le mode éditeur.
- Chaque modification publiée depuis l'éditeur crée un nouveau déploiement Cloudflare (gratuit jusqu'à 500/mois), sans notion de "crédits".
- Netlify peut être laissé de côté (ou supprimé plus tard depuis ton compte Netlify, pas obligatoire).
