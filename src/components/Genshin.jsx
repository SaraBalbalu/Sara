import { useState } from "react";
import { useI18n, formatDate } from "../i18n.jsx";
import CharModal from "./CharModal.jsx";

export default function Genshin({ genshin }) {
  const { t, lang, gameLang } = useI18n();
  const [selected, setSelected] = useState(null);
  if (!genshin) return null;
  const { player, characters = [], updatedAt } = genshin;

  const stats = [
    { label: t("genshin.ar"), value: player.level, sub: `${t("genshin.world")} ${player.worldLevel}` },
    { label: t("genshin.achievements"), value: player.achievements, sub: "🏆" },
    {
      label: t("genshin.abyss"),
      value: `${player.towerFloor}-${player.towerLevel}`,
      sub: player.towerStars ? `${player.towerStars} ★` : "",
    },
    {
      label: t("genshin.theater"),
      value: `${t("genshin.act")} ${player.theaterAct}`,
      sub: player.theaterStars ? `${player.theaterStars} ★` : "",
    },
  ];

  return (
    <section id="genshin" className="section">
      <h2 className="section-title">{t("genshin.title")}</h2>
      <p className="section-subtitle">{t("genshin.subtitle")}</p>
      {player.signature && <p className="genshin-signature">« {player.signature} »</p>}

      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-tile" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
            {s.sub && <span className="stat-sub">{s.sub}</span>}
          </div>
        ))}
      </div>

      <p className="genshin-hint">{t("genshin.clickHint")}</p>

      <div className="char-grid">
        {characters.map((c) => (
          <button
            type="button"
            className={`char-card element-${c.element ?? "none"}`}
            key={c.id}
            onClick={() => setSelected(c)}
          >
            <div className="char-icon-wrap">
              <div className="char-icon">
                {c.icon ? (
                  <img
                    src={`https://enka.network/ui/${c.icon}.png`}
                    alt={c.name?.[gameLang] ?? ""}
                    loading="lazy"
                  />
                ) : (
                  <span aria-hidden="true">✦</span>
                )}
              </div>
              <span className="char-badge" aria-hidden="true" />
            </div>
            <span className="char-name">{c.name?.[gameLang] ?? "???"}</span>
            <span className="char-level">
              {t("genshin.level")} {c.level}
            </span>
          </button>
        ))}
      </div>

      <p className="genshin-updated">
        {t("genshin.updated")} {formatDate(updatedAt, lang)} ·{" "}
        <a href="https://enka.network" target="_blank" rel="noreferrer">
          Enka.Network
        </a>
      </p>

      {selected && <CharModal char={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
