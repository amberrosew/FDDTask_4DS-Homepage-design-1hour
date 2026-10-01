import { useState } from 'react';

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  bg0: '#060F1C',
  bg1: '#091525',
  bg2: '#0D1F38',
  bg3: '#112744',
  accent: '#2481CF',
  accentBright: '#3B9EFF',
  text0: '#F0F4F8',
  text1: '#D0DDE8',
  text2: '#8AAFC5',
  text3: '#5A7A90',
  text4: '#344F65',
  border: 'rgba(255,255,255,0.06)',
  borderFaint: 'rgba(255,255,255,0.04)',
} as const;

const F = {
  display: 'Manrope, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
  mono: "'JetBrains Mono', monospace",
} as const;

// ─── Overline label ───────────────────────────────────────────────────────────
function Label({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: F.mono, fontSize: '10px', fontWeight: 500, color: C.accentBright, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
      {children}
    </p>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark({ size = 28 }: { size?: number }) {
  const s = size / 2 - 1;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="0" y="0" width={s} height={s} fill="#2481CF" />
      <rect x={s + 2} y="0" width={s} height={s} fill="#2481CF" fillOpacity="0.4" />
      <rect x="0" y={s + 2} width={s} height={s} fill="#2481CF" fillOpacity="0.4" />
      <rect x={s + 2} y={s + 2} width={s} height={s} fill="#2481CF" />
    </svg>
  );
}

// ─── Memory array SVG (hero visual) ──────────────────────────────────────────
function MemoryArrayViz() {
  const rows = 7, cols = 9, step = 44, pad = 18;
  const W = pad * 2 + (cols - 1) * step;
  const H = pad * 2 + (rows - 1) * step;

  // Diagonal band of "programmed" cells suggests data flowing through the crossbar
  const lit = new Set([
    '0,1','0,2','0,3',
    '1,2','1,3','1,4',
    '2,3','2,4','2,5',
    '3,3','3,4','3,5','3,6',
    '4,4','4,5','4,6','4,7',
    '5,5','5,6','5,7','5,8',
    '6,6','6,7','6,8',
  ]);
  const dim = new Set(['0,6','0,7','0,8','1,0','2,0','3,0','6,0','6,1']);

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ReRAM crossbar memory array diagram"
      style={{ display: 'block' }}
    >
      <defs>
        <filter id="cellGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="vizFade" cx="45%" cy="50%" r="52%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="vizMask">
          <rect x="0" y="0" width={W} height={H} fill="url(#vizFade)" />
        </mask>
      </defs>

      <g mask="url(#vizMask)">
        {/* Wordlines */}
        {Array.from({ length: rows }, (_, r) => (
          <line key={`h${r}`}
            x1={pad} y1={pad + r * step}
            x2={W - pad} y2={pad + r * step}
            stroke="rgba(59,158,255,0.13)" strokeWidth="1"
          />
        ))}
        {/* Bitlines */}
        {Array.from({ length: cols }, (_, c) => (
          <line key={`v${c}`}
            x1={pad + c * step} y1={pad}
            x2={pad + c * step} y2={H - pad}
            stroke="rgba(59,158,255,0.13)" strokeWidth="1"
          />
        ))}
        {/* Cells */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const key = `${r},${c}`;
            const isLit = lit.has(key);
            const isDim = dim.has(key);
            const cx = pad + c * step;
            const cy = pad + r * step;
            const fill = isLit ? C.accentBright : isDim ? 'rgba(59,158,255,0.04)' : 'rgba(255,255,255,0.07)';
            return (
              <g key={key}>
                {isLit && (
                  <rect x={cx - 10} y={cy - 10} width={20} height={20}
                    rx={1} fill="rgba(59,158,255,0.16)" filter="url(#cellGlow)"
                  />
                )}
                <rect x={cx - 4.5} y={cy - 4.5} width={9} height={9}
                  rx={0.5} fill={fill}
                />
              </g>
            );
          })
        )}
      </g>

      {/* Axis labels */}
      <text x={pad} y={H - 2} fontSize="8" fill="rgba(59,158,255,0.35)"
        fontFamily={F.mono} letterSpacing="2">BITLINES</text>
      <text x={2} y={pad + 3} fontSize="8" fill="rgba(59,158,255,0.35)"
        fontFamily={F.mono} letterSpacing="2"
        transform={`rotate(-90, 8, ${pad + 2})`}>WL</text>
    </svg>
  );
}

