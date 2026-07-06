import { useI18n } from "../i18n.jsx";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://www.youtube.com/@LadySara01" target="_blank" rel="noreferrer">
          YouTube
        </a>
        <span aria-hidden="true">✦</span>
        <a href="https://www.tiktok.com/@balbalusara" target="_blank" rel="noreferrer">
          TikTok
        </a>
      </div>
      <p className="footer-made">{t("footer.made")}</p>
      <p className="footer-disclaimer">{t("footer.disclaimer")}</p>
    </footer>
  );
}
