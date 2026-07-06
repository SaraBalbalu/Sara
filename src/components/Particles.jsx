import { useEffect, useRef } from "react";

// Voile de particules magiques : étoiles qui scintillent + bulles qui montent
// doucement, aux couleurs du site (violet, bleu Hydro, or)
const COLORS = ["#a78bfa", "#8b5cf6", "#c4b5fd", "#5ac8ff", "#e8c76e", "#ffffff"];

export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles = [];
    let raf = 0;

    function build() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.6 + Math.random() * 1.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        bubble: Math.random() < 0.35, // sinon : étoile qui scintille
        speed: 0.1 + Math.random() * 0.25,
        drift: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        let alpha = 0.55;
        if (p.bubble) {
          p.y -= p.speed;
          p.x += Math.sin(now / 2400 + p.drift) * 0.18;
          if (p.y < -4) {
            p.y = canvas.height + 4;
            p.x = Math.random() * canvas.width;
          }
          alpha = 0.35;
        } else {
          alpha = 0.18 + 0.5 * (0.5 + 0.5 * Math.sin(now / 900 + p.phase));
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    build();
    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas className="particles" ref={ref} aria-hidden="true" />;
}
