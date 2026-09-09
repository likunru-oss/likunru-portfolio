import { useEffect, useRef, useState } from 'react'

// 每秒自更新的时钟独立成小组件，避免整棵 Hero 每秒重渲染
function HeroClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <>
      <span className="label">AI Director · China Standard Time</span>
      <span className="label">{date}</span>
    </>
  )
}

// hero-band 区域的时间显示，独立自管 setInterval
function BandTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="value">{now.toLocaleTimeString('en-US', { hour12: false })}</span>
}

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3, 2, 1]
  return (
    <div className="barcode" aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} style={{ width: w === 3 ? 2 : w === 2 ? 3 : 1, height: w === 3 ? '100%' : w === 2 ? '80%' : '65%' }} />
      ))}
    </div>
  )
}

export default function Hero({ soundOn, onSoundBlocked }) {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [away, setAway] = useState(false)
  // 视频是否已开始加载（intro 结束后才拉流，避免 4MB 视频抢首屏带宽）
  const didStartRef = useRef(false)
  // startVideo 由一次性事件/定时器触发，用 ref 读取最新开关状态
  const soundRef = useRef(soundOn)
  soundRef.current = soundOn
  const blockedRef = useRef(onSoundBlocked)
  blockedRef.current = onSoundBlocked

  const startVideo = () => {
    if (didStartRef.current) return
    didStartRef.current = true
    const v = videoRef.current
    if (!v) return
    v.src = '/assets/showreel.mp4'
    v.load()
    v.muted = !soundRef.current
    const p = v.play()
    if (p)
      p.catch(() => {
        // 浏览器拦截有声自动播放 → 静音重试，并同步回 UI 状态
        if (!v.muted) {
          v.muted = true
          v.play().catch(() => {})
          blockedRef.current?.()
        }
      })
  }

  // 开场动画结束后才加载视频；4s 兜底（如 reduced-motion 下 MotionFX 不跑）
  useEffect(() => {
    window.addEventListener('fx-intro-done', startVideo)
    const t = window.setTimeout(startVideo, 4000)
    return () => {
      window.removeEventListener('fx-intro-done', startVideo)
      window.clearTimeout(t)
    }
  }, [])

  // 滚动离开 Hero 达 2/3 时标记 away（用于停止播放）。
  // scroll 高频触发 → rAF 节流，避免每次滚动都强制同步 layout
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let rafId = 0
    const update = () => {
      rafId = 0
      const r = el.getBoundingClientRect()
      const passed = -r.top
      const ratio = r.height > 0 ? passed / r.height : 1
      setAway(ratio >= 2 / 3)
    }
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // 根据 声音开关 + 是否离开 2/3 控制播放/暂停/静音（视频未开始加载时跳过）
  useEffect(() => {
    const v = videoRef.current
    if (!v || !didStartRef.current || !v.src) return
    if (away) {
      v.pause()
      return
    }
    v.muted = !soundOn
    const p = v.play()
    if (p) p.catch(() => {})
  }, [away, soundOn])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-stage">
        <video
          className="hero-video"
          ref={videoRef}
          poster="/assets/hero-poster.jpg"
          loop
          muted
          playsInline
          preload="none"
        />
        <div className="hero-scrim" />
        <div className="hero-top-bar">
          <HeroClock />
        </div>
        <div className="hero-center">
          <h1 className="hero-name mega-title lower">
            kun<span className="reg">®</span>
          </h1>
          <p className="hero-tagline">
            李坤儒 is a <span className="serif-italic">director</span> with a passion for
            <span className="serif-italic"> cinematic imagery</span> and <span className="serif-italic">advanced AI</span> systems.
          </p>
        </div>
      </div>
      <div className="hero-band">
        <div className="gradient-wave" />
        <div className="wave-noise" />
        <div className="hero-band-grid">
          <div className="band-cell">
            <BandTime />
            <span className="value muted">Beijing · CN</span>
          </div>
          <div className="band-cell" style={{ alignItems: 'center' }}>
            <Barcode />
            <span className="value muted">Official Mark of Authenticity ©2026</span>
          </div>
          <div className="band-cell" style={{ alignItems: 'flex-end' }}>
            <span className="value">39.9042° N, 116.4074° E</span>
            <span className="value muted">Open to worldwide collaboration</span>
          </div>
        </div>
      </div>
    </section>
  )
}