// ─── Investment card icons ─────────────────────────────────────────────────────
function IconProven() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" stroke="rgba(59,158,255,0.35)" strokeWidth="1" />
      <circle cx="20" cy="20" r="13" stroke="rgba(59,158,255,0.15)" strokeWidth="0.5" strokeDasharray="2.5 2.5" />
      {[11, 15, 19, 23, 27, 31].map(x => (
        <line key={x} x1={x} y1="9" x2={x} y2="31" stroke="rgba(59,158,255,0.18)" strokeWidth="0.5" />
      ))}
      {[11, 15, 19, 23, 27, 31].map(y => (
        <line key={y} x1="9" y1={y} x2="31" y2={y} stroke="rgba(59,158,255,0.18)" strokeWidth="0.5" />
      ))}
      <rect x="17" y="17" width="6" height="6" fill={C.accentBright} opacity="0.9" />
    </svg>
  );
}

function IconPerformance() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M4 20 L9 20 L13 11 L18 29 L23 15 L27 25 L31 20 L36 20"
        stroke={C.accentBright} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M4 25 L9 25 L13 17 L18 33 L23 20 L27 28 L31 25 L36 25"
        stroke="rgba(59,158,255,0.25)" strokeWidth="1" strokeLinejoin="round" fill="none" />
      <line x1="4" y1="20" x2="4" y2="36" stroke="rgba(59,158,255,0.2)" strokeWidth="0.5" />
      <line x1="4" y1="36" x2="36" y2="36" stroke="rgba(59,158,255,0.2)" strokeWidth="0.5" />
    </svg>
  );
}

function IconCommercial() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="7" cy="22" r="3.5" stroke={C.accentBright} strokeWidth="1.5" />
      <circle cx="20" cy="12" r="3.5" stroke={C.accentBright} strokeWidth="1.5" />
      <circle cx="33" cy="22" r="3.5" fill={C.accentBright} fillOpacity="0.85" />
      <path d="M10.5 22 C13 22 16 12 20 12" stroke="rgba(59,158,255,0.55)" strokeWidth="1.5" fill="none" />
      <path d="M23 12 C27 12 29.5 22 33 22" stroke="rgba(59,158,255,0.55)" strokeWidth="1.5" fill="none" />
      <line x1="7" y1="26" x2="33" y2="26" stroke="rgba(59,158,255,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
      <rect x="18" y="28" width="4" height="6" fill="rgba(59,158,255,0.25)" />
      <rect x="13" y="30" width="4" height="4" fill="rgba(59,158,255,0.15)" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="28" width="32" height="7" rx="1" fill="rgba(59,158,255,0.12)" stroke="rgba(59,158,255,0.3)" strokeWidth="1" />
      <rect x="4" y="18" width="32" height="7" rx="1" fill="rgba(59,158,255,0.22)" stroke="rgba(59,158,255,0.45)" strokeWidth="1" />
      <rect x="4" y="8" width="32" height="7" rx="1" fill="rgba(59,158,255,0.38)" stroke={C.accentBright} strokeWidth="1" />
      {[12, 20, 28].map(x => (
        <g key={x}>
          <line x1={x} y1="15" x2={x} y2="18" stroke="rgba(59,158,255,0.45)" strokeWidth="1" />
          <line x1={x} y1="25" x2={x} y2="28" stroke="rgba(59,158,255,0.3)" strokeWidth="1" />
        </g>
      ))}
      <circle cx="12" cy="11.5" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="20" cy="11.5" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="28" cy="11.5" r="1.5" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INVESTMENT_CARDS = [
  { icon: <IconProven />, title: 'Proven technology', body: '60nm PCMO ReRAM platform, validated in collaboration with Western Digital. Protected by 34 US patents covering process, device and circuit innovations.' },
  { icon: <IconPerformance />, title: 'High-performance memory', body: 'Superior endurance, competitive speed and tunable multi-bit persistence compared to conventional non-volatile memory architectures.' },
  { icon: <IconCommercial />, title: 'Commercial pathways', body: 'India and mature-node memory markets offer near-term revenue pathways without dependence on leading-edge fabrication capability.' },
  { icon: <IconAI />, title: 'Integrated AI platform', body: 'The Jenesys acquisition combines 4DS ReRAM hardware with Edge-AI inference software, creating a unified computing-in-memory solution.' },
];

