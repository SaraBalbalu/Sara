import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n } from "../i18n.jsx";

const NAMES = { ca: "Català", es: "Español", en: "English", fr: "Français" };

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.7 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.7-3.7-9S9.5 5.6 12 3z" />
  </svg>
);

export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-current"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon />
        <span>{NAMES[lang]}</span>
        <svg
          className={`lang-chevron${open ? " open" : ""}`}
          viewBox="0 0 24 24" width="13" height="13"
          fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Language">
          {LANGS.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === lang}
                className={l === lang ? "active" : ""}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
              >
                <span>{NAMES[l]}</span>
                {l === lang && <span className="lang-check" aria-hidden="true">✦</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
