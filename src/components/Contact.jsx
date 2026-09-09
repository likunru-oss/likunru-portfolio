const contacts = [
  { label: 'Phone', value: '15668318553', href: 'tel:15668318553' },
  { label: 'Email', value: 'likunru@vip.qq.com', href: 'mailto:likunru@vip.qq.com' },
  { label: '更多作品', value: '百度网盘 ↗', href: 'https://pan.baidu.com/s/1AWlfrOfo7UQpiOXE8Pud3Q?pwd=IN7S' },
  { label: 'Showreel', value: '新片场', href: 'https://www.xinpianchang.com/a13741396?channel=copyLink&from=webShare' },
]

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

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-bg">
        <img src="/assets/contact-bg.jpg" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="contact-gradient" />
      <div className="contact-inner">
        <div>
          <p className="label" style={{ marginBottom: 18 }}>[04] Let's Collaborate</p>
          <h2 className="contact-title">
            期待与你<br />共创下一部作品
          </h2>
          <p className="contact-subtitle">
            AI 导演 · 摄影指导 · 品牌内容创作。无论是商业 TVC、AI 生成短片还是电影项目，欢迎随时联系。
          </p>
          <div className="contact-meta">
            {contacts.map((c) => (
              <div key={c.label} className="contact-cell">
                <span className="meta-label">[{c.label}]</span>
                {c.href ? (
                  <a className="meta-value" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noreferrer' : undefined}>{c.value}</a>
                ) : (
                  <span className="meta-value">{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="contact-footer">
          <Barcode />
          <span>© 2026 李坤儒 · AI Director / DoP</span>
          <span>Made with React + Vite</span>
        </div>
      </div>
    </section>
  )
}