const ANNOUNCEMENTS = [
  {
    date: '31 Aug 2026',
    category: 'Corporate',
    title: '4DS to acquire Jenesys',
    excerpt: '4DS Memory announces its intention to acquire Edge-AI software company Jenesys, creating an integrated computing-in-memory platform combining proprietary ReRAM hardware and AI inference software.',
  },
  {
    date: '2 Sep 2026',
    category: 'Investor Briefing',
    title: 'Jenesys Investor Webinar',
    excerpt: 'Join 4DS management for a detailed presentation on the Jenesys acquisition rationale, the combined technology platform, and the commercial opportunity in Edge-AI at the edge.',
  },
  {
    date: '2 Sep 2026',
    category: 'Capital Markets',
    title: 'Capital Raising',
    excerpt: '4DS Memory announces a capital raising to support the Jenesys acquisition and fund accelerated development of its integrated ReRAM and Edge-AI computing-in-memory platform.',
  },
];

const EVENTS = [
  { date: '2 Oct 2026', title: 'General Meeting', note: 'Shareholder vote on Jenesys acquisition and capital raising resolutions.', conditional: false },
  { date: '5 Oct 2026', title: 'Target completion: Jenesys transaction', note: 'Subject to shareholder approval and satisfaction of all conditions.', conditional: true },
];

