import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react'
import profilePhoto from '@/imports/WhatsApp_Image_2026-05-06_at_21.38.09__1_.jpeg'

type Theme = 'dark' | 'light'

/* ── Data ─────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    num: '01',
    title: 'FairWatch',
    subtitle: 'AI Hiring Bias Detection System',
    desc: 'AI-powered fairness monitoring system for hiring pipelines. Uses FastAPI, React, Machine Learning, and SHAP explainability to surface and explain bias with actionable, transparent insights.',
    tags: ['FastAPI', 'React', 'Machine Learning', 'SHAP', 'Python'],
    accent: 'var(--cyan)',
    dim: 'var(--cyan-dim)',
    url: 'https://github.com/MehirSaxena736/FairWatch-AI-Hiring-Bias-Detection-System',
    image: 'https://raw.githubusercontent.com/MehirSaxena736/FairWatch-AI-Hiring-Bias-Detection-System/main/Image/Screenshot%202026-07-08%20220339.png',
  },
  {
    num: '02',
    title: 'IntelliShop',
    subtitle: 'Multimodal Visual Product Search',
    desc: 'AI-powered product search using image & text retrieval. Leverages CLIP embeddings and FAISS vector search with explainable recommendations bridging visual and semantic understanding.',
    tags: ['CLIP', 'FAISS', 'PyTorch', 'Multimodal AI', 'Vector Search'],
    accent: 'var(--violet)',
    dim: 'var(--violet-dim)',
    url: 'https://github.com/MehirSaxena736/IntelliShop---Multimodal-Visual-Product-Search-Recommendation-System',
    image: 'https://raw.githubusercontent.com/MehirSaxena736/IntelliShop---Multimodal-Visual-Product-Search-Recommendation-System/main/Images/Screenshot%202026-07-10%20185154.png',
  },
  {
    num: '03',
    title: 'TechSphere Professionals',
    subtitle: 'CSE Job Market Intelligence',
    desc: 'ML project predicting CSE job market trends with salary forecasting, skill demand analysis, and interactive dashboards built with Python, Streamlit, and Flask.',
    tags: ['Python', 'Streamlit', 'Flask', 'Scikit-learn', 'Data Visualization'],
    accent: 'var(--emerald)',
    dim: 'var(--emerald-dim)',
    url: 'https://github.com/MehirSaxena736/TechSphere-Professionals',
    image: 'https://raw.githubusercontent.com/MehirSaxena736/TechSphere-Professionals/main/Images/Screenshot%202026-07-05%20225156.png',
  },
  {
    num: '04',
    title: 'Analytics Dashboards',
    subtitle: 'Interactive BI & Data Visualization',
    desc: 'A curated collection of interactive business intelligence dashboards for data-driven decision making, leveraging Power BI, Tableau, Excel, and Python for end-to-end analytics.',
    tags: ['Power BI', 'Tableau', 'Excel', 'Python', 'Analytics'],
    accent: 'var(--amber)',
    dim: 'var(--amber-dim)',
    url: 'https://github.com/MehirSaxena736/Dashboards',
    image: 'https://raw.githubusercontent.com/MehirSaxena736/Dashboards/main/Business%20Analytics%20Dashboard/Images/Screenshot%202026-07-02%20222949.png',
  },
]

const SKILLS = [
  { name: 'Languages', accent: 'var(--cyan)', dim: 'var(--cyan-dim)', list: ['Python', 'Java', 'C', 'SQL', 'HTML'] },
  { name: 'ML / AI', accent: 'var(--violet)', dim: 'var(--violet-dim)', list: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'TensorFlow', 'PyTorch'] },
  { name: 'BI & Visualization', accent: 'var(--emerald)', dim: 'var(--emerald-dim)', list: ['Power BI', 'Tableau'] },
  { name: 'Tools & Databases', accent: 'var(--amber)', dim: 'var(--amber-dim)', list: ['Git', 'GitHub', 'MySQL'] },
]

// Chronological order: oldest (top) → newest (bottom)
const EXPERIENCE = [
  {
    role: 'B.Tech CSE (Data Science)',
    org: 'UPES, Dehradun',
    period: '2023 – 2027',
    desc: 'Bachelor of Technology in Computer Science with Data Science specialization. Maintaining a 9.33 CGPA with deep focus on AI, ML, Computer Vision, and Responsible AI.',
    current: false,
    accent: 'var(--emerald)',
  },
  {
    role: 'Research Intern',
    org: 'IIT Roorkee',
    period: '2025',
    desc: 'Researched Neuromorphic Computing & AI — exploring brain-inspired computing architectures and spiking neural networks for next-generation intelligent AI systems.',
    current: false,
    accent: 'var(--violet)',
  },
  {
    role: 'Software Intern',
    org: 'DOI Soft Tech',
    period: '2025',
    desc: 'Gained hands-on industry experience in software development, contributing to real-world projects and strengthening applied engineering skills.',
    current: false,
    accent: 'var(--amber)',
  },
  {
    role: 'Summer Intern',
    org: 'IBM',
    period: '2026 · Present',
    desc: "Working on cutting-edge Data Science and AI initiatives at IBM, applying machine learning to enterprise-scale challenges at one of the world's leading technology companies.",
    current: true,
    accent: 'var(--cyan)',
  },
]

const NAV = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

/* ── Typing animation hook ────────────────────────────────────────────────── */

