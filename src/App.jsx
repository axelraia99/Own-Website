import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Check, X, Plus, Minus, ArrowDown } from "lucide-react";

/* ------------------------------------------------------------------ *
 *  AXEL RAIA — Studio de diseño · Landing premium (ES)
 *  Paleta: bg #0B0B0B · fg #FFFFFF · accent #C6FF00 · muted #8E8E8E
 * ------------------------------------------------------------------ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&family=Instrument+Serif:ital@0;1&display=swap');

:root{
  --bg:#0B0B0B;
  --bg-2:#0f0f0f;
  --fg:#FFFFFF;
  --accent:#C6FF00;
  --muted:#8E8E8E;
  --line:rgba(255,255,255,.08);
  --line-2:rgba(255,255,255,.04);
  --card:rgba(255,255,255,.025);
  --max:1180px;
  --ease:cubic-bezier(.22,.61,.36,1);
}

*{box-sizing:border-box;margin:0;padding:0}
.ax-root{
  background:var(--bg);
  color:var(--fg);
  font-family:'Archivo',-apple-system,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
  line-height:1.45;
  overflow-x:hidden;
  position:relative;
  letter-spacing:-.01em;
}
.ax-root ::selection{background:var(--accent);color:#0B0B0B}

.serif{font-family:'Instrument Serif',serif;font-style:italic;letter-spacing:0}
.accent{color:var(--accent)}
.muted{color:var(--muted)}

/* ---------- grain + glow background ---------- */
.grain{
  position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.045;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grain 8s steps(6) infinite;
}
@keyframes grain{
  0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-5%)}
  30%{transform:translate(3%,-8%)}50%{transform:translate(-4%,4%)}
  70%{transform:translate(6%,2%)}90%{transform:translate(-2%,6%)}
}
.glow{position:fixed;pointer-events:none;z-index:0;border-radius:50%;filter:blur(120px);opacity:.5}
.glow-a{top:-180px;right:-120px;width:520px;height:520px;background:radial-gradient(circle,rgba(198,255,0,.18),transparent 70%)}
.glow-b{bottom:10%;left:-160px;width:480px;height:480px;background:radial-gradient(circle,rgba(255,255,255,.05),transparent 70%)}

/* ---------- layout ---------- */
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px;position:relative;z-index:1}
section{position:relative;z-index:1}
.eyebrow{
  font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);
  display:inline-flex;align-items:center;gap:10px;
}
.eyebrow::before{content:"";width:24px;height:1px;background:var(--accent)}

/* reveal */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease),transform .9s var(--ease);transition-delay:var(--d,0s)}
.reveal.is-in{opacity:1;transform:none}

/* ---------- nav ---------- */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:50;
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 24px;backdrop-filter:blur(12px);
  background:linear-gradient(to bottom,rgba(11,11,11,.85),rgba(11,11,11,0));
  border-bottom:1px solid transparent;transition:.4s var(--ease);
}
.nav.scrolled{background:rgba(11,11,11,.82);border-bottom:1px solid var(--line)}
.brand{font-weight:800;font-size:18px;letter-spacing:-.02em;display:flex;align-items:center;gap:9px}
.brand .dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 14px var(--accent)}
.nav-links{display:none;gap:34px;align-items:center}
.nav-links a{color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;transition:.25s}
.nav-links a:hover{color:var(--fg)}
.btn{
  font-family:inherit;cursor:pointer;border:none;font-weight:600;font-size:14px;
  border-radius:100px;padding:12px 22px;transition:.3s var(--ease);display:inline-flex;
  align-items:center;gap:8px;text-decoration:none;white-space:nowrap;
}
.btn-accent{background:var(--accent);color:#0B0B0B}
.btn-accent:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(198,255,0,.25)}
.btn-ghost{background:transparent;color:var(--fg);border:1px solid var(--line)}
.btn-ghost:hover{border-color:var(--fg);background:rgba(255,255,255,.04)}
.btn svg{width:16px;height:16px}

