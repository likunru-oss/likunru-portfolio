import { useEffect, useState } from 'react'

const links = [
  { label: '经历', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

export default function Navbar({ soundOn, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let rafId = 0
    const update = () => {
      rafId = 0
      setScrolled(window.scrollY > 40)
    }
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="logo">CV—'26</a>
        <div className="nav-center label">Curriculum Vitae of an AI Director</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`sound-toggle ${soundOn ? 'on' : ''}`}
            onClick={onToggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? '关闭视频声音' : '开启视频声音'}
          >
            {soundOn ? '[ SOUND ON ]' : '[ SOUND OFF ]'}
          </button>
          <a href="#contact" className="nav-cta">联系我</a>
        </div>
      </div>
    </nav>
  )
}