function useTypewriter(): string {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    // Each frame is the string to display at that step
    const frames = [
      'M', 'Me', 'Meh', 'Mehi', 'Mehir',
      'Mehir', 'Mehir',           // pause at "Mehir"
      'Mehi', 'Meh',              // backspace to "Meh"
      'Meh',                      // pause at "Meh"
      'Mehi', 'Mehir',            // retype "Mehir"
      'Mehir ', 'Mehir S', 'Mehir Sa', 'Mehir Sax', 'Mehir Saxe', 'Mehir Saxen', 'Mehir Saxena',
      'Mehir Saxena', 'Mehir Saxena', 'Mehir Saxena', 'Mehir Saxena', 'Mehir Saxena',
    ]
    const delays = [
      120, 110, 100, 110, 120,
      280, 280,
      65, 65,
      240,
      105, 110,
      85, 80, 80, 80, 80, 80, 80,
      500, 500, 500, 500, 2200,
    ]

    let step = 0
    let tid: ReturnType<typeof setTimeout>

    const advance = () => {
      if (step < frames.length) {
        setDisplayed(frames[step])
        tid = setTimeout(advance, delays[step] ?? 100)
        step++
      } else {
        step = 0
        setDisplayed('')
        tid = setTimeout(advance, 420)
      }
    }

    tid = setTimeout(advance, 380)
    return () => clearTimeout(tid)
  }, [])

  return displayed
}

/* ── Scroll spy ───────────────────────────────────────────────────────────── */

function useScrollSpy() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const handle = () => {
      let cur = ''
      NAV.forEach(n => {
        const el = document.getElementById(n.toLowerCase())
        if (el && window.scrollY >= el.offsetTop - 120) cur = n.toLowerCase()
      })
      setActive(cur)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return active
}

/* ── Fade-in on scroll ────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Icons ────────────────────────────────────────────────────────────────── */

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

/* ── Section heading ──────────────────────────────────────────────────────── */

function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <FadeIn className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-h)', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em' }}>
          {label}
        </span>
        <div style={{ height: 1, width: 48, background: 'var(--cyan)', opacity: 0.4 }} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: sub ? 12 : 0 }}>
        {title}
      </h2>
      {sub && <p style={{ color: 'var(--text-2)', fontSize: 17, maxWidth: 520 }}>{sub}</p>}
    </FadeIn>
  )
}

/* ── Navbar ───────────────────────────────────────────────────────────────── */

