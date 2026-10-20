"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 学习模式库
export default class ModesScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { tab: 'modes', filter: '全部', conn: { wx: true, mail: true, cal: true, lms: true, fs: false, dd: false } };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var C: any = { '看': ['#E3ECF6', '#1F4E8C'], '听': ['#EEEAF8', '#5B3FA0'], '读': ['#F8EEDC', '#7A4E0E'], '练': ['#E3F1EA', '#1F5E43'], '测': ['#FBE9E6', '#8A2B1F'], '聊': ['#E2F2F2', '#1E6464'], '组队': ['#EEF1F6', '#1B2A4A'] };
    var M: any = [
      { k: '看', name: 'AI 视频课', desc: '由你的经验卡和复盘自动生成，播放中弹出检查点题目。', tags: ['3–5 分钟', '双语字幕', '可调语速'], fit: '适合：午休 · 本周用了 4 次', href: '/video' },
      { k: '听', name: '通勤播客', desc: '把今天要用的知识做成双人对谈音频，只用耳朵就能学。', tags: ['6 分钟', '离线收听', '推送到微信'], fit: '适合：通勤 · 本周用了 5 次', href: '/session' },
      { k: '读', name: '图文速读卡', desc: '一个知识点 5 张卡片，配图解和要点，可收藏到资料库。', tags: ['2 分钟', '可分享'], fit: '适合：碎片时间', href: '/session' },
      { k: '测', name: '闪卡间隔复习', desc: '按遗忘曲线安排复习，今天该复习的自动排好。', tags: ['间隔重复', '2 分钟'], fit: '适合：等会议 · 今日 4 张到期', href: '/session' },
      { k: '练', name: '情景闯关', desc: '用真实客户异议闯关，答错的题进入明天复习。', tags: ['5 关', 'XP', '排行榜'], fit: '适合：午休 · 本周用了 2 次', href: '/game' },
      { k: '聊', name: '角色扮演陪练', desc: 'AI 扮演客户、领导或评委，结束后逐句点评。', tags: ['语音', '10 分钟', '逐句反馈'], fit: '适合：会前 30 分钟', href: '/coach' },
      { k: '聊', name: '苏格拉底问答', desc: 'AI 不给答案，只连续追问，帮你自己想清楚。', tags: ['深度思考', '15 分钟'], fit: '适合：遇到难题时', href: '/coach' },
      { k: '读', name: '案例拆解', desc: '拆解一份真实方案或课程：好在哪里，改了什么。', tags: ['来自经验库', '20 分钟'], fit: '适合：周末深度学习', href: '/session' },
      { k: '练', name: '限时找错', desc: 'AI 写一份有 5 处问题的方案，90 秒内找出来。', tags: ['90 秒', '竞速'], fit: '适合：碎片时间', href: '/game' },
      { k: '测', name: '每日一题', desc: '每天一道和当天任务相关的题，30 秒完成。', tags: ['30 秒', '连续打卡'], fit: '适合：早上开工前', href: '/assess' },
      { k: '组队', name: '同伴挑战', desc: '和同事组队闯关，比拼本周 XP，互相点评方案。', tags: ['团队', '周榜'], fit: '适合：团队学习', href: '/game' },
      { k: '练', name: '项目制学习', desc: '以一个真实项目为主线边做边学，Agent 全程辅导。', tags: ['2–4 周', '产出作品'], fit: '适合：冲刺 L3', href: '/skills' }
    ];
    var FILTERS: any = ['全部', '看', '听', '读', '练', '测', '聊', '组队'];
    var filters: any = FILTERS.map(function (f: any) {
      var on: any = s.filter === f;
      return { label: f, sel: on ? 'true' : 'false', bg: on ? '#1B2A4A' : '#F1F2EF', fg: on ? '#FFFFFF' : '#1B2A4A', pick: function () { self.setState({ filter: f }); } };
    });
    var items: any = M.filter(function (m: any) { return s.filter === '全部' || m.k === s.filter; }).map(function (m: any) {
      return Object.assign({}, m, { bg: C[m.k][0], fg: C[m.k][1] });
    });
    var TABS: any = [{ id: 'modes', label: '学习模式' }, { id: 'mentors', label: 'AI 导师' }, { id: 'connectors', label: '连接器' }];
    var tabs: any = TABS.map(function (t: any) {
      var on: any = s.tab === t.id;
      return { label: t.label, sel: on ? 'true' : 'false', weight: on ? '700' : '500', fg: on ? '#1B2A4A' : '#7A8496', pick: function () { self.setState({ tab: t.id }); } };
    });
    var mentors: any = [
      { k: '合', bg: '#1F4E8C', name: '合规导师', desc: 'PDPA、ISO 27001、行业法规', tags: ['讲得透', '附法规依据'], stat: '已对话 3 次' },
      { k: '谈', bg: '#2E7D5B', name: '谈判教练', desc: '报价、异议处理、成交推进', tags: ['会刁难你', '逐句点评'], stat: '已对话 5 次' },
      { k: '课', bg: '#B26F12', name: '课程设计导师', desc: 'WSQ 课程、学习目标、评估设计', tags: ['给模板', '案例多'], stat: '已对话 2 次' },
      { k: '讲', bg: '#5B3FA0', name: '演讲表达教练', desc: '方案开场、路演、线上授课', tags: ['语音陪练', '节奏建议'], stat: '新' },
      { k: '思', bg: '#1E6464', name: '思维教练', desc: '苏格拉底式追问，帮你想清楚', tags: ['不给答案', '深度'], stat: '已对话 1 次' },
      { k: '英', bg: '#1B2A4A', name: '商务英语教练', desc: '中东、东南亚客户沟通', tags: ['英式拼写', '邮件润色'], stat: '新' }
    ];
    var CON: any = [
      ['wx', '微', '企业微信', '会议纪要、客户消息'], ['mail', '邮', '邮箱', '客户往来邮件'], ['cal', '历', '日历', '会议前触发会前学习'],
      ['lms', '竹', '九竹教育云 LMS', '课程与学员数据'], ['fs', '飞', '飞书', '文档与多维表格'], ['dd', '钉', '钉钉', '审批与通知']
    ];
    var connectors: any = CON.map(function (c: any) {
      return { cid: 'cn-' + c[0], k: c[1], name: c[2], desc: c[3], on: !!s.conn[c[0]], toggle: function () { var n = Object.assign({}, self.state.conn); n[c[0]] = !n[c[0]]; self.setState({ conn: n }); } };
    });
    return {
      tabs: tabs, isModes: s.tab === 'modes', isMentors: s.tab === 'mentors', isConnectors: s.tab === 'connectors',
      filters: filters, items: items, mentors: mentors, connectors: connectors
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/modes"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "24px 36px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div role="tablist" aria-label="分类" style={{ display: "flex", gap: "24px" }}>
                {v.tabs.map((t: any, i0: number) => (
                  <button key={i0} type="button" role="tab" aria-selected={t.sel} onClick={t.pick} style={{ height: "44px", padding: "0", border: "none", background: "transparent", font: "inherit", fontSize: "20px", fontWeight: t.weight, color: t.fg, cursor: "pointer" }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <label htmlFor="ms" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>搜索</label>
                <input id="ms" type="search" placeholder="搜索模式、导师" style={{ height: "40px", width: "200px", font: "inherit", fontSize: "14px", border: "1px solid #DCE0DA", borderRadius: "10px", padding: "0 12px", boxSizing: "border-box" }} />
                <button type="button" style={{ height: "40px", padding: "0 14px", borderRadius: "10px", border: "1px solid #DCE0DA", background: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "600", color: "#1B2A4A", cursor: "pointer" }}>
                  我的模式
                </button>
              </div>
            </header>
            {v.isModes ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <section aria-label="按时间和场景挑选" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                  <div style={{ border: "1px solid #E6E8E3", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ background: "#EEEAF8", padding: "18px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700" }}>碎片时间</span>
                      <span style={{ fontSize: "12px", color: "#5B3FA0" }}>5 分钟以内</span>
                    </div>
                    <div style={{ padding: "10px 18px 14px", display: "flex", flexDirection: "column" }}>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>闪卡速记 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>3 分钟视频 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>每日一题 ›</Link>
                    </div>
                  </div>
                  <div style={{ border: "1px solid #E6E8E3", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ background: "#E3ECF6", padding: "18px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700" }}>通勤与运动</span>
                      <span style={{ fontSize: "12px", color: "#1F4E8C" }}>只用耳朵</span>
                    </div>
                    <div style={{ padding: "10px 18px 14px", display: "flex", flexDirection: "column" }}>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>双人对谈播客 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>语音问答 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>经验卡朗读 ›</Link>
                    </div>
                  </div>
                  <div style={{ border: "1px solid #E6E8E3", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ background: "#E3F1EA", padding: "18px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700" }}>会前实战</span>
                      <span style={{ fontSize: "12px", color: "#1F5E43" }}>会议前 30 分钟</span>
                    </div>
                    <div style={{ padding: "10px 18px 14px", display: "flex", flexDirection: "column" }}>
                      <Link href="/coach" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>角色扮演陪练 ›</Link>
                      <Link href="/game" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>情景闯关 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>会前速读卡 ›</Link>
                    </div>
                  </div>
                  <div style={{ border: "1px solid #E6E8E3", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ background: "#F8EEDC", padding: "18px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700" }}>深度学习</span>
                      <span style={{ fontSize: "12px", color: "#7A4E0E" }}>周末 · 30 分钟以上</span>
                    </div>
                    <div style={{ padding: "10px 18px 14px", display: "flex", flexDirection: "column" }}>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>案例拆解 ›</Link>
                      <Link href="/session" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>苏格拉底研讨 ›</Link>
                      <Link href="/skills" style={{ minHeight: "34px", display: "flex", alignItems: "center", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>项目制学习 ›</Link>
                    </div>
                  </div>
                </section>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div role="group" aria-label="按学习方式筛选" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {v.filters.map((f: any, i0: number) => (
                      <button key={i0} type="button" aria-pressed={f.sel} onClick={f.pick} style={{ height: "36px", padding: "0 14px", borderRadius: "10px", border: "none", background: f.bg, color: f.fg, font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", background: "#F1F2EF", borderRadius: "10px", padding: "3px", fontSize: "13px" }}>
                    <span style={{ padding: "6px 12px", borderRadius: "8px", background: "#FFFFFF", fontWeight: "700" }}>适合我</span>
                    <span style={{ padding: "6px 12px", color: "#5B6577" }}>最热</span>
                    <span style={{ padding: "6px 12px", color: "#5B6577" }}>最新</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "14px" }}>
                  {v.items.map((it: any, i0: number) => (
                    <article key={i0} style={{ border: "1px solid #E6E8E3", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "12px", background: "#FFFFFF" }}>
                      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                        <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: it.bg, color: it.fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", flexShrink: "0" }}>
                          {it.k}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                          <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>{it.name}</h3>
                          <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.6", color: "#5B6577" }}>{it.desc}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {it.tags.map((tg: any, i1: number) => (
                          <span key={i1} style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "6px", background: "#F1F2EF", color: "#3D4757" }}>{tg}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", paddingTop: "4px" }}>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>{it.fit}</span>
                        <Link href={it.href} style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "10px", background: "#1B2A4A", color: "#FFFFFF", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
                          试一试
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
            {v.isMentors ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ margin: "0", fontSize: "14px", color: "#5B6577" }}>每位导师都读取你的技能图谱和经验库，用不同的专长和风格陪你学。</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "14px" }}>
                  {v.mentors.map((mt: any, i0: number) => (
                    <article key={i0} style={{ border: "1px solid #E6E8E3", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: mt.bg, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", flexShrink: "0" }}>
                          {mt.k}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>{mt.name}</h3>
                          <span style={{ fontSize: "13px", color: "#5B6577" }}>{mt.desc}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {mt.tags.map((tg: any, i1: number) => (
                          <span key={i1} style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "6px", background: "#F1F2EF", color: "#3D4757" }}>{tg}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>{mt.stat}</span>
                        <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "10px", border: "1px solid #DCE0DA", color: "#1B2A4A", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
                          开始对话
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
            {v.isConnectors ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ margin: "0", fontSize: "14px", color: "#5B6577" }}>学习内容从这些工具里的真实工作生成：邮件、会议、文档和课程数据。只读取你授权的部分。</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "14px" }}>
                  {v.connectors.map((cn: any, i0: number) => (
                    <label key={i0} htmlFor={cn.cid} style={{ border: "1px solid #E6E8E3", borderRadius: "18px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}>
                      <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#F1F2EF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", flexShrink: "0" }}>
                        {cn.k}
                      </span>
                      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "700" }}>{cn.name}</span>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>{cn.desc}</span>
                      </span>
                      <input type="checkbox" role="switch" id={cn.cid} checked={cn.on} onChange={cn.toggle} style={{ width: "22px", height: "22px", margin: "0", accentColor: "#2E7D5B" }} />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}
