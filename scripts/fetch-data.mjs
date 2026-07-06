// Récupère les données affichées sur le site (vitrine Genshin via Enka.Network
// + dernières vidéos YouTube via le flux RSS) et les écrit dans data/*.json.
// Lancé par GitHub Actions sur planning (voir .github/workflows/update-data.yml)
// ou à la main : node scripts/fetch-data.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const UID = "701046437";
const YT_CHANNEL_ID = "UCk1RTSRukrwZ4yp9howY21A";
const YT_HANDLE = "LadySara01";
const ENKA_STORE = "https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store";
const UA = { "User-Agent": "sara-fansite/1.0 (github.com/SaraBalbalu/Sara)" };

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "public", "data");

const ELEMENTS = {
  Water: "hydro", Electric: "electro", Grass: "dendro", Fire: "pyro",
  Ice: "cryo", Wind: "anemo", Rock: "geo",
};

async function getJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

async function fetchGenshin() {
  const [enka, chars, loc, pfps] = await Promise.all([
    getJson(`https://enka.network/api/uid/${UID}?info`),
    getJson(`${ENKA_STORE}/characters.json`),
    getJson(`${ENKA_STORE}/loc.json`),
    getJson(`${ENKA_STORE}/pfps.json`),
  ]);

  const p = enka.playerInfo;
  const name = (hash) => ({
    en: loc.en?.[hash] ?? null,
    es: loc.es?.[hash] ?? null,
    fr: loc.fr?.[hash] ?? null,
  });

  const showcase = p.showAvatarInfoList ?? [];

  // Les personnages sortis très récemment manquent parfois dans le store Enka :
  // on complète avec l'API de gi.yatta.moe (Project Amber)
  let yatta = null;
  if (showcase.some((a) => !chars[String(a.avatarId)]?.SideIconName)) {
    const [en, es, fr] = await Promise.all(
      ["en", "es", "fr"].map((l) => getJson(`https://gi.yatta.moe/api/v2/${l}/avatar`)),
    );
    yatta = { en: en.data.items, es: es.data.items, fr: fr.data.items };
  }

  const characters = showcase.map((a) => {
    const id = String(a.avatarId);
    const c = chars[id];
    if (!c || !c.SideIconName) {
      const y = yatta?.en[id];
      if (!y) {
        return { id: a.avatarId, level: a.level, element: null, icon: null, rarity: 5, name: null };
      }
      return {
        id: a.avatarId,
        level: a.level,
        element: ELEMENTS[y.element] ?? null,
        icon: y.icon,
        rarity: y.rank,
        name: {
          en: y.name,
          es: yatta.es[id]?.name ?? y.name,
          fr: yatta.fr[id]?.name ?? y.name,
        },
      };
    }
    return {
      id: a.avatarId,
      level: a.level,
      element: ELEMENTS[c.Element] ?? null,
      icon: c.SideIconName.replace("_Side", ""),
      rarity: c.QualityType?.startsWith("QUALITY_ORANGE") ? 5 : 4,
      name: name(c.NameTextMapHash),
    };
  });

  return {
    updatedAt: new Date().toISOString(),
    uid: enka.uid,
    region: enka.region,
    player: {
      nickname: p.nickname,
      signature: p.signature ?? "",
      level: p.level,
      worldLevel: p.worldLevel,
      achievements: p.finishAchievementNum,
      towerFloor: p.towerFloorIndex,
      towerLevel: p.towerLevelIndex,
      towerStars: p.towerStarIndex ?? null,
      theaterAct: p.theaterActIndex ?? null,
      theaterStars: p.theaterStarIndex ?? null,
      fetterCount: p.fetterCount ?? null,
      profilePicture: pfps[String(p.profilePicture?.id)]?.iconPath ?? null,
    },
    characters,
  };
}

async function isShort(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: "HEAD", redirect: "manual",
      // le cookie SOCS évite la redirection RGPD vers consent.youtube.com (UE)
      headers: { ...UA, Cookie: "SOCS=CAI" },
    });
    return res.status === 200; // une vidéo classique redirige vers /watch
  } catch {
    return false;
  }
}

async function fetchYouTube() {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`,
    { headers: UA },
  );
  if (!res.ok) throw new Error(`YouTube RSS -> HTTP ${res.status}`);
  const xml = await res.text();

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1],
    title: decodeEntities(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""),
    published: e.match(/<published>([^<]+)<\/published>/)?.[1],
  })).filter((e) => e.id);

  const videos = [];
  const shorts = [];
  for (const entry of entries) {
    ((await isShort(entry.id)) ? shorts : videos).push(entry);
  }

  return {
    updatedAt: new Date().toISOString(),
    channel: {
      id: YT_CHANNEL_ID,
      handle: YT_HANDLE,
      url: `https://www.youtube.com/@${YT_HANDLE}`,
    },
    videos: videos.slice(0, 6),
    shorts: shorts.slice(0, 8),
  };
}

await mkdir(dataDir, { recursive: true });

const results = await Promise.allSettled([fetchGenshin(), fetchYouTube()]);
const [genshin, youtube] = results;

// En cas d'échec d'une source, on garde l'ancien fichier plutôt que de casser le site
if (genshin.status === "fulfilled") {
  await writeFile(join(dataDir, "genshin.json"), JSON.stringify(genshin.value, null, 2));
  console.log(`genshin.json : ${genshin.value.characters.length} personnages`);
} else {
  console.error("Echec Enka :", genshin.reason?.message ?? genshin.reason);
}
if (youtube.status === "fulfilled") {
  await writeFile(join(dataDir, "youtube.json"), JSON.stringify(youtube.value, null, 2));
  console.log(`youtube.json : ${youtube.value.videos.length} vidéos, ${youtube.value.shorts.length} shorts`);
} else {
  console.error("Echec YouTube :", youtube.reason?.message ?? youtube.reason);
}
if (results.every((r) => r.status === "rejected")) process.exit(1);