function Navbar({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  const active = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="flex items-center justify-between" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 20, color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.02em' }}
        >
          MS<span style={{ color: 'var(--text)' }}>.</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map(n => (
            <button
              key={n}
              onClick={() => go(n.toLowerCase())}
              style={{
                fontFamily: 'var(--font-h)', fontSize: 14, fontWeight: 500,
                color: active === n.toLowerCase() ? 'var(--cyan)' : 'var(--text-2)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s', letterSpacing: '0.02em', position: 'relative',
              }}
              onMouseEnter={e => { if (active !== n.toLowerCase()) (e.target as HTMLElement).style.color = 'var(--text)' }}
              onMouseLeave={e => { if (active !== n.toLowerCase()) (e.target as HTMLElement).style.color = 'var(--text-2)' }}
            >
              {n}
              {active === n.toLowerCase() && (
                <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'var(--cyan)', borderRadius: 1 }} />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-2)', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text)'; el.style.borderColor = 'var(--text-3)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-2)'; el.style.borderColor = 'var(--border)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="md:hidden"
            onClick={() => setOpen(o => !o)}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-2)', display: 'flex', alignItems: 'center' }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }} className="md:hidden">
          {NAV.map(n => (
            <button
              key={n}
              onClick={() => go(n.toLowerCase())}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-h)', fontSize: 16, fontWeight: 500, color: active === n.toLowerCase() ? 'var(--cyan)' : 'var(--text-2)', background: 'none', border: 'none', borderBottom: '1px solid var(--border-dim)', cursor: 'pointer' }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function Hero() {
  const typed = useTypewriter()
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-5%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.5 }} />
      </div>

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative' }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="h0 inline-flex items-center gap-2" style={{ background: 'var(--cyan-dim)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />
              <span style={{ color: 'var(--cyan)', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-h)', letterSpacing: '0.1em' }}>OPEN TO OPPORTUNITIES</span>
            </div>

            {/* Name with typing animation */}
            <h1 className="h1" style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
              <span style={{ background: 'linear-gradient(135deg, var(--cyan) 0%, #38bdf8 45%, var(--violet) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {typed}
              </span>
              <span style={{ color: 'var(--cyan)', opacity: cursorVisible ? 1 : 0, WebkitTextFillColor: 'var(--cyan)', transition: 'opacity 0.1s' }}>|</span>
            </h1>

            <p className="h2" style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontWeight: 500, color: 'var(--text-2)', marginBottom: 14, letterSpacing: '0.01em' }}>
              Data Science &amp; AI Enthusiast
            </p>

            <p className="h3" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-2)', marginBottom: 40, maxWidth: 500, lineHeight: 1.65 }}>
              Transforming Data into Intelligent Solutions.
            </p>

            <div className="h4 flex flex-wrap gap-4 justify-center lg:justify-start" style={{ marginBottom: 36 }}>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'var(--cyan)', color: '#000', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s', boxShadow: '0 0 24px rgba(6,182,212,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(6,182,212,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(6,182,212,0.35)' }}
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'transparent', color: 'var(--text)', fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 15, padding: '12px 28px', borderRadius: 10, border: '1px solid var(--border)', cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--cyan)'; (e.currentTarget as HTMLElement).style.color = 'var(--cyan)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
              >
                Contact Me
              </button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { href: 'https://github.com/MehirSaxena736', icon: <GithubIcon />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/mehirs', icon: <LinkedinIcon />, label: 'LinkedIn' },
                { href: 'mailto:mehirsaxena34@gmail.com', icon: <MailIcon />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-2)', fontFamily: 'var(--font-h)', fontSize: 13, fontWeight: 500, textDecoration: 'none', padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--cyan)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--cyan)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── About ────────────────────────────────────────────────────────────────── */

function About() {
  const interests = ['Computer Vision', 'Multimodal AI', 'LLMs', 'Responsible AI', 'Neuromorphic Computing']

  return (
    <section id="about" style={{ padding: 'clamp(60px, 10vw, 100px) 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label="/ ABOUT" title="About Me" />

        <div className="grid md:grid-cols-5 gap-14 items-start">

          {/* Left: Photo + quick facts */}
          <FadeIn className="md:col-span-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* Profile photo */}
              <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', transform: 'rotate(2deg)', opacity: 0.25 }} />
                <img
                  src={profilePhoto}
                  alt="Mehir Saxena"
                  style={{ width: '100%', maxWidth: 320, aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center top', borderRadius: 18, display: 'block', position: 'relative', border: '2px solid var(--border)' }}
                />
                {/* Overlay badge */}
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: 'rgba(6,10,20,0.82)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '10px 14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 14, color: '#000', flexShrink: 0 }}>MS</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14, color: '#e8eeff' }}>Mehir Saxena</div>
                    <div style={{ fontSize: 12, color: 'rgba(232,238,255,0.6)' }}>UPES · B.Tech CSE (DS)</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3" style={{ width: '100%', maxWidth: 320 }}>
                {[
                  { value: '9.33', label: 'CGPA', accent: 'var(--cyan)' },
                  { value: 'IBM', label: 'Current', accent: 'var(--violet)' },
                  { value: 'IIT R', label: 'Research', accent: 'var(--emerald)' },
                ].map(({ value, label, accent }) => (
                  <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 16, color: accent, marginBottom: 3 }}>{value}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-h)', letterSpacing: '0.05em' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Bio */}
          <FadeIn delay={150} className="md:col-span-3">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.8 }}>
                I&apos;m a <strong style={{ color: 'var(--cyan)' }}>B.Tech Computer Science (Data Science)</strong> student at UPES, Dehradun, maintaining a stellar 9.33 CGPA. Currently serving as a <strong style={{ color: 'var(--violet)' }}>Summer Intern at IBM</strong>, where I work on enterprise-scale AI and data science challenges.
              </p>
              <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.8 }}>
                Previously, I was a <strong style={{ color: 'var(--text)' }}>Research Intern at IIT Roorkee</strong>, where I explored the intersection of Neuromorphic Computing and Artificial Intelligence — working with brain-inspired architectures and spiking neural networks. I also completed a software internship at <strong style={{ color: 'var(--amber)' }}>DOI Soft Tech</strong>, gaining hands-on industry experience.
              </p>
              <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.8 }}>
                My passion lies in building intelligent systems that are not just powerful, but also transparent and fair. I&apos;m deeply interested in the frontier of multimodal AI, LLMs, and responsible AI development.
              </p>

              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 11, fontFamily: 'var(--font-h)', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-3)', marginBottom: 12 }}>RESEARCH INTERESTS</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map(i => (
                    <span key={i} style={{ padding: '5px 12px', borderRadius: 6, background: 'var(--violet-dim)', border: '1px solid rgba(139,92,246,0.22)', color: 'var(--violet)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-h)' }}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick info row */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginTop: 8 }}>
                <div style={{ position: 'relative', marginBottom: 0 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--cyan), var(--violet))', borderRadius: '14px 14px 0 0', margin: '-20px -20px 0' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                  {[
                    { label: 'EDUCATION', value: 'UPES · B.Tech CSE (Data Science) · 2023–2027', accent: 'var(--emerald)' },
                    { label: 'CURRENT ROLE', value: 'IBM · Summer Intern · 2026', accent: 'var(--cyan)' },
                    { label: 'PREVIOUS RESEARCH', value: 'IIT Roorkee · Neuromorphic Computing & AI', accent: 'var(--violet)' },
                    { label: 'EMAIL', value: 'mehirsaxena34@gmail.com', accent: 'var(--amber)' },
                  ].map(({ label, value, accent }) => (
                    <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '7px 0', borderBottom: '1px solid var(--border-dim)' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-h)', letterSpacing: '0.08em', flexShrink: 0, paddingTop: 2, minWidth: 100 }}>{label}</span>
                      <span style={{ fontSize: 13, color: accent, fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

/* ── Projects ─────────────────────────────────────────────────────────────── */

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="projects" style={{ padding: 'clamp(60px, 10vw, 100px) 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead
          label="/ PROJECTS"
          title="Selected Work"
          sub="A selection of projects spanning AI fairness, multimodal search, market intelligence, and data analytics."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 80}>
              <div
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${hovered === i ? p.accent : 'var(--border)'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
                  boxShadow: hovered === i ? `0 8px 40px ${p.dim}` : 'none',
                  transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Project screenshot */}
                <div style={{ position: 'relative', height: 200, background: 'var(--surface2)', overflow: 'hidden', borderBottom: `1px solid ${hovered === i ? p.accent : 'var(--border)'}`, transition: 'border-color 0.25s' }}>
                  <img
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.4s ease' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                  />
                  {/* Accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.accent }} />
                  {/* Number badge */}
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '3px 8px', fontFamily: 'var(--font-h)', fontSize: 11, fontWeight: 700, color: p.accent, letterSpacing: '0.08em' }}>
                    {p.num}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 14 }}>
                    <h3 style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 3, lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{p.subtitle}</p>
                  </div>

                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, flex: 1, marginBottom: 18 }}>{p.desc}</p>

                  <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ padding: '3px 10px', borderRadius: 5, background: p.dim, border: `1px solid ${p.accent}30`, color: p.accent, fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-h)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: p.accent, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-h)', textDecoration: 'none', letterSpacing: '0.03em', transition: 'gap 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '6px' }}
                  >
                    <GithubIcon /> View on GitHub <ExternalIcon />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Skills ───────────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(60px, 10vw, 100px) 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label="/ SKILLS" title="Technical Skills" sub="Tools, languages, and frameworks I work with regularly." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 80}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 12, color: cat.accent, letterSpacing: '0.1em' }}>
                    {cat.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.list.map(skill => (
                    <span
                      key={skill}
                      style={{ padding: '5px 11px', borderRadius: 7, background: cat.dim, border: `1px solid ${cat.accent}25`, color: 'var(--text)', fontSize: 13, fontWeight: 500, transition: 'all 0.2s', cursor: 'default' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = cat.accent; (e.currentTarget as HTMLElement).style.borderColor = cat.accent + '60' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; (e.currentTarget as HTMLElement).style.borderColor = cat.accent + '25' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Experience ───────────────────────────────────────────────────────────── */

function Experience() {
  return (
    <section id="experience" style={{ padding: 'clamp(60px, 10vw, 100px) 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionHead label="/ EXPERIENCE" title="Journey So Far" sub="From campus to cutting-edge industry — a chronological record." />

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 23, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, var(--emerald), var(--violet), var(--amber), var(--cyan))', opacity: 0.35 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ display: 'flex', gap: 28, position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, width: 47, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: exp.current ? exp.accent : 'var(--surface2)', border: `2.5px solid ${exp.accent}`, position: 'relative', boxShadow: exp.current ? `0 0 14px ${exp.accent}90` : 'none', transition: 'all 0.3s' }}>
                      {exp.current && (
                        <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${exp.accent}`, opacity: 0.5, animation: 'float 2.5s ease-in-out infinite' }} />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{ background: 'var(--surface)', border: `1px solid ${exp.current ? exp.accent + '40' : 'var(--border)'}`, borderRadius: 14, padding: 22, flex: 1, transition: 'border-color 0.3s' }}>
                    {exp.current && (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: exp.accent, borderRadius: '14px 14px 0 0', opacity: 0.8 }} />
                    )}
                    <div className="flex flex-wrap items-start justify-between gap-2" style={{ marginBottom: 10 }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 2 }}>{exp.role}</h3>
                        <p style={{ fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 14, color: exp.accent }}>{exp.org}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {exp.current && (
                          <span style={{ padding: '2px 10px', borderRadius: 100, background: 'var(--cyan-dim)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--cyan)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-h)', letterSpacing: '0.07em' }}>
                            CURRENT
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-h)', whiteSpace: 'nowrap' }}>{exp.period}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>{exp.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)',
    fontSize: 15, fontFamily: 'var(--font-b)', outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: 'clamp(60px, 10vw, 100px) 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead label="/ CONTACT" title="Get In Touch" sub="Have an opportunity or just want to chat? My inbox is always open." />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['name', 'email', 'message'].map(field => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-h)', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 8 }}>
                    {field === 'name' ? 'YOUR NAME' : field === 'email' ? 'EMAIL ADDRESS' : 'MESSAGE'}
                  </label>
                  {field === 'message' ? (
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about the opportunity or project..."
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--cyan)' }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)' }}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      value={form[field as 'name' | 'email']}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--cyan)' }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)' }}
                    />
                  )}
                </div>
              ))}
              {sent && (
                <div style={{ padding: '12px 16px', background: 'var(--emerald-dim)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, color: 'var(--emerald)', fontSize: 14, fontWeight: 500 }}>
                  Message received! I&apos;ll get back to you soon.
                </div>
              )}
              <button
                type="submit"
                style={{ background: 'var(--cyan)', color: '#000', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '0.03em', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(6,182,212,0.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.3)' }}
              >
                Send Message
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <h3 style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 22, color: 'var(--text)', marginBottom: 8 }}>Let&apos;s Connect</h3>
                <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>
                  I&apos;m open to internship opportunities, research collaborations, and interesting project discussions. Whether you have a question or just want to say hi — I&apos;d love to hear from you.
                </p>
              </div>
              {[
                { icon: <GithubIcon />, label: 'GitHub', href: 'https://github.com/MehirSaxena736', sub: 'MehirSaxena736' },
                { icon: <LinkedinIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehirs', sub: 'linkedin.com/in/mehirs' },
                { icon: <MailIcon />, label: 'Email', href: 'mailto:mehirsaxena34@gmail.com', sub: 'mehirsaxena34@gmail.com' },
              ].map(({ icon, label, href, sub }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s', color: 'var(--text-2)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--cyan)'; el.style.color = 'var(--cyan)'; el.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-2)'; el.style.transform = 'translateX(0)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 18, color: 'var(--cyan)' }}>Mehir Saxena</span>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 3 }}>Data Science &amp; AI Enthusiast</p>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-3)' }}>&copy; {new Date().getFullYear()} Mehir Saxena. Built with React &amp; Vite.</p>
        <div className="flex gap-4">
          {[
            { href: 'https://github.com/MehirSaxena736', icon: <GithubIcon /> },
            { href: 'https://www.linkedin.com/in/mehirs', icon: <LinkedinIcon /> },
            { href: 'mailto:mehirsaxena34@gmail.com', icon: <MailIcon /> },
          ].map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-3)', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--cyan)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ── App ──────────────────────────────────────────────────────────────────── */

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-b)' }}>
      <Navbar theme={theme} toggle={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
