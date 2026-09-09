import { useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import GlitchText from './GlitchText'
import BorderGlow from './BorderGlow'

const RESUME_PDF = '/resume-kunru.pdf'

// 精选项目卡的边缘辉光参数（与站点克制暗色基调一致）
const PROJECT_GLOW = {
  backgroundColor: '#08090b',
  glowColor: '195 95 78',
  borderRadius: 10,
  glowRadius: 34,
  glowIntensity: 1,
  edgeSensitivity: 30,
  coneSpread: 22,
  fillOpacity: 0.45,
  colors: ['#22d3ee', '#a78bfa', '#f472b6'],
}

const featured = [
  {
    id: 'kfc',
    span: 'lg',
    brand: 'KFC × 成都文旅 / 2026',
    title: '肯德基车速取',
    role: 'AI 导演',
    desc: '肯德基"车速取"联手四川文旅吉祥物"安逸熊猫"，主打"车到餐到、不下车、不用等"。独立统筹从创意策划、脚本分镜、AI 生成到配音配乐、后期交付的全流程。',
    image: '/assets/project-kfc.jpg',
    videoUrl: 'https://v.douyin.com/CCMOJmpE6jM/',
  },
  {
    id: 'afu',
    span: 'sm',
    brand: 'AFU 阿芙 / 2026',
    title: '十五分钟装进口袋',
    role: 'AI 导演',
    desc: '把 15 分钟 SPA 装进口袋，通勤、午休、等位的城市微疗愈场景，由 AI 影像一气呵成。',
    image: '/assets/project-afu.jpg',
    videoUrl: 'https://www.xiaohongshu.com/discovery/item/6a82e1cd000000002c00617d?source=webshare&xhsshare=pc_web&xsec_token=ABZUFX9vCA7cC9BE1LnxChtEObWYwvKETcut_y0zCB0Io=&xsec_source=pc_share',
  },
  {
    id: 'huawei',
    span: 'sm',
    brand: 'HUAWEI 华为 / 2026',
    title: '东方栖境',
    role: '摄影指导 / AI 技术支持',
    desc: '华为全屋智能设计大赛山东站先导片。中式框景构图主导电影级光影，让东方栖居美学与全屋智能对话。',
    image: '/assets/project-huawei.jpg',
    videoUrl: 'https://weixin.qq.com/sph/ANUoAcgLRD',
  },
  {
    id: 'rokid',
    span: 'sm',
    brand: 'Rokid 乐奇 / 2026',
    title: '搜奇记',
    role: '执行导演',
    desc: '三年未归的李传奇回乡，以智能眼镜治好村民的土豆。把"科技下乡"讲成一段温情的归乡记。',
    image: '/assets/project-rokid.jpg',
    videoUrl: 'https://weixin.qq.com/sph/ASI6opxhXQ',
  },
  {
    id: 'heaven',
    span: 'sm',
    brand: '黑色幽默 AI 短片 / 2026',
    title: '天堂办事处',
    role: 'AIGCer',
    desc: '本该圣洁的天堂雾霾遍布、破败压抑；主人公因最后一个行为是乱扔垃圾被判下放地狱，却发现地狱"严苛刑罚"竟是上四休三不加班。',
    image: '/assets/project-heaven.jpg',
    videoUrl: 'https://www.xinpianchang.com/a13754190?from=webShare&channel=copyLink',
  },
  {
    id: 'entropy',
    span: 'sm',
    brand: '大学生 AI 艺术季 × 生数 Vidu / 2026',
    title: '熵减',
    role: 'AIGCer',
    desc: '2026 大学生 AI 艺术季 × 生数 Vidu AI 影像黑客松 三等奖作品。',
    image: '/assets/project-entropy.jpg',
    videoUrl: 'https://pan.baidu.com/s/1ymnbA_r_aZCNz2TcAHcKBg?pwd=rnpq',
  },
  {
    id: 'fujifilm',
    span: 'sm',
    brand: 'Fujifilm 富士 / 2025',
    title: '城市漫游者',
    role: '摄影指导',
    desc: '富士拍立得新品宣传片。定格重庆山城的人文景观，把时间凝固在一张立刻显影的相纸里。',
    image: '/assets/project-fuji.jpg',
    videoUrl: 'https://www.xinpianchang.com/a13344095?from=webShare&channel=copyLink',
  },
  {
    id: 'hirono',
    span: 'lg',
    brand: 'POP MART 泡泡玛特 / 2026',
    title: '小野 Hirono · 冒险家的故事',
    role: '摄影指导',
    desc: '小时候背着家人偷偷把床单披在身上，就变成了披着战袍的冒险家。长大后，在生命这艘船的甲板上，换好水手的衣服，就必须拥有直面风暴的勇气。',
    image: '/assets/project-hirono.jpg',
    videoUrl: 'https://www.xinpianchang.com/a13417511?from=webShare&channel=copyLink',
  },
]

// 精选之外仍保留卡片的两支：凯乐石 / Peng Peng
const more = [
  {
    id: 'kailas',
    brand: 'Kailas 凯乐石 / 2025',
    title: '想象力',
    role: '摄影指导',
    desc: '深入吐鲁番腹地，从中国矿脉获取灵感，研发凯乐石"矿凝紫"配色。',
    image: '/assets/project-kailas.jpg',
    videoUrl: 'https://www.xiaohongshu.com/discovery/item/67ebebfc000000001d038947?source=webshare&xhsshare=pc_web&xsec_token=ABC6YgXtXarhP0XMDHTci8Qsx6Yg6z0CTyAuJylPCnKDQ=&xsec_source=pc_share',
  },
  {
    id: 'pengpeng',
    brand: 'Davebella 戴维贝拉 / 2024',
    title: 'Peng Peng 羽绒',
    role: '执行导演 / 掌机',
    desc: '以运动视角记录儿童的玩闹时刻，释放儿童天性。',
    image: '/assets/project-pengpeng.jpg',
    videoUrl: '/assets/pengpeng.mp4',
  },
]

// 完整作品履历（按截图双列布局：左列作品 · 左列角色 / 右列作品 · 右列角色）
const resumeRows = [
  [{ w: 'TVC｜Davebella 戴维贝拉《Peng Peng 羽绒》新品广告', r: '执行导演' }, { w: '院线电影《青岛 1919》（影剧备字〔2018〕第 6783 号）', r: '灯光指导' }],
  [{ w: '山东艺术学院电影学院毕业设计《绝命小巷》', r: '执行导演' }, { w: '科力达石化｜广饶科力达石化科技有限公司 集团宣传片', r: '灯光师' }],
  [{ w: '韩国庆熙大学投奖短片《仁人》', r: '执行制片' }, { w: '山东省企业管理研究会｜山东大厦 会议宣传片', r: '灯光师' }],
  [{ w: '绍兴印染 大型企业宣传片', r: '摄影掌机' }, { w: '中国万达集团｜万达宝通轮胎 企业宣传片', r: '灯光师' }],
  [{ w: '腾讯网剧《倾尽天下》', r: '摄影指导' }, { w: '山东艺术学院电影学院投奖短片《长夜将至》', r: '灯光指导' }],
  [{ w: '北京电影学院戏剧影视文学专业投奖短片《碎纸片》', r: '摄影指导' }, { w: '游戏宣传剧《野蛮人 2》', r: '灯光指导' }],
  [{ w: '山东艺术学院电影学院投奖短片《VESTAL》', r: '摄影指导' }, { w: '爆款网剧《重生后鸟哥变锦鲤》', r: '灯光指导' }],
  [{ w: '山东艺术学院传媒学院毕业设计《湖边的秘密》', r: '摄影指导' }, { w: '爆款网剧《胖姐归来》', r: '灯光指导' }],
  [{ w: '中国传媒大学投奖短片《于是我们重返现在》', r: '摄影指导' }, { w: '浙江传媒学院毕设《椿树里的秘密》', r: '灯光指导' }],
  [{ w: '山东艺术学院传媒学院毕业设计《配角》', r: '摄影指导' }, { w: '上海电影学院 MFA 毕业设计《放任性》', r: '灯光指导' }],
  [{ w: '山东艺术学院传媒学院毕业设计《她说》', r: '摄影指导' }, { w: '南京传媒学院投奖短片《心流》', r: '灯光指导' }],
  [{ w: '山东艺术学院戏剧影视导演投奖短片《反与正》', r: '摄影指导' }, { w: '获奖剧情短片《流沙》', r: '灯光指导' }],
  [{ w: '中国传媒大学投奖短片《爱意失衡》', r: '摄影掌机' }, { w: '大型宣传片｜2025 济南大学招生宣传片', r: '灯光指导' }],
  [{ w: '山东艺术学院戏剧影视导演投奖短片《从天而降》', r: '摄影掌机' }, { w: '山东艺术学院传媒学院毕业设计《地下来信》', r: '灯光师' }],
  [{ w: 'TVC｜富士新品拍立得《城市漫步者》', r: '摄影指导' }, { w: '武汉传媒学院毕业设计《东郊有密林》', r: '灯光师' }],
]

// 其余幕后作品：整理为文字，整块跳转完整作品集 PDF
const archiveWorks = [
  { n: '破局·新生', m: '首农发展 / 2025 · 导演' },
  { n: '转身', m: '首农集团 / 2025 · 导演' },
  { n: '档案里的微光', m: '首农发展档案科 / 2025 · 导演' },
  { n: '植光祛痘系列广告', m: '植光 / 2025 · 导演' },
  { n: '青岛 1919', m: '院线电影 / 2023 · 灯光指导' },
]

function Card({ p, featured = false, href, glow = false }) {
  const cls = `project-card ${featured && p.span === 'lg' ? 'featured' : ''}`
  const inner = (
    <>
      <img src={p.image} alt={p.title} className="project-image" loading="lazy" />
      <div className="project-info">
        <p className="project-brand">{p.brand}</p>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-role">{p.role}</p>
        <p className="project-desc">{p.desc}</p>
      </div>
    </>
  )
  const card = href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
  ) : (
    <article className={cls}>{inner}</article>
  )
  if (!glow) return card
  return (
    <BorderGlow
      className={`glow-project-card${p.span === 'lg' ? ' glow-project-card--lg' : ''}`}
      {...PROJECT_GLOW}
    >
      {card}
    </BorderGlow>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)

  // 「更多项目」展开后，新插入的卡片统一做 clip 揭幕，避免生硬出现
  useLayoutEffect(() => {
    if (!showAll) return
    const grid = document.querySelector('#projects .more-grid.is-open')
    const items = grid ? Array.from(grid.children) : []
    if (!items.length) return
    gsap.set(items, { clipPath: 'inset(0 0 100% 0)', y: 26 })
    const delay = gsap.delayedCall(0.18, () => {
      gsap.to(items, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: 'expo.inOut',
        clearProps: 'clipPath,transform',
      })
      // 高度变化后让 ScrollTrigger 重算位置
      gsap.delayedCall(0.9, () => window.dispatchEvent(new Event('resize')))
    })
    return () => {
      delay.kill()
      gsap.killTweensOf(items)
    }
  }, [showAll])

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header compact">
          <p className="section-eyebrow">[02] Selected Works</p>
          <h2 className="section-title">精选项目</h2>
        </div>
        <div className="projects-grid">
          {featured.map((p) => <Card key={p.id} p={p} featured glow href={p.videoUrl} />)}
        </div>
        <div className={`projects-grid more-grid ${showAll ? 'is-open' : ''}`}>
          {showAll && more.map((p) => <Card key={p.id} p={p} href={p.videoUrl} />)}
          {showAll && (
            <a className="archive-card" href={RESUME_PDF} target="_blank" rel="noreferrer">
              <div className="archive-top">
                <p className="archive-eyebrow">[ Extra ] Full Portfolio</p>
                <p className="archive-corner">2020 — 2026</p>
              </div>
              <GlitchText className="archive-title" text="作品集" />
              <p className="archive-hint">点击任意处 · 可转跳完整作品集 PDF ↗</p>
              <ul className="archive-list">
                {archiveWorks.map((w, i) => (
                  <li key={w.n}>
                    <span className="al-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="al-name">{w.n}</span>
                    <span className="al-meta">{w.m}</span>
                  </li>
                ))}
              </ul>
              <div className="archive-resume">
                <p className="archive-resume-eyebrow">[ Resume ] Complete Project History · 2020—2026</p>
                <div className="archive-resume-grid">
                  {resumeRows.map((row, i) => (
                    <div className="ar-row" key={i}>
                      <div className="ar-cell">
                        <span className="ar-work">{row[0].w}</span>
                        <span className="ar-role">{row[0].r}</span>
                      </div>
                      <div className="ar-cell">
                        <span className="ar-work">{row[1].w}</span>
                        <span className="ar-role">{row[1].r}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="archive-more">更多请查看 PDF 作品集 ↗</p>
              <div className="archive-foot">
                <span>导演 · 摄影指导 · 灯光 · AIGC</span>
                <span>KUNRU LI © 2026</span>
              </div>
            </a>
          )}
        </div>
        <div className="more-toggle-wrap">
          <button className="more-toggle" onClick={() => setShowAll((v) => !v)}>
            {showAll ? '收起 ↑' : '更多项目 ↓'}
          </button>
        </div>
      </div>
    </section>
  )
}
