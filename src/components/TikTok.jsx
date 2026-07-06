import { useEffect } from "react";
import { useI18n } from "../i18n.jsx";

const TT_URL = "https://www.tiktok.com/@balbalusara";

export default function TikTok() {
  const { t } = useI18n();

  useEffect(() => {
    // le script officiel transforme le <blockquote> en fil de TikToks du profil
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="tiktok" className="section">
      <h2 className="section-title">{t("tiktok.title")}</h2>
      <p className="section-subtitle">{t("tiktok.subtitle")}</p>

      <div className="tiktok-wrap">
        <blockquote
          className="tiktok-embed"
          cite={TT_URL}
          data-unique-id="balbalusara"
          data-embed-type="creator"
          style={{ maxWidth: "780px", minWidth: "288px" }}
        >
          <section>
            <a target="_blank" rel="noreferrer" href={`${TT_URL}?refer=creator_embed`}>
              @balbalusara
            </a>
          </section>
        </blockquote>
      </div>

      <div className="section-cta">
        <a className="btn btn-ghost" href={TT_URL} target="_blank" rel="noreferrer">
          {t("tiktok.follow")} →
        </a>
      </div>
    </section>
  );
}
