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
    "genshin.clickHint": "Toca un personatge per veure les seves estadístiques",
    "stats.hp": "PV",
    "stats.atk": "ATQ",
    "stats.def": "DEF",
    "stats.em": "Mestria elemental",
    "stats.critRate": "Prob. CRIT",
    "stats.critDmg": "Dany CRIT",
    "stats.er": "Recàrrega d'energia",
    "stats.elemBonus": "Bonus de dany elemental",
    "modal.constellations": "Constel·lació",
    "modal.friendship": "Amistat",
    "modal.weapon": "Arma",
    "modal.noDetails": "El joc encara no comparteix les estadístiques detallades ✦",
    "modal.close": "Tancar",
    "about.galleryAlt": "Un dels gats de la Sara",
    "support.title": "Dóna'm suport",
    "support.subtitle": "Cada cafè ajuda a millorar els vídeos ✦",
    "support.text":
      "Els vídeos els faig amb molta il·lusió i amb el material que tinc. Si t'agrada el que faig i vols donar-hi un cop de mà, pots convidar-me a un cafè: em servirà per millorar l'equip i oferir-te vídeos encara millors.",
    "support.gear.mic": "Un micròfon millor",
    "support.gear.cam": "Una webcam millor",
    "support.gear.light": "Millor il·luminació",
    "support.cta": "Convida'm a un cafè",
    "support.note": "Totalment opcional — mirar i compartir els vídeos ja m'ajuda moltíssim 💜",
    "footer.support": "Suport",
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
    "genshin.clickHint": "Toca un personaje para ver sus estadísticas",
    "stats.hp": "Vida",
    "stats.atk": "ATQ",
    "stats.def": "DEF",
    "stats.em": "Maestría Elemental",
    "stats.critRate": "Prob. CRIT",
    "stats.critDmg": "Daño CRIT",
    "stats.er": "Recarga de energía",
    "stats.elemBonus": "Bono de daño elemental",
    "modal.constellations": "Constelación",
    "modal.friendship": "Amistad",
    "modal.weapon": "Arma",
    "modal.noDetails": "El juego aún no comparte las estadísticas detalladas ✦",
    "modal.close": "Cerrar",
    "about.galleryAlt": "Uno de los gatos de Sara",
    "support.title": "Apóyame",
    "support.subtitle": "Cada café ayuda a mejorar los vídeos ✦",
    "support.text":
      "Hago los vídeos con mucha ilusión y con el material que tengo. Si te gusta lo que hago y quieres echar una mano, puedes invitarme a un café: lo usaré para mejorar el equipo y ofrecerte vídeos aún mejores.",
    "support.gear.mic": "Un micrófono mejor",
    "support.gear.cam": "Una webcam mejor",
    "support.gear.light": "Mejor iluminación",
    "support.cta": "Invítame a un café",
    "support.note": "Totalmente opcional — ver y compartir los vídeos ya me ayuda muchísimo 💜",
    "footer.support": "Apoyo",
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
    "genshin.clickHint": "Tap a character to see their stats",
    "stats.hp": "HP",
    "stats.atk": "ATK",
    "stats.def": "DEF",
    "stats.em": "Elemental Mastery",
    "stats.critRate": "CRIT Rate",
    "stats.critDmg": "CRIT DMG",
    "stats.er": "Energy Recharge",
    "stats.elemBonus": "Elemental DMG Bonus",
    "modal.constellations": "Constellation",
    "modal.friendship": "Friendship",
    "modal.weapon": "Weapon",
    "modal.noDetails": "The game doesn't share detailed stats yet ✦",
    "modal.close": "Close",
    "about.galleryAlt": "One of Sara's cats",
    "support.title": "Support me",
    "support.subtitle": "Every coffee helps make better videos ✦",
    "support.text":
      "I make my videos with a lot of love and the gear I have. If you enjoy what I do and want to help out, you can buy me a coffee — it goes towards better equipment and even better videos for you.",
    "support.gear.mic": "A better microphone",
    "support.gear.cam": "A better webcam",
    "support.gear.light": "Better lighting",
    "support.cta": "Buy me a coffee",
    "support.note": "Completely optional — watching and sharing already helps me so much 💜",
    "footer.support": "Support",
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
    "genshin.clickHint": "Clique sur un personnage pour voir ses stats",
    "stats.hp": "PV",
    "stats.atk": "ATQ",
    "stats.def": "DÉF",
    "stats.em": "Maîtrise élémentaire",
    "stats.critRate": "Taux CRIT",
    "stats.critDmg": "DGT CRIT",
    "stats.er": "Recharge d'énergie",
    "stats.elemBonus": "Bonus de DGT élémentaire",
    "modal.constellations": "Constellation",
    "modal.friendship": "Amitié",
    "modal.weapon": "Arme",
    "modal.noDetails": "Le jeu ne partage pas encore les stats détaillées ✦",
    "modal.close": "Fermer",
    "about.galleryAlt": "Un des chats de Sara",
    "support.title": "Soutiens-moi",
    "support.subtitle": "Chaque café aide à faire de meilleures vidéos ✦",
    "support.text":
      "Je fais mes vidéos avec beaucoup d'amour et le matériel que j'ai. Si tu aimes ce que je fais et que tu veux donner un coup de pouce, tu peux m'offrir un café : ça servira à améliorer l'équipement et à te proposer des vidéos encore meilleures.",
    "support.gear.mic": "Un meilleur micro",
    "support.gear.cam": "Une meilleure webcam",
    "support.gear.light": "Un meilleur éclairage",
    "support.cta": "Offre-moi un café",
    "support.note": "Totalement optionnel — regarder et partager m'aide déjà énormément 💜",
    "footer.support": "Soutien",
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
