"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 对话式首页
export default class Home2Screen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { mode: 'learn', draft: '' };
  }
  renderVals() {
    var self: any = this;
    var mode: any = this.state.mode;
    var MODES: any = [{ id: 'work', label: '工作' }, { id: 'learn', label: '学习' }, { id: 'practice', label: '陪练' }];
    var CHIPS: any = {
      work: [['写方案', '#1B2A4A', '帮我写一份方案：'], ['回复邮件', '#1B2A4A', '帮我回复这封邮件：'], ['做课程大纲', '#1B2A4A', '帮我设计课程大纲：'], ['分析数据', '#1B2A4A', '帮我分析这份数据：'], ['制作 PPT', '#1B2A4A', '帮我做一份 PPT：'], ['准备会议', '#1B2A4A', '帮我准备明天的会议：']],
      learn: [['3 分钟视频', '#1F4E8C', '用 3 分钟视频讲清楚：'], ['通勤播客', '#5B3FA0', '做成 6 分钟双人对谈播客：'], ['图文速读', '#B26F12', '做成 5 张图文卡片：'], ['闪卡复习', '#8A2B1F', '把本周新经验做成闪卡'], ['案例拆解', '#B26F12', '拆解这份案例：'], ['苏格拉底问答', '#1E6464', '不要给答案，用提问帮我想清楚：']],
      practice: [['客户谈判', '#1F5E43', '扮演食品企业采购经理，和我谈价格'], ['IT 安全答辩', '#1F5E43', '扮演半导体客户 IT 总监，问我数据安全问题'], ['演讲彩排', '#1F5E43', '听我讲 3 分钟方案开场，并点评'], ['报价沟通', '#1F5E43', '模拟一次报价电话']]
    };
    var PH: any = {
      work: '今天帮你做些什么？@ 添加上下文，/ 调用技能',
      learn: '想学什么？说一个问题、贴一段材料，或 @ 今天的任务。/ 选择学习模式',
      practice: '想练什么场景？例如：扮演半导体客户的 IT 总监，问我数据安全问题'
    };
    var modes: any = MODES.map(function (m: any) {
      var on: any = m.id === mode;
      return { label: m.label, sel: on ? 'true' : 'false', bg: on ? '#FFFFFF' : 'transparent', shadow: on ? '0 1px 4px rgba(27,42,74,0.14)' : 'none', weight: on ? '700' : '500', pick: function () { self.setState({ mode: m.id, draft: '' }); } };
    });
    var chips: any = CHIPS[mode].map(function (c: any) {
      return { label: c[0], dot: c[1], use: function () { self.setState({ draft: c[2] }); } };
    });
    var recos: any = [
      { k: '听', bg: '#EEEAF8', fg: '#5B3FA0', title: '通勤路上听：数据安全三句话', meta: '播客 · 6 分钟 · 来自今天的卡塔尔方案' },
      { k: '看', bg: '#E3ECF6', fg: '#1F4E8C', title: '离职员工的数据该保留多久？', meta: '视频 · 3 分钟 · 来自昨天卡住的问题' },
      { k: '练', bg: '#E3F1EA', fg: '#1F5E43', title: '陪练：IT 总监的五个问题', meta: '语音陪练 · 10 分钟 · 下午 15:00 有客户会议' },
      { k: '测', bg: '#FBE9E6', fg: '#8A2B1F', title: '复习本周 4 条新经验', meta: '闪卡 · 2 分钟 · 按遗忘曲线今天到期' }
    ];
    return {
      modes: modes,
      chips: chips,
      placeholder: PH[mode],
      slashLabel: mode === 'work' ? '调用技能' : (mode === 'learn' ? '学习模式' : '陪练角色'),
      sendHref: mode === 'work' ? '/task' : (mode === 'learn' ? '/session' : '/coach'),
      draft: this.state.draft,
      onDraft: function (e: any) { self.setState({ draft: e.target.value }); },
      recos: recos
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "88px 40px 40px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: "820px", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
            <h1 style={{ margin: "0", fontSize: "36px", fontWeight: "700", textAlign: "center" }}>Yu，今天想做点什么？</h1>
            <div role="tablist" aria-label="模式" style={{ display: "flex", gap: "4px", background: "#F1F2EF", borderRadius: "14px", padding: "4px" }}>
              {v.modes.map((m: any, i0: number) => (
                <button key={i0} type="button" role="tab" aria-selected={m.sel} onClick={m.pick} style={{ height: "40px", padding: "0 18px", borderRadius: "10px", border: "none", background: m.bg, boxShadow: m.shadow, color: "#1B2A4A", font: "inherit", fontSize: "15px", fontWeight: m.weight, cursor: "pointer" }}>
                  {m.label}
                </button>
              ))}
            </div>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "flex-start" }}>
              {v.chips.map((c: any, i0: number) => (
                <button key={i0} type="button" onClick={c.use} style={{ height: "38px", padding: "0 16px", borderRadius: "999px", border: "1px solid #DCE0DA", background: "#F7F8F5", color: "#1B2A4A", font: "inherit", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.dot }} />
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{ width: "100%", border: "1px solid #DCE0DA", borderRadius: "22px", background: "#FFFFFF", boxShadow: "0 8px 28px rgba(27,42,74,0.08)", padding: "18px 18px 12px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "10px" }}>
              <label htmlFor="ask" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>输入你的需求</label>
              <textarea id="ask" rows={3} placeholder={v.placeholder} value={v.draft} onChange={v.onDraft} style={{ border: "none", outline: "none", resize: "none", font: "inherit", fontSize: "16px", lineHeight: "1.7", color: "#1B2A4A", background: "transparent" }}></textarea>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <button type="button" aria-label="添加文件或资料" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "none", background: "transparent", color: "#1B2A4A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </button>
                <span style={{ fontSize: "13px", padding: "5px 12px", borderRadius: "999px", background: "#EEF1F6" }}>@ 今日任务</span>
                <span style={{ fontSize: "13px", padding: "5px 12px", borderRadius: "999px", background: "#E6F2EC", color: "#1F5E43" }}>{"/ "}{v.slashLabel}</span>
                <span style={{ flex: "1" }} />
                <label htmlFor="dur" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>时长</label>
                <select defaultValue="15 分钟" id="dur" style={{ height: "36px", border: "none", background: "#F4F5F2", borderRadius: "10px", padding: "0 10px", font: "inherit", fontSize: "13px", color: "#1B2A4A" }}>
                  <option>5 分钟</option>
                  <option>15 分钟</option>
                  <option>30 分钟</option>
                  <option>不限</option>
                </select>
                <button type="button" aria-label="语音输入" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "none", background: "transparent", color: "#1B2A4A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                  </svg>
                </button>
                <Link href={v.sendHref} aria-label="发送" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1B2A4A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", gap: "18px", flexWrap: "wrap", fontSize: "13px", color: "#5B6577", padding: "0 8px" }}>
              <span>学习路径：企业培训解决方案顾问</span>
              <span>形式：按场景自动推荐</span>
              <span>权限：只读授权数据</span>
            </div>
            <section aria-labelledby="reco-h" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", marginTop: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 id="reco-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>从今天的工作中，为你准备了这些</h2>
                <Link href="/modes" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>全部学习模式</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "12px" }}>
                {v.recos.map((r: any, i0: number) => (
                  <Link key={i0} href="/session" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", border: "1px solid #E6E8E3", borderRadius: "16px", color: "#1B2A4A", textDecoration: "none", background: "#FFFFFF" }}>
                    <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: r.bg, color: r.fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", flexShrink: "0" }}>
                      {r.k}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.5" }}>{r.title}</span>
                      <span style={{ fontSize: "12px", color: "#5B6577" }}>{r.meta}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <p style={{ margin: "24px 0 0", fontSize: "12px", color: "#7A8496" }}>内容由 AI 生成，请核实重要信息</p>
          </div>
        </main>
      </div>
    );
  }
}
