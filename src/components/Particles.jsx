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
    // étoile filante occasionnelle, comme un vœu qui traverse le ciel de Teyvat
    let shooting = null;
    let nextShootAt = performance.now() + 4000 + Math.random() * 6000;

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

      if (!shooting && now > nextShootAt) {
        const fromLeft = Math.random() < 0.5;
        shooting = {
          x: canvas.width * (fromLeft ? 0.05 + Math.random() * 0.3 : 0.65 + Math.random() * 0.3),
          y: canvas.height * (0.05 + Math.random() * 0.3),
          vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 3),
          vy: 1.6 + Math.random() * 1.4,
          life: 1,
        };
        nextShootAt = now + 7000 + Math.random() * 9000;
      }
      if (shooting) {
        const s = shooting;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
        grad.addColorStop(0, `rgba(255, 246, 214, ${0.9 * s.life})`);
        grad.addColorStop(0.4, `rgba(196, 181, 253, ${0.45 * s.life})`);
        grad.addColorStop(1, "rgba(196, 181, 253, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        if (s.life <= 0 || s.x < -60 || s.x > canvas.width + 60 || s.y > canvas.height + 60) {
          shooting = null;
        }
      }
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
