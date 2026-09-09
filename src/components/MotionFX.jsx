import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const $ = (s, root = document) => root.querySelector(s)
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s))

const EASE = 'power4.out'
const EASE_SOFT = 'power3.out'

/* —— 文本拆字：每字一遮罩，供逐字进场 —— */
function splitChars(el) {
  if (!el || el.dataset.fxSplit === '1') return
  el.dataset.fxSplit = '1'
  const nodes = Array.from(el.childNodes)
  el.textContent = ''
  const frag = document.createDocumentFragment()
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      for (const ch of node.nodeValue) {
        const mask = document.createElement('span')
        mask.className = 'fx-ch'
        const inner = document.createElement('span')
        inner.className = 'fx-ch-in'
        inner.textContent = ch === ' ' ? '\u00A0' : ch
        mask.appendChild(inner)
        frag.appendChild(mask)
      }
    } else if (node.nodeType === 1 && node.nodeName === 'BR') {
      frag.appendChild(node)
    } else if (node.nodeType === 1) {
      const mask = document.createElement('span')
      mask.className = 'fx-ch'
      const inner = document.createElement('span')
      inner.className = 'fx-ch-in'
      inner.appendChild(node)
      mask.appendChild(inner)
      frag.appendChild(mask)
    }
  })
  el.appendChild(frag)
}

/* —— 整行遮罩：外 overflow hidden + 内可位移 —— */
function wrapLine(el) {
  if (!el || el.dataset.fxLine === '1') return
  el.dataset.fxLine = '1'
  const nodes = Array.from(el.childNodes)
  el.textContent = ''
  const mask = document.createElement('span')
  mask.className = 'fx-mask'
  const mover = document.createElement('span')
  mover.className = 'fx-mover'
  nodes.forEach((n) => mover.appendChild(n))
  mask.appendChild(mover)
  el.appendChild(mask)
}

