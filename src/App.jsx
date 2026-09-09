import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import MotionFX from './components/MotionFX'

// WebGL 背景较重（ogl + shader），懒加载使其不进首屏主 bundle；
// 载入前由 .grainient-bg 的纯色兜底，首帧渲染不被阻塞
const Grainient = lazy(() => import('./components/Grainient'))

function App() {
  // 默认开声：若浏览器拦截有声自动播放，Hero 会回退静音并回调改回 false
  const [soundOn, setSoundOn] = useState(true)

  return (
    <>
      {/* 全站 WebGL 动态颗粒背景（Grainient），暗色克制向参数；容器常驻提供兜底色 */}
      <div className="grainient-bg" aria-hidden="true">
        <Suspense fallback={null}>
          <Grainient
            color1="#FF9FFC"
            color2="#000000"
            color3="#384369"
            timeSpeed={0.2}
            colorBalance={0.08}
            warpStrength={0.7}
            warpFrequency={6}
            warpSpeed={1.4}
            warpAmplitude={48}
            blendAngle={18}
            blendSoftness={0.3}
            rotationAmount={300}
            noiseScale={2.4}
            grainAmount={0.3}
            grainScale={2.2}
            grainAnimated
            contrast={1.25}
            gamma={0.92}
            saturation={0.75}
            zoom={1.05}
          />
        </Suspense>
      </div>
      <Navbar soundOn={soundOn} onToggleSound={() => setSoundOn((v) => !v)} />
      <main>
        <Hero soundOn={soundOn} onSoundBlocked={() => setSoundOn(false)} />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
      <MotionFX />
    </>
  )
}

export default App
