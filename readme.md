# ✦ Site de Sara

Site vitrine de Sara — [YouTube @LadySara01](https://www.youtube.com/@LadySara01) · [TikTok @balbalusara](https://www.tiktok.com/@balbalusara) — hébergé sur GitHub Pages :
**<https://sarabalbalu.github.io/Sara/>**

Thème « Fontaine nocturne » inspiré de Genshin Impact (violet, bleu Hydro, or), disponible en **català · español · English · français** (auto-détection de la langue du navigateur).

## Contenu

- **Hero** — avatar Furina (photo de profil en jeu), liens YouTube et TikTok
- **Dernières vidéos & Shorts** — récupérés automatiquement du flux RSS de la chaîne
- **TikTok** — embed officiel du profil créateur
- **Mon coin Genshin** — stats et vitrine de personnages du compte de Sara via [Enka.Network](https://enka.network), stats détaillées au clic sur un personnage
- **À propos** — galerie photo des chats, et un chat qui miaule si on le caresse 🐾

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev), aucune bibliothèque UI (CSS sur mesure dans `src/styles.css`)
- Traductions : `src/i18n.jsx`
- Données : `scripts/fetch-data.mjs` écrit `public/data/{genshin,youtube}.json`
  - Genshin : API Enka.Network (+ [gi.yatta.moe](https://gi.yatta.moe) pour les personnages trop récents)
  - YouTube : flux RSS de la chaîne, détection vidéo/Short sans clé API

## Automatisation (GitHub Actions)

| Workflow | Rôle | Déclencheur |
| --- | --- | --- |
| `deploy.yml` | Build Vite + déploiement GitHub Pages | push sur `main`, manuel |
| `update-data.yml` | Rafraîchit `public/data/`, commit puis redéploie | 2× par jour, manuel |

## Mise en route

1. Pousser le repo sur GitHub
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**
3. C'est tout — chaque push sur `main` redéploie le site, et les données se mettent à jour toutes seules

## Développement local

```bash
npm install
npm run fetch-data   # régénère public/data/*.json
npm run dev          # serveur de dev
npm run build        # build de production dans dist/
```

## Personnalisation rapide

- **Textes / traductions** : `src/i18n.jsx`
- **Couleurs du thème** : variables CSS en tête de `src/styles.css`
- **UID Genshin / chaîne YouTube** : constantes en tête de `scripts/fetch-data.mjs`
- **Nom du repo** : si le repo est renommé, adapter `base` dans `vite.config.js`

---

Site de fans, sans affiliation avec HoYoverse. Fait avec 💜 pour Sara.
