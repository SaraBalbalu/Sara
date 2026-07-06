import { useI18n, formatDate } from "../i18n.jsx";

function PlayIcon() {
  return (
    <span className="play-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
  );
}

export default function Videos({ youtube }) {
  const { t, lang } = useI18n();
  if (!youtube) return null;
  const { videos = [], shorts = [], channel } = youtube;

  return (
    <section id="videos" className="section">
      <h2 className="section-title">{t("videos.title")}</h2>
      <p className="section-subtitle">{t("videos.subtitle")}</p>

      <div className="video-grid">
        {videos.map((v) => (
          <a
            key={v.id}
            className="video-card"
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="video-thumb">
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
              <PlayIcon />
            </div>
            <div className="video-meta">
              <h3>{v.title}</h3>
              <time dateTime={v.published}>{formatDate(v.published, lang)}</time>
            </div>
          </a>
        ))}
      </div>

      {shorts.length > 0 && (
        <>
          <h3 className="shorts-title">⚡ {t("shorts.title")}</h3>
          <div className="shorts-row">
            {shorts.map((s) => (
              <a
                key={s.id}
                className="short-card"
                href={`https://www.youtube.com/shorts/${s.id}`}
                target="_blank"
                rel="noreferrer"
                title={s.title}
              >
                <img src={`https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="short-label">{s.title}</span>
                <PlayIcon />
              </a>
            ))}
          </div>
        </>
      )}

      <div className="section-cta">
        <a className="btn btn-ghost" href={channel?.url} target="_blank" rel="noreferrer">
          {t("videos.all")} →
        </a>
      </div>
    </section>
  );
}
