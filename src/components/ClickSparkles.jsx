import { useEffect, useState } from "react";

// Petit éclat d'étoiles à chaque clic, clin d'œil aux vœux de Genshin.
// Purement décoratif : le conteneur ne capte aucun événement.
const SPARKS_PER_BURST = 7;
let burstId = 0;

export default function ClickSparkles() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e) => {
      const id = burstId++;
      const sparks = Array.from({ length: SPARKS_PER_BURST }, (_, i) => {
        const angle = (Math.PI * 2 * i) / SPARKS_PER_BURST + Math.random() * 0.8;
        const dist = 26 + Math.random() * 34;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          size: 5 + Math.random() * 6,
          gold: Math.random() < 0.4,
        };
      });
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, sparks }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 750);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="sparkle-layer" aria-hidden="true">
      {bursts.map((b) =>
        b.sparks.map((s, i) => (
          <span
            key={`${b.id}-${i}`}
            className={`sparkle${s.gold ? " gold" : ""}`}
            style={{
              left: b.x,
              top: b.y,
              width: s.size,
              height: s.size,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
            }}
          />
        )),
      )}
    </div>
  );
}
