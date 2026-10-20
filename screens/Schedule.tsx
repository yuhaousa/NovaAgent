"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 定时与触发式学习
export default class ScheduleScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { filter: 'all', on: { a: true, b: true, c: true, d: true, e: false, f: false } };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var C: any = { '听': ['#EEEAF8', '#5B3FA0'], '练': ['#E3F1EA', '#1F5E43'], '测': ['#FBE9E6', '#8A2B1F'], '聊': ['#E2F2F2', '#1E6464'], '读': ['#F8EEDC', '#7A4E0E'] };
    var T: any = [
      { id: 'a', k: '听', name: '通勤播客', desc: '根据今天的任务和昨天卡住的问题，生成 6 分钟双人对谈音频，推送到微信。', trig: 'time', when: '每天 08:15' },
      { id: 'b', k: '练', name: '会前 30 分钟速练', desc: '日历中出现客户会议时，按客户行业生成速读卡 + 10 分钟角色扮演陪练。', trig: 'event', when: '客户会议开始前 30 分钟' },
      { id: 'c', k: '练', name: '午休闯关', desc: '5 关情景闯关，题目来自本周真实客户异议；答错的进入明天复习。', trig: 'time', when: '工作日 12:30' },
      { id: 'd', k: '测', name: '复盘后闪卡', desc: '晚间复盘收下新经验后，自动生成闪卡，按遗忘曲线安排复习。', trig: 'event', when: '晚间复盘完成后' },
      { id: 'e', k: '聊', name: '教练 1 对 1', desc: 'AI 教练带着本周经验变化和测评结果来找你，20 分钟语音。', trig: 'time', when: '每周三 21:00' },
      { id: 'f', k: '读', name: '短板专题', desc: '测评某项能力低于 60 分时，生成一周的专题学习计划。', trig: 'event', when: '测评出现短板时' }
    ];
    var items: any = T.filter(function (t: any) {
      var on: any = !!s.on[t.id];
      return s.filter === 'all' || (s.filter === 'on' && on) || (s.filter === 'off' && !on) || (s.filter === 'event' && t.trig === 'event');
    }).map(function (t: any) {
      var on: any = !!s.on[t.id];
      return Object.assign({}, t, {
        cid: 'sw-' + t.id, on: on, bg: C[t.k][0], fg: C[t.k][1],
        trigType: t.trig === 'event' ? '事件触发 ·' : '定时 ·',
        trigFg: t.trig === 'event' ? '#5B3FA0' : '#1F5E43',
        status: on ? '已启用' : '已暂停', stFg: on ? '#1F5E43' : '#7A8496',
        cardBg: on ? '#FFFFFF' : '#FAFAF8', titleFg: on ? '#1B2A4A' : '#5B6577',
        toggle: function () { var n = Object.assign({}, self.state.on); n[t.id] = !n[t.id]; self.setState({ on: n }); }
      });
    });
    var total: any = T.length, onN = T.filter(function (t: any) { return !!s.on[t.id]; }).length, evN = T.filter(function (t: any) { return t.trig === 'event'; }).length;
    var filters: any = [['all', '全部 (' + total + ')'], ['on', '已启用 (' + onN + ')'], ['off', '已暂停 (' + (total - onN) + ')'], ['event', '事件触发 (' + evN + ')']].map(function (f: any) {
      var sel: any = s.filter === f[0];
      return { label: f[1], sel: sel ? 'true' : 'false', bg: sel ? '#E4E7E1' : 'transparent', pick: function () { self.setState({ filter: f[0] }); } };
    });
    return { items: items, filters: filters };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/schedule"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "24px 36px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", gap: "24px", alignItems: "baseline" }}>
                <h1 style={{ margin: "0", fontSize: "22px", fontWeight: "700" }}>定时学习</h1>
                <Link href="/learn" style={{ fontSize: "20px", fontWeight: "500", color: "#7A8496", textDecoration: "none" }}>运行记录</Link>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" style={{ height: "40px", padding: "0 14px", borderRadius: "10px", border: "1px solid #DCE0DA", background: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "600", color: "#1B2A4A", cursor: "pointer" }}>
                  批量管理
                </button>
                <button type="button" style={{ height: "40px", padding: "0 16px", borderRadius: "10px", border: "none", background: "#1B2A4A", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  新建
                </button>
              </div>
            </header>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#F6F3FC", borderRadius: "14px", padding: "14px 18px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B3FA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
              </svg>
              <span style={{ fontSize: "14px", lineHeight: "1.6" }}>学习不只按时间触发，也可以按事件触发：会议开始前、任务完成后、测评出现短板时，自动推送最合适的学法。</span>
            </div>
            <div role="group" aria-label="筛选" style={{ display: "flex", gap: "8px" }}>
              {v.filters.map((f: any, i0: number) => (
                <button key={i0} type="button" aria-pressed={f.sel} onClick={f.pick} style={{ height: "36px", padding: "0 14px", borderRadius: "10px", border: "none", background: f.bg, font: "inherit", fontSize: "14px", fontWeight: "600", color: "#1B2A4A", cursor: "pointer" }}>
                  {f.label}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "14px" }}>
              {v.items.map((t: any, i0: number) => (
                <article key={i0} style={{ border: "1px solid #E6E8E3", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px", background: t.cardBg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "2px 10px", borderRadius: "6px", background: t.bg, color: t.fg }}>{t.k}</span>
                    <h2 style={{ margin: "0", flex: "1", fontSize: "17px", fontWeight: "700", color: t.titleFg }}>{t.name}</h2>
                    <label htmlFor={t.cid} style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>{"启用 "}{t.name}</label>
                    <input type="checkbox" role="switch" id={t.cid} checked={t.on} onChange={t.toggle} style={{ width: "22px", height: "22px", margin: "0", accentColor: "#2E7D5B", cursor: "pointer" }} />
                  </div>
                  <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.7", color: "#5B6577" }}>{t.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #EEF0EC", fontSize: "13px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#3D4757" }}>
                      <span style={{ fontWeight: "700", color: t.trigFg }}>{t.trigType}</span>
                      {t.when}
                    </span>
                    <span style={{ color: t.stFg, fontWeight: "600" }}>{t.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
