// 故障文字特效（等价于 reactbits GlitchText 的视觉语言，纯 CSS 实现）
// 用法：<GlitchText text="作品集" className="archive-title" />
export default function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch ${className}`} data-text={text} aria-label={text}>
      {text}
    </span>
  )
}
