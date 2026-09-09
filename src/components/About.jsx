const contacts = [
  { label: 'Phone', value: '15668318553', href: 'tel:15668318553' },
  { label: 'Email', value: 'likunru@vip.qq.com', href: 'mailto:likunru@vip.qq.com' },
  { label: 'WeChat', value: '15668318553' },
  { label: 'Location', value: 'Beijing, CN' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">[01] Background</p>
          <h2 className="section-title">个人经历</h2>
        </div>
        <div className="about-grid">
          <div className="about-image-wrap">
            <img src="/assets/person.jpg" alt="李坤儒" className="about-image" loading="lazy" />
            <div className="about-image-label label">AI Director · 李坤儒</div>
          </div>
          <div className="about-body">
            <p>
              在真实影像与 <span className="serif-italic">AI 生成</span> 的交界处，做有温度的创作者。
            </p>
            <p>
              山东艺术学院影视摄影与制作专业毕业，主修导演基础、电影摄影、灯光设计与色彩叙事。
              从院线电影、古装网剧到商业 TVC，先后担任导演、执行导演、摄影指导与灯光指导，
              积累了丰富的实拍与团队协作经验。
            </p>
            <p>
              近两年专注于 AIGC 与影视创作结合：以 Seedance、Image2 等 AI 工具完成角色设定、
              场景生成与镜头渲染，将制作周期从传统 15 天缩短至 7 天，同时保持电影化视觉质感。
              曾服务华为、KFC、Rokid、富士、凯乐石、首农发展等品牌。
            </p>
            <div className="about-meta">
              {contacts.map((c) => (
                <div key={c.label} className="meta-row">
                  <span className="meta-label">[{c.label}]</span>
                  {c.href ? (
                    <a className="meta-value" href={c.href}>{c.value}</a>
                  ) : (
                    <span className="meta-value">{c.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
