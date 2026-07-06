import { createContext, useContext, useEffect, useState } from "react";

export const LANGS = ["ca", "es", "en", "fr"];

const STRINGS = {
  ca: {
    "hero.hello": "Hola, viatgera ✦ Hola, viatger",
    "hero.subtitle": "Creadora de contingut en català i castellà",
    "hero.tags": "Genshin Impact · vídeos · gats",
    "hero.scroll": "Descobreix més",
    "videos.title": "Darrers vídeos",
    "videos.subtitle": "Directament del meu canal de YouTube",
    "videos.all": "Veure tot el canal",
    "shorts.title": "Shorts",
    "tiktok.title": "A TikTok",
    "tiktok.subtitle": "Els meus últims TikToks, cada setmana",
    "tiktok.follow": "Segueix-me a TikTok",
    "genshin.title": "El meu racó de Genshin",
    "genshin.subtitle": "La meva vitrina del joc, actualitzada automàticament",
    "genshin.ar": "Nivell d'aventura",
    "genshin.world": "Nivell de món",
    "genshin.achievements": "Èxits",
    "genshin.abyss": "Abisme espiral",
    "genshin.theater": "Teatre Imaginari",
    "genshin.act": "Acte",
    "genshin.level": "Nv.",
    "genshin.updated": "Actualitzat automàticament el",
    "about.title": "Sobre mi",
    "about.text":
      "Hola! Sóc la Sara. Comparteixo les meves aventures al Genshin Impact i molts altres moments en vídeo, en català i en castellà. La Furina, en Cyno i en Tighnari són els meus personatges preferits — i a casa, qui mana de veritat són els meus gats. Subscriu-te per no perdre't res!",
    "about.cats": "Amb la supervisió oficial dels meus gats",
    "footer.disclaimer":
      "Web de fans, sense afiliació amb HoYoverse. Genshin Impact i els seus recursos pertanyen a HoYoverse.",
    "footer.made": "Fet amb 💜 per a la Sara",
    "cat.meow": "miau~",
  },
  es: {
    "hero.hello": "¡Hola, viajera ✦ hola, viajero!",
    "hero.subtitle": "Creadora de contenido en catalán y español",
    "hero.tags": "Genshin Impact · vídeos · gatos",
    "hero.scroll": "Descubre más",
    "videos.title": "Últimos vídeos",
    "videos.subtitle": "Directos desde mi canal de YouTube",
    "videos.all": "Ver todo el canal",
    "shorts.title": "Shorts",
    "tiktok.title": "En TikTok",
    "tiktok.subtitle": "Mis últimos TikToks, cada semana",
    "tiktok.follow": "Sígueme en TikTok",
    "genshin.title": "Mi rincón de Genshin",
    "genshin.subtitle": "Mi vitrina del juego, actualizada automáticamente",
    "genshin.ar": "Nivel de aventura",
    "genshin.world": "Nivel de mundo",
    "genshin.achievements": "Logros",
    "genshin.abyss": "Abismo de la espiral",
    "genshin.theater": "Teatro Imaginario",
    "genshin.act": "Acto",
    "genshin.level": "Nv.",
    "genshin.updated": "Actualizado automáticamente el",
    "about.title": "Sobre mí",
    "about.text":
      "¡Hola! Soy Sara. Comparto mis aventuras en Genshin Impact y muchos otros momentos en vídeo, en catalán y en español. Furina, Cyno y Tighnari son mis personajes favoritos — y en casa, quienes mandan de verdad son mis gatos. ¡Suscríbete para no perderte nada!",
    "about.cats": "Con la supervisión oficial de mis gatos",
    "footer.disclaimer":
      "Web de fans, sin afiliación con HoYoverse. Genshin Impact y sus recursos pertenecen a HoYoverse.",
    "footer.made": "Hecho con 💜 para Sara",
    "cat.meow": "miau~",
  },
  en: {
    "hero.hello": "Hello, traveler ✦",
    "hero.subtitle": "Content creator in Catalan & Spanish",
    "hero.tags": "Genshin Impact · videos · cats",
    "hero.scroll": "Discover more",
    "videos.title": "Latest videos",
    "videos.subtitle": "Straight from my YouTube channel",
    "videos.all": "Visit the channel",
    "shorts.title": "Shorts",
    "tiktok.title": "On TikTok",
    "tiktok.subtitle": "My latest TikToks, every week",
    "tiktok.follow": "Follow me on TikTok",
    "genshin.title": "My Genshin corner",
    "genshin.subtitle": "My in-game showcase, updated automatically",
    "genshin.ar": "Adventure Rank",
    "genshin.world": "World Level",
    "genshin.achievements": "Achievements",
    "genshin.abyss": "Spiral Abyss",
    "genshin.theater": "Imaginarium Theater",
    "genshin.act": "Act",
    "genshin.level": "Lv.",
    "genshin.updated": "Automatically updated on",
    "about.title": "About me",
    "about.text":
      "Hi! I'm Sara. I share my adventures in Genshin Impact and lots of other moments on video, in Catalan and Spanish. Furina, Cyno and Tighnari are my favorite characters — and at home, my cats are the ones truly in charge. Subscribe so you don't miss a thing!",
    "about.cats": "Under the official supervision of my cats",
    "footer.disclaimer":
      "Fan-made website, not affiliated with HoYoverse. Genshin Impact and its assets belong to HoYoverse.",
    "footer.made": "Made with 💜 for Sara",
    "cat.meow": "meow~",
  },
  fr: {
    "hero.hello": "Salut, voyageuse ✦ salut, voyageur !",
    "hero.subtitle": "Créatrice de contenu en catalan et en espagnol",
    "hero.tags": "Genshin Impact · vidéos · chats",
    "hero.scroll": "Découvre la suite",
    "videos.title": "Dernières vidéos",
    "videos.subtitle": "Tout droit depuis ma chaîne YouTube",
    "videos.all": "Voir toute la chaîne",
    "shorts.title": "Shorts",
    "tiktok.title": "Sur TikTok",
    "tiktok.subtitle": "Mes derniers TikToks, chaque semaine",
    "tiktok.follow": "Suis-moi sur TikTok",
    "genshin.title": "Mon coin Genshin",
    "genshin.subtitle": "Ma vitrine en jeu, mise à jour automatiquement",
    "genshin.ar": "Niveau d'aventure",
    "genshin.world": "Niveau de monde",
    "genshin.achievements": "Succès",
    "genshin.abyss": "Abîme de la spirale",
    "genshin.theater": "Théâtre Imaginaire",
    "genshin.act": "Acte",
    "genshin.level": "Niv.",
    "genshin.updated": "Mis à jour automatiquement le",
    "about.title": "À propos",
    "about.text":
      "Salut ! Moi c'est Sara. Je partage mes aventures sur Genshin Impact et plein d'autres moments en vidéo, en catalan et en espagnol. Furina, Cyno et Tighnari sont mes personnages préférés — et à la maison, ce sont mes chats qui commandent vraiment. Abonne-toi pour ne rien rater !",
    "about.cats": "Sous la supervision officielle de mes chats",
    "footer.disclaimer":
      "Site de fans, sans affiliation avec HoYoverse. Genshin Impact et ses ressources appartiennent à HoYoverse.",
    "footer.made": "Fait avec 💜 pour Sara",
    "cat.meow": "miaou~",
  },
};

function detectLang() {
  const saved = localStorage.getItem("sara.lang");
  if (LANGS.includes(saved)) return saved;
  for (const l of navigator.languages ?? [navigator.language]) {
    const code = l?.slice(0, 2).toLowerCase();
    if (LANGS.includes(code)) return code;
  }
  return "en";
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  useEffect(() => {
    localStorage.setItem("sara.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  // pour les noms de personnages Genshin : le jeu n'existe pas en catalan,
  // on retombe sur l'espagnol
  const gameLang = lang === "ca" ? "es" : lang;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, gameLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function formatDate(iso, lang) {
  if (!iso) return "";
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
