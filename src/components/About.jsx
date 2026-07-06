import { useState } from "react";
import { useI18n } from "../i18n.jsx";

// Petit chat assis sur le bord de la carte, queue animée en CSS.
// Cliquer dessus le fait miauler.
function Cat({ onMeow, meowing, meow }) {
  return (
    <button className="cat" onClick={onMeow} aria-label={meow}>
      {meowing && <span className="cat-bubble">{meow}</span>}
      <svg viewBox="0 0 120 90" width="96" height="72" aria-hidden="true">
        <g fill="var(--cat-color, #4d3d8f)">
          {/* queue (animée) */}
          <path
            className="cat-tail"
            d="M96 78 Q118 70 112 46 Q110 40 104 42 Q100 44 102 50 Q105 64 90 70 Z"
          />
          {/* corps */}
          <ellipse cx="72" cy="70" rx="28" ry="19" />
          {/* tête */}
          <circle cx="38" cy="52" r="20" />
          {/* oreilles */}
          <path d="M24 40 L20 20 L36 32 Z" />
          <path d="M52 40 L56 20 L40 32 Z" />
        </g>
        {/* yeux */}
        <g fill="#e8c76e">
          <ellipse cx="31" cy="50" rx="3" ry="4.5" />
          <ellipse cx="45" cy="50" rx="3" ry="4.5" />
        </g>
      </svg>
    </button>
  );
}

const CAT_PHOTOS = [
  { file: "cat-01-stretch", tilt: -4 },
  { file: "cat-02-nap", tilt: 2.5 },
  { file: "cat-03-pose", tilt: -2 },
  { file: "cat-04-chill", tilt: 3.5 },
  { file: "cat-05-portrait", tilt: -3 },
  { file: "cat-06-roll", tilt: 2 },
];

export default function About() {
  const { t } = useI18n();
  const [meowing, setMeowing] = useState(false);

  const meow = () => {
    setMeowing(true);
    setTimeout(() => setMeowing(false), 1400);
  };

  return (
    <section id="about" className="section">
      <div className="about-card">
        <Cat onMeow={meow} meowing={meowing} meow={t("cat.meow")} />
        <h2 className="section-title">{t("about.title")}</h2>
        <p className="about-text">{t("about.text")}</p>

        <div className="cat-gallery">
          {CAT_PHOTOS.map(({ file, tilt }) => (
            <figure className="polaroid" style={{ "--tilt": `${tilt}deg` }} key={file}>
              <img
                src={`${import.meta.env.BASE_URL}cats/${file}.webp`}
                alt={t("about.galleryAlt")}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <p className="about-cats">
          <span aria-hidden="true">🐾</span> {t("about.cats")}{" "}
          <span aria-hidden="true">🐾</span>
        </p>
      </div>
    </section>
  );
}
