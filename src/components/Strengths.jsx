import BorderGlow from './BorderGlow'

const GLOW = {
  backgroundColor: '#0a0b0d',
  glowColor: '205 95 78',
  borderRadius: 12,
  glowRadius: 36,
  glowIntensity: 1,
  edgeSensitivity: 32,
  coneSpread: 22,
  fillOpacity: 0.35,
  colors: ['#22d3ee', '#818cf8', '#c084fc'],
}

const strengths = [
  {
    title: '导演能力',
    items: [
      '广告 TVC 全流程策划',
      '剧情片叙事设计',
      '现场团队调度',
      '视觉风格把控',
      '用户洞察与热点选题',
    ],
  },
  {
    title: '摄影灯光',
    items: [
      '电影化构图设计',
      '运动镜头调度',
      '情绪光影塑造',
      '自然主义 / 风格化灯光',
      'ARRI / Sony / RED / Blackmagic',
    ],
  },
  {
    title: 'AI & 后期',
    items: [
      'AIGC 内容创作',
      'Seedance / Image2 工作流',
      'AI 视觉元素与实拍融合',
      'Final Cut Pro 剪辑',
      '达芬奇调色',
    ],
  },
  {
    title: '综合协作',
    items: [
      '跨部门协作沟通',
      '高强度项目统筹',
      '20–30 人摄制团队管理',
      '品牌内容商业化落地',
      '项目交付率 100%',
    ],
  },
]

const awards = [
  '2026 大学生 AI 艺术季 × 生数 Vidu AI 影像黑客松 · 三等奖',
  '2024 洛杉矶独立电影节 · 最佳学生影片 获奖',
  '2025 东京国际短片节 · 最佳学生影片 入围',
  '2025 英国电影奖 · 最佳学生影片 提名',
  '2025 INDIE SHORT FEST · 最佳剧情片 提名',
  '2025 纽约国际电影奖 · 入围',
  '第十三届中国影视学院奖 · 一等奖',
  '第十七届中国好创意全国数字艺术设计大赛 · 国赛一等奖',
  '北京国际电影节 Reel Focus 单元 · 入围',
  '第五届香港国际青年电影节 · 入围',
  '第十二届澳门国际电影节 · 入围',
  '第二届影视工业电影周 · 特约嘉宾',
  '横店影视文化节第九届“文荣奖” · 青年评委',
  '入选（2022）韩国中央大学影展',
]

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="container">
        <div className="section-header compact">
          <p className="section-eyebrow">[03] Strengths</p>
          <h2 className="section-title">个人优势与奖项</h2>
        </div>
        <div className="strengths-grid">
          {strengths.map((s, idx) => (
            <BorderGlow key={s.title} className="strength-card" {...GLOW}>
              <p className="strength-number">0{idx + 1}</p>
              <h3 className="strength-title">{s.title}</h3>
              <ul className="strength-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </BorderGlow>
          ))}
        </div>
        <div className="awards-block">
          <div className="awards-header">
            <h3 className="awards-title">获奖与入围</h3>
            <span className="label">Awards & Nominations</span>
          </div>
          <ul className="awards-list">
            {awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
