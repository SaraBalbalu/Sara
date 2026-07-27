// Liens et réglages modifiables sans toucher au reste du code.
export const LINKS = {
  youtube: "https://www.youtube.com/@LadySara01",
  tiktok: "https://www.tiktok.com/@balbalusara",
  // pseudo Ko-fi, depuis l'URL https://ko-fi.com/<pseudo>
  // (mettre null pour masquer la section « Soutiens-moi »)
  kofi: "balbalu",
};

export const kofiUrl = () => (LINKS.kofi ? `https://ko-fi.com/${LINKS.kofi}` : null);
