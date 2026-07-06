import { useEffect } from "react";
import { useI18n } from "../i18n.jsx";

const YT_URL = "https://www.youtube.com/@LadySara01";
const TT_URL = "https://www.tiktok.com/@balbalusara";

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M19.6 5.8a4.8 4.8 0 0 1-3.4-3.5c-.06-.3-.1-.6-.1-.9h-3.7v14.9a2.8 2.8 0 1 1-2-2.7V9.8a6.5 6.5 0 1 0 5.7 6.4V8.6a8.4 8.4 0 0 0 4.9 1.6V6.5c-.5 0-1-.06-1.4-.2z" />
  </svg>
);

export default function Hero({ genshin }) {
  const { t } = useI18n();
  const pfp = genshin?.player?.profilePicture;

  // depuis le hero, un léger coup de molette vers le bas emmène
  // directement à la section vidéos
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animating = false;
    const onWheel = (e) => {
      if (e.deltaY <= 8) return; // uniquement vers le bas
      if (window.scrollY > window.innerHeight * 0.35) return; // uniquement depuis le hero
      e.preventDefault();
      if (animating) return;
      const target = document.getElementById("videos");
      if (!target) return;
      animating = true;
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        animating = false;
      }, 900);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <header className="hero">
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-avatar">
          {pfp ? (
            <img src={`https://enka.network/ui/${pfp}.png`} alt="Sara" width="160" height="160" />
          ) : (
            <span className="hero-avatar-fallback" aria-hidden="true">✦</span>
          )}
        </div>
        <p className="hero-hello">✦ {t("hero.hello")} ✦</p>
        <h1 className="hero-title">Sara</h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <p className="hero-tags">{t("hero.tags")}</p>
        <div className="hero-buttons">
          <a className="btn btn-youtube" href={YT_URL} target="_blank" rel="noreferrer">
            <YouTubeIcon />
            <span>
              YouTube <small>@LadySara01</small>
            </span>
          </a>
          <a className="btn btn-tiktok" href={TT_URL} target="_blank" rel="noreferrer">
            <TikTokIcon />
            <span>
              TikTok <small>@balbalusara</small>
            </span>
          </a>
        </div>
      </div>
      <a className="hero-scroll" href="#videos" aria-label={t("hero.scroll")}>
        <span>{t("hero.scroll")}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
