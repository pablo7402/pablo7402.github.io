# Guide de mise en ligne — site-moto

Aucune ligne de commande. Environ 20 minutes, à faire une seule fois. Après ça, tu ne retourneras quasiment plus jamais dans GitHub : toutes les modifications futures se feront directement sur le site, dans le mode éditeur (`/admin`).

Le dossier du site se trouve ici : `LeCarnetDePablo/site-moto`.

## Étape 1 — Installer GitHub Desktop

1. Va sur **desktop.github.com** et installe l'application (Mac ou Windows).
2. Ouvre-la et connecte-toi avec ton compte GitHub existant.

## Étape 2 — Envoyer le dossier sur GitHub

1. Dans GitHub Desktop : **File > Add local repository**.
2. Choisis le dossier `site-moto`.
3. GitHub Desktop va dire que ce n'est pas encore un dépôt Git → clique sur **"create a repository"**.
4. Nom du dépôt : `site-moto` (ou ce que tu veux). Laisse le reste par défaut → **Create Repository**.
5. En bas à gauche, écris un résumé genre "Site initial" → clique **Commit to main**.
6. En haut, clique **Publish repository**.
   - Décoche "Keep this code private" seulement si tu veux qu'il soit public. Pour un site perso, **laisse-le en privé** (Netlify fonctionne très bien avec un dépôt privé).
7. Clique **Publish Repository**. C'est fait : ton site est maintenant sur GitHub, tu n'as rien eu à taper.

## Étape 3 — Connecter le site à Netlify

1. Va sur **netlify.com** et connecte-toi (ou crée un compte gratuit avec ton GitHub).
2. **Add new site > Import an existing project**.
3. Choisis **GitHub**, autorise l'accès si demandé, puis sélectionne le dépôt `site-moto`.
4. Netlify détecte automatiquement les réglages (grâce au fichier `netlify.toml` déjà inclus) :
   - Build command : `npm run build`
   - Publish directory : `_site`
5. Clique **Deploy site**. Attends 1 à 2 minutes que le premier déploiement se termine.
6. Ton site est en ligne à une adresse du type `nom-au-hasard.netlify.app`. Tu peux la personnaliser dans **Site configuration > General > Site details > Change site name**.

## Étape 4 — Activer le mode éditeur (Identity + Git Gateway)

C'est ce qui protège l'accès à `/admin` — sans ça, personne ne peut se connecter.

1. Dans le tableau de bord Netlify de ton site : **Site configuration > Identity**.
2. Clique **Enable Identity**.
3. Descends à **Registration preferences** → choisis **Invite only** (important : personne ne peut créer de compte tout seul, seulement toi).
4. Toujours dans Identity, section **Services > Git Gateway** → clique **Enable Git Gateway**.
5. Remonte en haut de la page Identity → onglet **Invite users** → entre ton adresse e-mail (`giroux.pierre@icloud.com`) → **Send**.
6. Va dans ta boîte mail, ouvre l'invitation Netlify, clique le lien, et choisis un mot de passe.

## Étape 5 — Se connecter au mode éditeur

1. Va sur `https://TON-SITE.netlify.app/admin`.
2. Connecte-toi avec l'e-mail et le mot de passe créés à l'étape précédente.
3. Tu arrives sur l'interface d'édition : trois sections — **Voyages**, **Liste de souhaits**, **Réglages du site**.

## Utilisation au quotidien

- **Ajouter un voyage** : /admin → Voyages → "New Voyage" → remplis titre, région, date, résumé, glisse ta photo → **Publish**. Le site se met à jour tout seul en 1-2 minutes (Netlify reconstruit automatiquement).
- **Ajouter un souhait** : /admin → Liste de souhaits → "New Souhait" → choisis une catégorie (équipement / destination TET / modification) → **Publish**.
- **Changer la photo d'accueil ou l'accroche** : /admin → Réglages du site → Page d'accueil.
- **Supprimer les exemples** : les trois entrées commençant par "EXEMPLE —" sont là uniquement pour te montrer le format. Ouvre-les dans /admin et clique **Delete entry**.
- Toutes tes photos peuvent être glissées-déposées directement dans le champ image du CMS — pas besoin de GitHub.

## Sécurité — ce qui est en place

- `/admin` est protégé par un vrai login (Netlify Identity), pas un mot de passe codé en dur.
- Seule l'adresse e-mail que tu invites explicitement peut créer un compte (registration = Invite only).
- Aucune clé ou jeton GitHub n'est exposé dans le site : Git Gateway s'en charge côté serveur.
- Le reste du site (Accueil, Voyages, Wishlist) reste public en lecture, comme un site normal — seule l'édition est protégée.

## Si quelque chose ne marche pas

- Le site ne se met pas à jour après une modification → va dans Netlify > **Deploys**, vérifie qu'un nouveau build est bien en cours ou terminé sans erreur.
- Impossible de se connecter à `/admin` → vérifie que Identity ET Git Gateway sont bien activés (étape 4), et que tu as bien cliqué le lien reçu par e-mail.