/* ---------- hero ---------- */
.hero{padding:160px 0 90px;position:relative;text-transform:uppercase}
.hero-grid{display:grid;grid-template-columns:1fr;gap:50px;align-items:center}
.hero h1{
  font-weight:800;line-height:.96;letter-spacing:-.035em;
  font-size:clamp(44px,9vw,104px);margin:22px 0 26px;
}
.hero h1 .serif{font-weight:400;letter-spacing:-.01em}
.hero p.sub{font-size:clamp(16px,2.1vw,20px);color:var(--muted);max-width:30em;line-height:1.55}
.hero-cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:38px}
.hero-cta .btn{padding:15px 26px;font-size:15px}

/* orb */
.orb-stage{position:relative;height:340px;display:flex;align-items:center;justify-content:center}
.orb{
  width:260px;height:260px;border-radius:50%;position:relative;
  background:
    radial-gradient(circle at 32% 28%,rgba(198,255,0,.9),rgba(198,255,0,.1) 45%,transparent 60%),
    conic-gradient(from 210deg,#1a1a1a,#0b0b0b,#222,#0b0b0b);
  box-shadow:inset -30px -30px 60px rgba(0,0,0,.7),inset 14px 14px 40px rgba(255,255,255,.06),0 30px 80px rgba(0,0,0,.6),0 0 70px rgba(198,255,0,.12);
  animation:float 7s ease-in-out infinite;
}
.orb::after{
  content:"";position:absolute;inset:-22px;border-radius:50%;
  border:1px solid var(--line);animation:spin 18s linear infinite;
}
.orb::before{
  content:"";position:absolute;inset:18px;border-radius:50%;
  background:conic-gradient(from 0deg,transparent,rgba(198,255,0,.35),transparent 40%);
  mix-blend-mode:screen;animation:spin 9s linear infinite reverse;
}
.ring-out{
  position:absolute;width:340px;height:340px;border-radius:50%;
  border:1px dashed rgba(255,255,255,.1);animation:spin 40s linear infinite;
}
.orb-tag{
  position:absolute;padding:8px 14px;border-radius:100px;font-size:12px;font-weight:600;
  background:rgba(255,255,255,.04);border:1px solid var(--line);backdrop-filter:blur(8px);
}
.orb-tag.t1{top:8%;right:2%;color:var(--accent)}
.orb-tag.t2{bottom:12%;left:0%}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
@keyframes spin{to{transform:rotate(360deg)}}

.scroll-hint{
  display:inline-flex;align-items:center;gap:10px;margin-top:60px;
  font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);
}
.scroll-hint svg{width:15px;height:15px;animation:bob 1.8s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}

/* ---------- section heads ---------- */
.shead{max-width:760px;margin-bottom:54px}
.shead h2{font-weight:800;letter-spacing:-.03em;line-height:1.02;font-size:clamp(30px,5.2vw,58px);margin:18px 0 0}
.shead h2 .serif{font-weight:400}
.s-pad{padding:100px 0}
.divider{height:1px;background:var(--line);max-width:var(--max);margin:0 auto}

/* ---------- reality cards ---------- */
.reality-copy{font-size:clamp(20px,3vw,30px);font-weight:500;letter-spacing:-.02em;line-height:1.35;max-width:18em}
.reality-copy span{color:var(--muted)}
.cards-3{display:grid;grid-template-columns:1fr;gap:18px;margin-top:48px}
.rcard{
  border:1px solid var(--line);border-radius:18px;padding:30px;background:var(--card);
  transition:.4s var(--ease);position:relative;overflow:hidden;
}
.rcard:hover{border-color:rgba(198,255,0,.4);transform:translateY(-4px)}
.rcard .num{font-size:13px;font-weight:700;color:var(--accent);letter-spacing:.1em}
.rcard h3{font-size:20px;font-weight:700;margin-top:40px;letter-spacing:-.01em}

