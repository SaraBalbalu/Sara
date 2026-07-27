import { useI18n } from "../i18n.jsx";
import { LINKS, kofiUrl } from "../config.js";

export default function Footer() {
  const { t } = useI18n();
  const kofi = kofiUrl();

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href={LINKS.youtube} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <span aria-hidden="true">✦</span>
        <a href={LINKS.tiktok} target="_blank" rel="noreferrer">
          TikTok
        </a>
        {kofi && (
          <>
            <span aria-hidden="true">✦</span>
            <a href={kofi} target="_blank" rel="noreferrer">
              Ko-fi
            </a>
          </>
        )}
      </div>
      <p className="footer-made">{t("footer.made")}</p>
      <p className="footer-disclaimer">{t("footer.disclaimer")}</p>
    </footer>
  );
}