export default function MotionFX() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overlays = []

    const ctx = gsap.context(() => {
      /* ---------- 1. 首屏 Opening ---------- */
      const overlay = document.createElement('div')
      overlay.className = 'fx-overlay'
      overlay.innerHTML = `
        <div class="fx-panel fx-panel--l"></div>
        <div class="fx-panel fx-panel--r"></div>
        <div class="fx-tag">
          <span class="fx-tag-dot"></span>
          AI DIRECTOR · PORTFOLIO 2026 · KUNRU®
          <span class="fx-tag-dot"></span>
        </div>`
      document.body.appendChild(overlay)
      overlays.push(overlay)

      // 文本结构预处理
      wrapLine($('.hero-name'))
      $$('.section-title').forEach(splitChars)
      splitChars($('.contact-title'))

      // 头像图片包裁切层，供 clip 揭幕 + parallax
      const aboutImg = $('.about-image')
      if (aboutImg) {
        const frame = document.createElement('div')
        frame.className = 'fx-img-frame'
        aboutImg.parentNode.insertBefore(frame, aboutImg)
        frame.appendChild(aboutImg)
      }

      const heroMover = $('.hero-name .fx-mover')
      const heroTop = $('.hero-top-bar')
      const tagline = $('.hero-tagline')
      const video = $('.hero-video')
      const navEls = $$('.navbar-inner > *')

      gsap.set(heroTop, { autoAlpha: 0, y: -18 })
      gsap.set(tagline, { autoAlpha: 0, y: 26 })
      if (heroMover) gsap.set(heroMover, { yPercent: 120 })
      if (video) gsap.set(video, { scale: 1.08 })
      gsap.set(navEls, { autoAlpha: 0, y: -14 })

      const intro = gsap.timeline({ defaults: { ease: EASE } })
      intro
        .fromTo('.fx-tag', { autoAlpha: 0, letterSpacing: '0.3em' }, { autoAlpha: 1, letterSpacing: '0.42em', duration: 0.6, ease: EASE_SOFT }, 0.15)
        .to(video, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0.7)
        .to('.fx-panel--l', { xPercent: -101, duration: 0.95, ease: 'expo.inOut' }, 0.75)
        .to('.fx-panel--r', { xPercent: 101, duration: 0.95, ease: 'expo.inOut' }, 0.75)
        .to('.fx-tag', { autoAlpha: 0, duration: 0.3, ease: EASE_SOFT }, 0.8)
        .to(heroMover, { yPercent: 0, duration: 1.15, ease: EASE }, 0.95)
        .to(heroTop, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE_SOFT }, 1.15)
        .to(tagline, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE_SOFT }, 1.35)
        .to(navEls, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: EASE_SOFT }, 1.45)

      intro.eventCallback('onComplete', () => {
        const el = document.querySelector('.fx-overlay')
        if (el) el.remove()
      })

      /* ---------- 2. 滚动场景 ---------- */

      // 模块眉题 + 大字逐字进场
      const buildHeader = (secId) => {
        const sec = document.getElementById(secId)
        if (!sec) return null
        const titleChars = $$('.section-title .fx-ch-in', sec)
        if (!titleChars.length) return null
        const tl = gsap.timeline({
          defaults: { ease: EASE_SOFT },
          scrollTrigger: { trigger: sec, start: 'top 72%', toggleActions: 'play none none reverse' },
        })
        const eyebrow = $('.section-eyebrow', sec)
        if (eyebrow) tl.from(eyebrow, { y: 26, autoAlpha: 0, duration: 0.6 }, 0)
        tl.from(titleChars, { yPercent: 120, duration: 0.85, stagger: 0.05, ease: EASE }, 0.15)
        return tl
      }

      /* About */
      const aboutSec = document.getElementById('about')
      if (aboutSec) {
        buildHeader('about')
        const grid = $('.about-grid', aboutSec)
        const frame = $('.fx-img-frame', aboutSec)
        if (grid && frame) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
          })
          tl.fromTo(frame, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.0, ease: 'expo.inOut' }, 0)
            .fromTo($$('.about-body > p', grid), { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: EASE_SOFT }, 0.35)
            .fromTo($$('.about-meta .meta-row', grid), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07, ease: EASE_SOFT }, 0.9)
            .eventCallback('onComplete', () => {
              frame.style.clipPath = ''
            })
        }
        // 头像 parallax
        const img = $('.about-image', aboutSec)
        if (frame && img) {
          gsap.fromTo(
            img,
            { yPercent: -5, scale: 1.15 },
            {
              yPercent: 5,
              scale: 1.15,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          )
        }
      }

      /* Projects 精选 8 卡 */
      const projSec = document.getElementById('projects')
      if (projSec) {
        buildHeader('projects')
        const grid = $('.projects-grid', projSec)
        if (grid) {
          const cards = Array.from(grid.children).filter((c) => c.classList.contains('glow-project-card'))
          if (cards.length) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
            })
            cards.forEach((c, i) => {
              const card = $('.project-card', c)
              const img = $('.project-image', c)
              const at = i * 0.11
              tl.fromTo(
                card,
                { clipPath: 'inset(0 0 100% 0)', y: 36 },
                { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.0, ease: 'expo.inOut' },
                at
              )
              if (img) {
                tl.fromTo(img, { scale: 1.09 }, { scale: 1, duration: 1.2, ease: EASE_SOFT }, at + 0.2)
              }
            })
            tl.eventCallback('onComplete', () => {
              cards.forEach((c) => {
                const card = $('.project-card', c)
                const img = $('.project-image', c)
                if (card) card.style.clipPath = ''
                if (img) img.style.transform = ''
              })
            })
          }
        }
      }

      /* Strengths */
      const strSec = document.getElementById('strengths')
      if (strSec) {
        buildHeader('strengths')
        const grid = $('.strengths-grid', strSec)
        if (grid) {
          gsap.fromTo(
            $$(':scope > *', grid),
            { y: 52, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: EASE_SOFT,
              scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
            }
          )
        }
        const awards = $('.awards-block', strSec)
        if (awards) {
          gsap.fromTo(
            awards,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: EASE_SOFT,
              scrollTrigger: { trigger: awards, start: 'top 86%', once: true },
            }
          )
        }
      }

      /* Contact */
      const conSec = document.getElementById('contact')
      if (conSec) {
        const titleChars = $$('.contact-title .fx-ch-in', conSec)
        const label = $('.label', conSec)
        const subtitle = $('.contact-subtitle', conSec)
        const cells = $$('.contact-cell', conSec)
        const footer = $('.contact-footer', conSec)
        if (titleChars.length) {
          const tl = gsap.timeline({
            defaults: { ease: EASE_SOFT },
            scrollTrigger: { trigger: conSec, start: 'top 62%', toggleActions: 'play none none reverse' },
          })
          if (label) tl.from(label, { y: 22, autoAlpha: 0, duration: 0.6 }, 0)
          tl.from(titleChars, { yPercent: 120, duration: 0.9, stagger: 0.06, ease: EASE }, 0.2)
          if (subtitle) tl.from(subtitle, { y: 26, autoAlpha: 0, duration: 0.7 }, 0.8)
          if (cells.length) tl.from(cells, { y: 20, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, 1.0)
          if (footer) tl.from(footer, { autoAlpha: 0, duration: 0.8 }, 1.15)
        }
        const cbg = $('.contact-bg img', conSec)
        if (cbg) {
          gsap.fromTo(
            cbg,
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: { trigger: conSec, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          )
        }
      }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    })

    return () => {
      overlays.forEach((o) => o.remove())
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  return null
}