const FAQ_ITEMS = [
  {
    q: 'What does 4DS Memory do?',
    a: '4DS Memory is developing Resistive Random-Access Memory (ReRAM) technology using a proprietary PCMO oxide material. The company has validated its platform at 60nm and is extending into Edge-AI computing-in-memory applications targeting autonomous systems, defence, and industrial automation markets.',
  },
  {
    q: 'What is ReRAM?',
    a: 'ReRAM (Resistive Random-Access Memory) stores data by changing the electrical resistance of a material rather than using charge, as in conventional flash memory. This enables lower write energy, higher endurance cycles, faster performance, and — critically — the ability to perform computation directly within the memory array.',
  },
  {
    q: "What makes 4DS's ReRAM different?",
    a: "4DS uses a proprietary PCMO (Praseodymium Calcium Manganese Oxide) material, providing superior endurance and multi-bit storage compared to most competitor approaches. The technology is compatible with mature semiconductor nodes, making it commercially viable without dependence on leading-edge fabrication. 4DS holds 34 US patents protecting its innovations.",
  },
  {
    q: 'What is the Jenesys acquisition?',
    a: "Announced 31 August 2026, 4DS intends to acquire Jenesys, an Edge-AI software company. The transaction combines 4DS's ReRAM hardware platform with Jenesys's AI inference software, creating a complete computing-in-memory solution. Subject to shareholder approval and regulatory conditions, with target completion in early October 2026.",
  },
  {
    q: 'What is computing-in-memory?',
    a: "Computing-in-memory (CIM) performs AI inference calculations directly within the memory array, eliminating the energy and latency cost of moving data between processor and memory — the dominant bottleneck in AI workloads. ReRAM's resistance-based cells naturally implement matrix multiplication (the core AI operation) through Ohm's law.",
  },
  {
    q: 'Where could 4DS technology be used?',
    a: '4DS targets applications requiring intelligent computing at the edge with strict size, weight and power constraints: autonomous vehicles and drone systems, industrial automation and predictive maintenance, defence and security platforms, and connected devices. The company is also pursuing mature-node memory replacement opportunities in India and high-growth markets.',
  },
];

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      backgroundColor: 'rgba(9,21,37,0.97)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} role="banner">
          <LogoMark size={28} />
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: '17px', color: C.text0, letterSpacing: '-0.025em' }}>
            4DS{' '}
            <span style={{ fontWeight: 400, color: '#5BA8E5' }}>Memory</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {['Technology', 'Company', 'Investors'].map(item => (
            <a key={item} href="#"
              style={{ fontFamily: F.body, fontSize: '14px', fontWeight: 500, color: C.text2, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text0)}
              onMouseLeave={e => (e.currentTarget.style.color = C.text2)}>
              {item}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontWeight: 500, color: C.text4, letterSpacing: '0.14em' }}>
            ASX: 4DS
          </span>
          <a href="#"
            style={{
              fontFamily: F.body, fontSize: '13px', fontWeight: 600,
              color: C.text0, textDecoration: 'none',
              padding: '8px 18px',
              backgroundColor: '#1A5FA8',
              border: '1px solid rgba(59,158,255,0.28)',
              borderRadius: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2068B8')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A5FA8')}>
            Investor Centre
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ backgroundColor: C.bg1, position: 'relative', overflow: 'hidden' }}>
      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(36,129,207,0.22) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      {/* Fade left */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 70% 80% at 28% 52%, transparent 35%, ${C.bg1} 100%)`,
      }} />
      {/* Top radial glow */}
      <div style={{
        position: 'absolute', top: '-120px', right: '8%', width: '480px', height: '480px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(36,129,207,0.08) 0%, transparent 65%)',
        borderRadius: '50%',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 40px 104px', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <Label>ASX-Listed · Australian Technology</Label>

          <h1 style={{
            fontFamily: F.display,
            fontSize: 'clamp(38px, 4.5vw, 60px)',
            fontWeight: 800,
            color: C.text0,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            marginBottom: '24px',
          }}>
            Memory built for<br />
            <span style={{ color: C.accentBright }}>intelligent computing</span>
          </h1>

          <p style={{ fontFamily: F.body, fontSize: '17px', fontWeight: 400, color: C.text2, lineHeight: 1.72, maxWidth: '460px', marginBottom: '44px' }}>
            4DS Memory is developing high-endurance ReRAM and Edge-AI technologies for the next generation of efficient, intelligent computing.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#"
              style={{ fontFamily: F.body, fontSize: '14px', fontWeight: 600, color: C.text0, textDecoration: 'none', padding: '13px 28px', backgroundColor: '#1E72C0', border: '1px solid rgba(59,158,255,0.3)', borderRadius: '2px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#256AB8')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1E72C0')}>
              Explore our technology
            </a>
            <a href="#"
              style={{ fontFamily: F.body, fontSize: '14px', fontWeight: 600, color: C.text2, textDecoration: 'none', padding: '13px 28px', backgroundColor: 'transparent', border: '1px solid rgba(138,175,197,0.22)', borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(138,175,197,0.45)'; e.currentTarget.style.color = C.text1; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,175,197,0.22)'; e.currentTarget.style.color = C.text2; }}>
              Investor Centre
            </a>
          </div>
        </div>

        {/* Right: Memory Array */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-60px',
              background: 'radial-gradient(circle, rgba(36,129,207,0.09) 0%, transparent 65%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />
            <MemoryArrayViz />
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: F.mono, fontSize: '9px', color: 'rgba(59,158,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                PCMO Crossbar Array
              </span>
              <span style={{ width: '1px', height: '10px', backgroundColor: 'rgba(59,158,255,0.2)', display: 'inline-block' }} />
              <span style={{ fontFamily: F.mono, fontSize: '9px', color: 'rgba(59,158,255,0.25)', letterSpacing: '0.14em' }}>
                60nm node
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: '4DS', label: 'ASX Listing', mono: true },
    { value: '34', label: 'US Patents', mono: false },
    { value: '60nm', label: 'Validated Node', mono: true },
    { value: '2007', label: 'Year Established', mono: false },
  ];
  return (
    <section style={{ backgroundColor: C.bg2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '44px 32px',
            borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
          }}>
            <div style={{
              fontFamily: s.mono ? F.mono : F.display,
              fontSize: s.mono ? '34px' : '44px',
              fontWeight: 700,
              color: C.text0,
              letterSpacing: s.mono ? '0.04em' : '-0.025em',
              lineHeight: 1,
              marginBottom: '10px',
            }}>
              {s.value}
            </div>
            <div style={{ fontFamily: F.body, fontSize: '11px', fontWeight: 600, color: C.text4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Technology Story ─────────────────────────────────────────────────────────
function TechnologyStory() {
  const steps = [
    { num: '01', title: 'MEMORY', sub: 'Proprietary PCMO ReRAM', desc: 'A unique Praseodymium Calcium Manganese Oxide material enables high-endurance, multi-bit resistance storage — validated at 60nm, compatible with mature-node foundry fabrication.' },
    { num: '02', title: 'INTELLIGENCE', sub: 'Edge-AI / Computing-in-Memory', desc: 'ReRAM cells perform matrix multiplication in-situ, enabling AI inference at a fraction of the energy and latency of conventional processor–memory architectures.' },
    { num: '03', title: 'APPLICATIONS', sub: 'Autonomous, Industrial, Defence', desc: 'Intelligent, real-time computing at the edge: autonomous vehicles, industrial automation, defence platforms, and connected devices with strict power constraints.' },
  ];

  return (
    <section style={{ backgroundColor: C.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
          <div>
            <Label>Technology Platform</Label>
            <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              From advanced memory to intelligent computing
            </h2>
          </div>
          <div style={{ paddingTop: '28px' }}>
            <p style={{ fontFamily: F.body, fontSize: '15px', color: C.text2, lineHeight: 1.75 }}>
              4DS has developed a vertically integrated technology stack — from novel oxide-based non-volatile memory cells through to Edge-AI computing-in-memory software. The acquisition of Jenesys brings the full stack under one platform.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: C.borderFaint }}>
          {steps.map((step, i) => (
            <div key={i} style={{ backgroundColor: C.bg2, padding: '44px 40px', position: 'relative' }}>
              {/* Connector arrow */}
              {i < 2 && (
                <div style={{ position: 'absolute', right: '-1px', top: '52px', display: 'flex', alignItems: 'center', zIndex: 2 }}>
                  <div style={{ width: '1px', height: '1px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${C.bg2}` }} />
                </div>
              )}
              <div style={{ fontFamily: F.mono, fontSize: '10px', fontWeight: 500, color: C.accentBright, letterSpacing: '0.18em', marginBottom: '24px' }}>
                {step.num}
              </div>
              <div style={{ fontFamily: F.display, fontSize: '22px', fontWeight: 800, color: C.text0, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                {step.title}
              </div>
              <div style={{ fontFamily: F.body, fontSize: '12px', fontWeight: 600, color: C.accentBright, letterSpacing: '0.04em', marginBottom: '18px' }}>
                {step.sub}
              </div>
              <p style={{ fontFamily: F.body, fontSize: '14px', color: C.text3, lineHeight: 1.75 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Investment Case ──────────────────────────────────────────────────────────
function InvestmentCase() {
  return (
    <section style={{ backgroundColor: C.bg2, padding: '96px 0', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
          <div>
            <Label>Investment Case</Label>
            <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Why 4DS
            </h2>
          </div>
          <div style={{ paddingTop: '28px' }}>
            <p style={{ fontFamily: F.body, fontSize: '15px', color: C.text2, lineHeight: 1.75 }}>
              4DS combines patented materials science, a validated semiconductor process, and now an integrated software layer to address high-growth markets in Edge-AI and intelligent computing infrastructure.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: C.borderFaint }}>
          {INVESTMENT_CARDS.map((card, i) => (
            <div key={i}
              style={{ backgroundColor: C.bg2, padding: '44px', transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.bg3)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.bg2)}>
              <div style={{ marginBottom: '20px' }}>{card.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: '18px', fontWeight: 700, color: C.text0, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                {card.title}
              </div>
              <p style={{ fontFamily: F.body, fontSize: '14px', color: C.text3, lineHeight: 1.75 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Latest Announcements ─────────────────────────────────────────────────────
function LatestAnnouncements() {
  return (
    <section style={{ backgroundColor: C.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px' }}>
          <div>
            <Label>ASX Announcements</Label>
            <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Latest from 4DS
            </h2>
          </div>
          <a href="#"
            style={{ fontFamily: F.body, fontSize: '13px', fontWeight: 600, color: C.accentBright, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '2px', borderBottom: '1px solid rgba(59,158,255,0.35)', whiteSpace: 'nowrap' }}>
            View all announcements →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: C.borderFaint }}>
          {ANNOUNCEMENTS.map((ann, i) => (
            <a key={i} href="#"
              style={{ display: 'block', padding: '36px', backgroundColor: C.bg2, textDecoration: 'none', transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.bg3)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.bg2)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <span style={{ fontFamily: F.mono, fontSize: '11px', color: C.text4, letterSpacing: '0.06em' }}>
                  {ann.date}
                </span>
                <span style={{
                  fontFamily: F.body, fontSize: '10px', fontWeight: 600, color: C.accentBright,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '3px 9px', backgroundColor: 'rgba(59,158,255,0.1)',
                  borderRadius: '1px', border: '1px solid rgba(59,158,255,0.18)',
                }}>
                  {ann.category}
                </span>
              </div>
              <div style={{ fontFamily: F.display, fontSize: '16px', fontWeight: 700, color: C.text0, lineHeight: 1.35, marginBottom: '14px', letterSpacing: '-0.01em' }}>
                {ann.title}
              </div>
              <p style={{ fontFamily: F.body, fontSize: '13px', color: C.text3, lineHeight: 1.7 }}>
                {ann.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Upcoming Events ──────────────────────────────────────────────────────────
function UpcomingEvents() {
  return (
    <section style={{ backgroundColor: C.bg2, padding: '72px 0', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <Label>Investor Calendar</Label>
            <h2 style={{ fontFamily: F.display, fontSize: '28px', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em' }}>
              Upcoming Events
            </h2>
          </div>
          <a href="#"
            style={{ fontFamily: F.body, fontSize: '13px', fontWeight: 600, color: C.accentBright, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '2px', borderBottom: '1px solid rgba(59,158,255,0.35)', whiteSpace: 'nowrap' }}>
            View all events →
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: C.borderFaint }}>
          {EVENTS.map((ev, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', padding: '28px 36px', backgroundColor: C.bg2 }}>
              <div style={{ minWidth: '108px' }}>
                <div style={{ fontFamily: F.mono, fontSize: '13px', fontWeight: 500, color: C.text0, letterSpacing: '0.04em' }}>
                  {ev.date}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.display, fontSize: '15px', fontWeight: 700, color: C.text0, letterSpacing: '-0.01em' }}>
                    {ev.title}
                  </span>
                  {ev.conditional && (
                    <span style={{
                      fontFamily: F.body, fontSize: '10px', fontWeight: 500, color: C.text4,
                      letterSpacing: '0.07em', textTransform: 'uppercase',
                      padding: '2px 8px', border: `1px solid rgba(84,122,144,0.25)`, borderRadius: '1px',
                    }}>
                      Subject to conditions
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: F.body, fontSize: '13px', color: C.text4, lineHeight: 1.6 }}>
                  {ev.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ backgroundColor: C.bg1, padding: '96px 0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Label>Common Questions</Label>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Frequently asked questions
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
                }}>
                <span style={{ fontFamily: F.display, fontSize: '16px', fontWeight: 600, color: open === i ? C.text0 : C.text1, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                  {item.q}
                </span>
                <span style={{
                  flexShrink: 0, width: '22px', height: '22px', borderRadius: '1px',
                  border: `1px solid ${open === i ? 'rgba(59,158,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: open === i ? C.accentBright : C.text3,
                  fontSize: '16px', fontWeight: 300, lineHeight: 1,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s, color 0.2s',
                }}>
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: '24px' }}>
                  <p style={{ fontFamily: F.body, fontSize: '14px', color: C.text3, lineHeight: 1.78 }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Investor CTA ──────────────────────────────────────────────────────────────
function InvestorCTA() {
  return (
    <section style={{ backgroundColor: C.bg2, padding: '88px 0', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
        <Label>Investor Relations</Label>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: C.text0, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
          Stay up to date with 4DS Memory
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.text3, lineHeight: 1.72, marginBottom: '8px' }}>
          Latest announcements · Investor presentations · Webinars · ASX information
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '40px', flexWrap: 'wrap' }}>
          <a href="#"
            style={{ fontFamily: F.body, fontSize: '14px', fontWeight: 600, color: C.text0, textDecoration: 'none', padding: '13px 28px', backgroundColor: '#1E72C0', border: '1px solid rgba(59,158,255,0.3)', borderRadius: '2px' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#256AB8')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1E72C0')}>
            Investor Centre
          </a>
          <a href="#"
            style={{ fontFamily: F.body, fontSize: '14px', fontWeight: 600, color: C.text2, textDecoration: 'none', padding: '13px 28px', backgroundColor: 'transparent', border: '1px solid rgba(138,175,197,0.22)', borderRadius: '2px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(138,175,197,0.4)'; e.currentTarget.style.color = C.text1; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,175,197,0.22)'; e.currentTarget.style.color = C.text2; }}>
            Contact Investor Relations
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const navCols = [
    { title: 'Technology', links: ['ReRAM Platform', 'PCMO Material', 'Edge-AI / CIM', 'IP Portfolio', 'Technical Papers'] },
    { title: 'Company', links: ['About 4DS', 'Leadership Team', 'Partners', 'Jenesys', 'Careers'] },
    { title: 'Investors', links: ['ASX Announcements', 'Annual Reports', 'Investor Presentations', 'Corporate Governance', 'Contact IR'] },
  ];

  return (
    <footer style={{ backgroundColor: C.bg0, borderTop: `1px solid ${C.border}`, padding: '72px 0 36px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '72px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <LogoMark size={26} />
              <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: '16px', color: C.text0, letterSpacing: '-0.02em' }}>
                4DS <span style={{ fontWeight: 400, color: '#5BA8E5' }}>Memory</span>
              </span>
            </div>
            <p style={{ fontFamily: F.body, fontSize: '13px', color: C.text4, lineHeight: 1.75, maxWidth: '270px', marginBottom: '20px' }}>
              Developing high-endurance ReRAM and Edge-AI technologies for the next generation of intelligent computing. Listed on the Australian Securities Exchange.
            </p>
            <div style={{ fontFamily: F.mono, fontSize: '10px', color: C.text4, letterSpacing: '0.1em', marginBottom: '6px' }}>ASX: 4DS</div>
            <div style={{ fontFamily: F.mono, fontSize: '10px', color: C.text4, letterSpacing: '0.06em' }}>ABN 78 064 638 216</div>
          </div>

          {navCols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: F.body, fontSize: '10px', fontWeight: 700, color: C.text4, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '18px' }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {col.links.map(link => (
                  <a key={link} href="#"
                    style={{ fontFamily: F.body, fontSize: '13px', color: C.text4, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.text2)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.text4)}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontFamily: F.body, fontSize: '12px', color: C.text4 }}>
            © 2026 4DS Memory Ltd. All rights reserved. ASX: 4DS.
          </p>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['Privacy Policy', 'Legal Notices', 'Contact'].map(link => (
              <a key={link} href="#"
                style={{ fontFamily: F.body, fontSize: '12px', color: C.text4, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text2)}
                onMouseLeave={e => (e.currentTarget.style.color = C.text4)}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ backgroundColor: C.bg1, minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <TechnologyStory />
        <InvestmentCase />
        <LatestAnnouncements />
        <UpcomingEvents />
        <FAQ />
        <InvestorCTA />
      </main>
      <Footer />
    </div>
  );
}