/* ---------- services ---------- */
.svc-grid{display:grid;grid-template-columns:1fr;gap:0;border-top:1px solid var(--line)}
.svc{
  padding:38px 4px;border-bottom:1px solid var(--line);
  display:grid;grid-template-columns:1fr;gap:18px;transition:.4s var(--ease);cursor:default;
}
.svc:hover{background:linear-gradient(90deg,rgba(198,255,0,.04),transparent);padding-left:18px}
.svc-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}
.svc-head h3{font-size:clamp(26px,4vw,40px);font-weight:800;letter-spacing:-.03em}
.svc-head .ix{width:46px;height:46px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;transition:.4s var(--ease)}
.svc:hover .ix{background:var(--accent);border-color:var(--accent);color:#0B0B0B;transform:rotate(45deg)}
.svc-head .ix svg{width:18px;height:18px}
.svc-tags{display:flex;flex-wrap:wrap;gap:10px}
.tag{font-size:13px;color:var(--muted);border:1px solid var(--line);border-radius:100px;padding:7px 14px;transition:.3s}
.svc:hover .tag{border-color:var(--line);color:var(--fg)}

/* ---------- comparison ---------- */
.cmp{border:1px solid var(--line);border-radius:22px;overflow:hidden;background:var(--card)}
.cmp-head{display:grid;grid-template-columns:1.4fr 1fr 1fr}
.cmp-head>div{padding:22px 20px;font-size:13px;font-weight:700;letter-spacing:.04em;border-bottom:1px solid var(--line)}
.cmp-head .c-us{background:rgba(198,255,0,.08);color:var(--accent);text-align:center}
.cmp-head .c-them{color:var(--muted);text-align:center}
.cmp-row{display:grid;grid-template-columns:1.4fr 1fr 1fr;border-bottom:1px solid var(--line-2)}
.cmp-row:last-child{border-bottom:none}
.cmp-row>div{padding:18px 20px;display:flex;align-items:center}
.cmp-row .lbl{font-size:15px;font-weight:500}
.cmp-row .mark{justify-content:center}
.cmp-row .c-us{background:rgba(198,255,0,.04)}
.ic-ok{width:30px;height:30px;border-radius:50%;background:rgba(198,255,0,.15);color:var(--accent);display:flex;align-items:center;justify-content:center}
.ic-ok svg{width:16px;height:16px}
.ic-no{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.04);color:var(--muted);display:flex;align-items:center;justify-content:center}
.ic-no svg{width:15px;height:15px}

