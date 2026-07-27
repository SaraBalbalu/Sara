import { useI18n } from "../i18n.jsx";
import { kofiUrl } from "../config.js";

const KofiCup = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 6h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6z" strokeLinejoin="round" />
    <path d="M17 8h1.6a2.9 2.9 0 0 1 0 5.8H17" strokeLinejoin="round" />
    <path d="M8 2.6c-.5.7-.5 1.3 0 2M11.5 2.6c-.5.7-.5 1.3 0 2" strokeLinecap="round" />
  </svg>
);

// Objectif matériel, dans l'ordre de priorité : la webcam d'abord
const GEAR = [
  {
    key: "cam",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="2.5" y="6" width="14" height="12" rx="3" />
        <path d="M16.5 11l5-3v8l-5-3z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "mic",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="9" y="2.5" width="6" height="11" rx="3" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "light",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M9 17.5h6M10 21h4" strokeLinecap="round" />
        <path d="M12 2.5a6.5 6.5 0 0 0-3.6 11.9V17h7.2v-2.6A6.5 6.5 0 0 0 12 2.5z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Support() {
  const { t } = useI18n();
  const url = kofiUrl();
  // pas de compte Ko-fi renseigné : on n'affiche rien plutôt qu'un lien mort
  if (!url) return null;

  return (
    <section id="support" className="section">
      <h2 className="section-title">{t("support.title")}</h2>
      <p className="section-subtitle">{t("support.subtitle")}</p>

      <div className="support-card">
        <p className="support-text">{t("support.text")}</p>

        <ul className="gear-list">
          {GEAR.map(({ key, icon }) => (
            <li className="gear-item" key={key}>
              <span className="gear-icon">{icon}</span>
              <span>{t(`support.gear.${key}`)}</span>
            </li>
          ))}
        </ul>

        <div className="section-cta">
          <a className="btn btn-kofi" href={url} target="_blank" rel="noreferrer">
            <KofiCup />
            <span>
              {t("support.cta")} <small>Ko-fi</small>
            </span>
          </a>
        </div>

        <p className="support-note">{t("support.note")}</p>
      </div>
    </section>
  );
}
