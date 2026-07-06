import { LANGS, useI18n } from "../i18n.jsx";

export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <nav className="lang-switcher" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          className={l === lang ? "active" : ""}
          onClick={() => setLang(l)}
          aria-pressed={l === lang}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