/* ---------- work / horizontal scroll ---------- */
.work-scroll{
  display:flex;gap:22px;overflow-x:auto;padding:6px 24px 30px;margin:0 -24px;
  scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:var(--line) transparent;
}
.work-scroll::-webkit-scrollbar{height:6px}
.work-scroll::-webkit-scrollbar-thumb{background:var(--line);border-radius:10px}
.wcard{
  flex:0 0 84%;max-width:480px;scroll-snap-align:start;
  border:1px solid var(--line);border-radius:22px;overflow:hidden;background:var(--bg-2);
  transition:.4s var(--ease);
}
.wcard:hover{border-color:rgba(198,255,0,.35);transform:translateY(-5px)}
.wcard .thumb{height:240px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:24px}
.wcard .thumb h3{font-size:34px;font-weight:900;letter-spacing:-.03em;position:relative;z-index:2;mix-blend-mode:difference}
.wcard .thumb::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(11,11,11,.7),transparent)}
.wcard .body{padding:26px}
.wcard .row{display:flex;gap:14px;padding:13px 0;border-bottom:1px solid var(--line-2)}
.wcard .row:last-child{border-bottom:none}
.wcard .row .k{flex:none;width:90px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);padding-top:2px;font-weight:600}
.wcard .row .v{font-size:14px;color:#cfcfcf;line-height:1.5}
.work-hint{font-size:12px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;margin-top:10px}

/* ---------- testimonials ---------- */
.tgrid{display:grid;grid-template-columns:1fr;gap:18px}
.tcard{border:1px solid var(--line);border-radius:20px;padding:32px;background:var(--card);transition:.4s var(--ease)}
.tcard:hover{transform:translateY(-4px);border-color:rgba(198,255,0,.3)}
.tcard .quote{font-size:19px;font-weight:500;line-height:1.45;letter-spacing:-.01em}
.tcard .qmark{font-family:'Instrument Serif',serif;font-size:60px;line-height:.4;color:var(--accent);display:block;height:30px}
.tcard .who{display:flex;align-items:center;gap:13px;margin-top:26px}
.tcard .av{width:42px;height:42px;border-radius:50%;flex:none;background:linear-gradient(135deg,var(--accent),#5a7000)}
.tcard .who .n{font-size:15px;font-weight:700}
.tcard .who .c{font-size:13px;color:var(--muted)}

/* ---------- process ---------- */
.proc{display:grid;grid-template-columns:1fr;gap:0}
.pstep{
  display:grid;grid-template-columns:auto 1fr;gap:24px;padding:34px 0;border-top:1px solid var(--line);
  transition:.4s var(--ease);
}
.pstep:hover{padding-left:14px}
.pstep:last-child{border-bottom:1px solid var(--line)}
.pstep .pn{font-size:clamp(34px,6vw,64px);font-weight:900;line-height:.8;color:transparent;-webkit-text-stroke:1px var(--muted);transition:.4s}
.pstep:hover .pn{-webkit-text-stroke:1px var(--accent);color:rgba(198,255,0,.06)}
.pstep .pt{font-size:clamp(20px,3vw,28px);font-weight:800;letter-spacing:-.02em}
.pstep .pd{color:var(--muted);font-size:15px;margin-top:6px;max-width:30em}

/* ---------- faq ---------- */
.faq-item{border-bottom:1px solid var(--line)}
.faq-q{
  width:100%;background:none;border:none;color:var(--fg);font-family:inherit;cursor:pointer;
  display:flex;align-items:center;justify-content:space-between;gap:20px;
  padding:26px 0;text-align:left;font-size:clamp(17px,2.4vw,22px);font-weight:600;letter-spacing:-.01em;
}
.faq-q .qi{width:34px;height:34px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;transition:.3s}
.faq-q .qi svg{width:16px;height:16px}
.faq-q:hover .qi{border-color:var(--accent);color:var(--accent)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .45s var(--ease),opacity .4s;opacity:0}
.faq-a.open{max-height:200px;opacity:1}
.faq-a p{color:var(--muted);font-size:16px;line-height:1.6;padding-bottom:26px;max-width:46em}

/* ---------- final cta ---------- */
.final{padding:120px 0 130px;text-align:center;position:relative;overflow:hidden}
.final::before{
  content:"";position:absolute;top:50%;left:50%;width:760px;height:760px;max-width:120vw;
  transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(circle,rgba(198,255,0,.14),transparent 65%);filter:blur(40px);
}
.final h2{font-weight:800;letter-spacing:-.035em;line-height:1;font-size:clamp(38px,8vw,88px);position:relative}
.final h2 .serif{font-weight:400}
.final p{color:var(--muted);font-size:clamp(16px,2.2vw,20px);margin:24px auto 40px;max-width:28em;position:relative}
.final .btn{position:relative;padding:18px 34px;font-size:16px}

/* ---------- footer ---------- */
.footer{border-top:1px solid var(--line);padding:50px 0}
.foot-grid{display:flex;flex-direction:column;gap:24px}
.foot-grid .brand{font-size:22px}
.foot-tag{color:var(--muted);font-size:14px;max-width:24em}
.foot-bot{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;color:var(--muted);font-size:13px;margin-top:30px;padding-top:24px;border-top:1px solid var(--line-2)}

/* ---------- sticky mobile cta ---------- */
.sticky-cta{
  position:fixed;left:14px;right:14px;bottom:14px;z-index:55;
  background:var(--accent);color:#0B0B0B;border-radius:100px;
  display:flex;align-items:center;justify-content:center;gap:8px;
  padding:16px;font-weight:700;font-size:15px;text-decoration:none;
  box-shadow:0 12px 40px rgba(0,0,0,.5);
}
.sticky-cta svg{width:17px;height:17px}

/* ---------- responsive ---------- */
@media(min-width:680px){
  .cards-3{grid-template-columns:repeat(3,1fr)}
  .tgrid{grid-template-columns:repeat(3,1fr)}
  .svc{grid-template-columns:1.2fr 1fr;align-items:center}
  .wcard{flex-basis:46%}
}
@media(min-width:920px){
  .nav-links{display:flex}
  .hero{padding:190px 0 110px}
  .hero-grid{grid-template-columns:1.15fr .85fr}
  .orb-stage{height:440px}
  .orb{width:300px;height:300px}
  .ring-out{width:400px;height:400px}
  .reality-wrap{display:block}
  .sticky-cta{display:none}
  .pstep{grid-template-columns:140px 1fr;gap:40px}
  .wcard{flex-basis:30%}
  .foot-grid{flex-direction:row;justify-content:space-between;align-items:flex-start}
}
`;

const services = [
  { t: "Branding", tags: ["Sistemas de logo", "Identidad visual", "Manual de marca", "Estrategia de marca"] },
  { t: "Redes Sociales", tags: ["Sistemas de contenido", "Gráficas matchday", "Creatividades de campaña", "Plantillas"] },
  { t: "Diseño Web", tags: ["Landing pages", "Sitios corporativos", "Portfolios", "Diseño UX/UI"] },
];

const compRows = [
  "Diseño 100% a medida",
  "Comunicación directa",
  "Ejecución rápida",
  "Calidad visual premium",
  "Pensamiento estratégico",
  "Expertise en industria deportiva",
];

const work = [
  { n: "SINERGIA", g: "linear-gradient(135deg,#c6ff00,#1a3a00)", c: "Una marca corporativa sin un rumbo visual claro.", s: "Identidad modular y sistema gráfico escalable.", o: "Una percepción de marca seria y consolidada." },
  { n: "PRODENT", g: "linear-gradient(135deg,#e8e8e8,#2a2a2a)", c: "No transmitía confianza ni profesionalismo.", s: "Rebranding completo y lenguaje visual cálido.", o: "Más consultas y reconocimiento local." },
  { n: "TCE EXPERIENCE", g: "linear-gradient(135deg,#c6ff00,#0b0b0b 70%)", c: "Un evento sin una identidad memorable.", s: "Branding del evento + sistema de piezas para redes.", o: "Comunidad activa y entradas agotadas." },
  { n: "DNZS", g: "linear-gradient(135deg,#3a3a3a,#c6ff00)", c: "Un proyecto creativo buscando estética propia.", s: "Dirección de arte audaz, identidad sport-luxury.", o: "Una marca imposible de ignorar." },
];

const testimonials = [
  { q: "Trabajar con AXEL RAIA cambió por completo cómo nos perciben nuestros clientes.", n: "Martina López", c: "Fundadora · SINERGIA" },
  { q: "Pasamos de parecer chicos a parecer una marca líder en el rubro.", n: "Diego Fernández", c: "CEO · PRODENT" },
  { q: "Entendieron la visión desde el primer día. Diseño con estrategia real.", n: "Carla Giménez", c: "Directora · TCE EXPERIENCE" },
];

const steps = [
  { n: "01", t: "Discovery", d: "Entendemos tus objetivos, tu mercado y a quién querés impactar." },
  { n: "02", t: "Estrategia", d: "Definimos la dirección creativa y el posicionamiento de tu marca." },
  { n: "03", t: "Diseño", d: "Creamos la experiencia visual completa, hasta el último detalle." },
  { n: "04", t: "Lanzamiento", d: "Entregamos los archivos finales y te acompañamos en la implementación." },
];

const faqs = [
  { q: "¿Cuánto tarda un proyecto?", a: "Depende del alcance. Un branding completo suele llevar entre 3 y 5 semanas; una landing page, entre 2 y 3. Te damos un cronograma claro desde el primer día." },
  { q: "¿Trabajan internacionalmente?", a: "Sí. Trabajamos con clientes de cualquier país, de forma 100% remota y coordinada por videollamada y herramientas en la nube." },
  { q: "¿Puedo contratar solo branding?", a: "Claro. Podés contratar cada servicio por separado o como un sistema completo de marca, redes y web." },
  { q: "¿También gestionan contenido?", a: "Sí. Diseñamos sistemas de contenido y piezas para redes de forma continua, listas para publicar." },
  { q: "¿Hacen sitios web?", a: "Sí. Diseñamos y construimos landing pages, sitios corporativos y portfolios con foco en performance y conversión." },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const orbRef = useRef(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (orbRef.current) {
        orbRef.current.style.transform = `translateY(${window.scrollY * -0.04}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="ax-root">
      <style>{STYLES}</style>
      <div className="grain" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="brand">
          <span className="dot" />
          AXEL&nbsp;RAIA
        </div>
        <div className="nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#trabajo">Trabajo</a>
          <a href="#proceso">Proceso</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#contacto" className="btn btn-accent">
          Agendá una llamada <ArrowUpRight />
        </a>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow reveal">Estudio creativo · Branding · Web</span>
            <h1 className="reveal" style={{ "--d": ".05s" }}>
              Tu marca compite <span className="serif accent">todos los días</span>.
              Que <span className="serif">parezca</span> estar a la altura.
            </h1>
            <p className="sub reveal" style={{ "--d": ".12s" }}>
              Branding, redes sociales y sitios web diseñados para aumentar el
              valor percibido, la credibilidad y el crecimiento de tu negocio.
            </p>
            <div className="hero-cta reveal" style={{ "--d": ".18s" }}>
              <a href="#contacto" className="btn btn-accent">
                Agendá una llamada <ArrowUpRight />
              </a>
              <a href="#trabajo" className="btn btn-ghost">
                Ver portfolio
              </a>
            </div>
            <div className="scroll-hint reveal" style={{ "--d": ".24s" }}>
              <ArrowDown /> Scrolleá para descubrir
            </div>
          </div>

          <div className="orb-stage reveal" style={{ "--d": ".1s" }}>
            <div className="ring-out" />
            <div className="orb" ref={orbRef} />
            <span className="orb-tag t1">+ valor percibido</span>
            <span className="orb-tag t2">identidad premium</span>
          </div>
        </div>
      </header>

      {/* REALITY CHECK */}
      <section className="s-pad">
        <div className="wrap">
          <div className="reality-wrap">
            <div className="reveal">
              <span className="eyebrow">Seamos honestos</span>
              <p className="reality-copy" style={{ marginTop: 22 }}>
                La mayoría de los negocios no tienen un problema de producto.{" "}
                <span>Tienen un problema de percepción.</span> La gente juzga tu
                empresa en segundos. Un branding débil genera dudas; uno fuerte
                genera confianza. <span className="accent">Y la confianza genera ventas.</span>
              </p>
            </div>
            <div className="cards-3">
              {[
                ["01", "Tu marca se ve desactualizada"],
                ["02", "Tu contenido no tiene consistencia"],
                ["03", "Tu web no refleja tu verdadero valor"],
              ].map(([n, t], i) => (
                <div className="rcard reveal" style={{ "--d": `${i * 0.08}s` }} key={n}>
                  <span className="num">{n}</span>
                  <h3>{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES */}
      <section className="s-pad" id="servicios">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Qué hacemos</span>
            <h2>
              Diseño que funciona en <span className="serif accent">cada</span> punto de contacto.
            </h2>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <div className="svc reveal" style={{ "--d": `${i * 0.06}s` }} key={s.t}>
                <div className="svc-head">
                  <h3>{s.t}</h3>
                  <span className="ix">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="svc-tags">
                  {s.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* WHY US — comparison */}
      <section className="s-pad">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Por qué nosotros</span>
            <h2>Qué nos hace diferentes.</h2>
          </div>
          <div className="cmp reveal">
            <div className="cmp-head">
              <div>&nbsp;</div>
              <div className="c-us">AXEL RAIA</div>
              <div className="c-them">Agencias tradicionales</div>
            </div>
            {compRows.map((r) => (
              <div className="cmp-row" key={r}>
                <div className="lbl">{r}</div>
                <div className="mark c-us">
                  <span className="ic-ok">
                    <Check />
                  </span>
                </div>
                <div className="mark">
                  <span className="ic-no">
                    <X />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SELECTED WORK */}
      <section className="s-pad" id="trabajo">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Trabajo seleccionado</span>
            <h2>Proyectos recientes.</h2>
            <p className="work-hint">← Deslizá para ver más →</p>
          </div>
        </div>
        <div className="wrap">
          <div className="work-scroll">
            {work.map((w, i) => (
              <article className="wcard reveal" style={{ "--d": `${i * 0.05}s` }} key={w.n}>
                <div className="thumb" style={{ background: w.g }}>
                  <h3>{w.n}</h3>
                </div>
                <div className="body">
                  <div className="row">
                    <span className="k">Desafío</span>
                    <span className="v">{w.c}</span>
                  </div>
                  <div className="row">
                    <span className="k">Solución</span>
                    <span className="v">{w.s}</span>
                  </div>
                  <div className="row">
                    <span className="k">Resultado</span>
                    <span className="v">{w.o}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* TESTIMONIALS */}
      <section className="s-pad">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Testimonios</span>
            <h2>Lo que dicen los clientes.</h2>
          </div>
          <div className="tgrid">
            {testimonials.map((t, i) => (
              <div className="tcard reveal" style={{ "--d": `${i * 0.08}s` }} key={t.n}>
                <span className="qmark">"</span>
                <p className="quote">{t.q}</p>
                <div className="who">
                  <span className="av" />
                  <div>
                    <div className="n">{t.n}</div>
                    <div className="c">{t.c}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROCESS */}
      <section className="s-pad" id="proceso">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Cómo trabajamos</span>
            <h2>Un proceso simple.</h2>
          </div>
          <div className="proc">
            {steps.map((s, i) => (
              <div className="pstep reveal" style={{ "--d": `${i * 0.06}s` }} key={s.n}>
                <div className="pn">{s.n}</div>
                <div>
                  <div className="pt">{s.t}</div>
                  <div className="pd">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="s-pad" id="faq">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2>Antes de empezar.</h2>
          </div>
          <div className="reveal">
            {faqs.map((f, i) => (
              <div className="faq-item" key={f.q}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className="qi">{openFaq === i ? <Minus /> : <Plus />}</span>
                </button>
                <div className={`faq-a ${openFaq === i ? "open" : ""}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="contacto">
        <div className="wrap">
          <span className="eyebrow reveal" style={{ justifyContent: "center", display: "inline-flex" }}>
            Empecemos
          </span>
          <h2 className="reveal" style={{ "--d": ".05s", marginTop: 18 }}>
            Tu próximo nivel <br /> empieza por tu <span className="serif accent">marca</span>.
          </h2>
          <p className="reveal" style={{ "--d": ".1s" }}>
            Construyamos algo imposible de ignorar.
          </p>
          <a href="#" className="btn btn-accent reveal" style={{ "--d": ".15s" }}>
            Empezá tu proyecto <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap foot-grid">
          <div>
            <div className="brand">
              <span className="dot" />
              AXEL&nbsp;RAIA
            </div>
            <p className="foot-tag" style={{ marginTop: 14 }}>
              Construimos marcas que la gente recuerda. Estudio creativo de
              branding, redes y web.
            </p>
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 26 }}>
            <a href="#servicios">Servicios</a>
            <a href="#trabajo">Trabajo</a>
            <a href="#proceso">Proceso</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="wrap">
          <div className="foot-bot">
            <span>© {new Date().getFullYear()} AXEL RAIA Studio. Todos los derechos reservados.</span>
            <span>Hecho con intención · Córdoba, AR</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <a href="#contacto" className="sticky-cta">
        Agendá una llamada <ArrowUpRight />
      </a>
    </div>
  );
}
