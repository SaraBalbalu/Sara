import { useEffect } from "react";
import { useI18n } from "../i18n.jsx";

export default function CharModal({ char, onClose }) {
  const { t, lang, gameLang } = useI18n();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const d = char.details;
  const name = char.name?.[gameLang] ?? "???";
  const num = (v) => new Intl.NumberFormat(lang).format(v);
  const rows = d
    ? [
        [t("stats.hp"), num(d.stats.hp)],
        [t("stats.atk"), num(d.stats.atk)],
        [t("stats.def"), num(d.stats.def)],
        [t("stats.em"), num(d.stats.em)],
        [t("stats.critRate"), `${d.stats.critRate}%`],
        [t("stats.critDmg"), `${d.stats.critDmg}%`],
        [t("stats.er"), `${d.stats.er}%`],
        ...(d.stats.elemBonus > 0 ? [[t("stats.elemBonus"), `${d.stats.elemBonus}%`]] : []),
      ]
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-card element-${char.element ?? "none"}`}
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label={t("modal.close")}>
          ✕
        </button>

        <header className="modal-head">
          <div className="char-icon modal-icon">
            {char.icon ? (
              <img src={`https://enka.network/ui/${char.icon}.png`} alt="" />
            ) : (
              <span aria-hidden="true">✦</span>
            )}
          </div>
          <h3 className="modal-name">{name}</h3>
          <p className="modal-stars" aria-label={`${char.rarity}★`}>
            {"★".repeat(char.rarity)}
          </p>
          <p className="modal-level">
            {t("genshin.level")} {char.level}
          </p>
        </header>

        {d ? (
          <>
            <div className="modal-badges">
              <span title={t("modal.constellations")}>C{d.constellations}</span>
              {d.friendship != null && (
                <span title={t("modal.friendship")}>
                  <span aria-hidden="true">♥</span> {d.friendship}
                </span>
              )}
            </div>

            <dl className="modal-stats">
              {rows.map(([label, value]) => (
                <div className="modal-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            {d.weapon && (
              <div className="modal-weapon">
                <div className="modal-weapon-icon">
                  <img src={`https://enka.network/ui/${d.weapon.icon}.png`} alt="" loading="lazy" />
                </div>
                <div>
                  <p className="modal-weapon-name">{d.weapon.name?.[gameLang] ?? t("modal.weapon")}</p>
                  <p className="modal-weapon-sub">
                    <span className="modal-weapon-stars">{"★".repeat(d.weapon.rarity ?? 0)}</span>{" "}
                    {t("genshin.level")} {d.weapon.level}
                    {d.weapon.refinement ? ` · R${d.weapon.refinement}` : ""}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="modal-empty">{t("modal.noDetails")}</p>
        )}
      </div>
    </div>
  );
}
