"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// AI 教练
export default class CoachScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = {
      mode: 'advice',
      style: 'direct',
      inCall: false,
      draft: '',
      messages: [
        { from: 'coach', text: '晚上好 Yu。今天复盘你收下了 2 条新经验；测评显示合规知识是目前最需要补的一块。想聊点什么？' },
        { from: 'me', text: '下周要见半导体客户的 IT 总监，我担心技术问题答不上来，该怎么准备？' },
        {
          from: 'coach',
          text: '这个担心很正常，IT 总监的问题通常可以提前预判。我建议分三步准备：',
          steps: [
            { title: '开场先讲安全。', body: '按你的经验 L-0231，用“数据在哪、谁能访问、出事怎么办”三句话讲清方案。' },
            { title: '预判 5 个问题。', body: '我根据同类客户整理了最可能被问到的问题，答不上的就标出来，会前找技术同事确认。' },
            { title: '跟我模拟一次。', body: '我扮演 IT 总监，问得比真实会议更刁钻，结束后给你逐句反馈。' }
          ],
          refs: ['经验 L-0231', '测评：合规知识 54', '任务：半导体合规课程'],
          actions: true
        }
      ]
    };
  }
  send(text: any) {
    var t: any = (text || '').trim();
    if (!t) return;
    var msgs: any = this.state.messages.concat([
      { from: 'me', text: t },
      { from: 'coach', text: '收到。我会结合你的经验库、本周任务和测评结果来回答。（原型演示：这里显示 AI 教练的实时回复）' }
    ]);
    this.setState({ messages: msgs, draft: '' });
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var messages: any = s.messages.map(function (m: any) {
      return {
        fromCoach: m.from === 'coach',
        fromMe: m.from === 'me',
        text: m.text,
        tag: m.tag || '',
        steps: m.steps || [],
        hasSteps: !!(m.steps && m.steps.length),
        refs: m.refs || [],
        hasRefs: !!(m.refs && m.refs.length),
        hasActions: !!m.actions
      };
    });
    var modes: any = [
      { id: 'advice', label: '给建议' },
      { id: 'roleplay', label: '模拟陪练' },
      { id: 'reflect', label: '复盘辅导' }
    ].map(function (m: any) {
      var on: any = s.mode === m.id;
      return {
        label: m.label, sel: on ? 'true' : 'false',
        bg: on ? '#1B2A4A' : '#FFFFFF', fg: on ? '#FFFFFF' : '#1B2A4A', border: on ? '#1B2A4A' : '#CDD3DB',
        pick: function () { self.setState({ mode: m.id }); }
      };
    });
    var styles: any = [
      { id: 'direct', label: '直接', desc: '直说问题，给出明确建议' },
      { id: 'gentle', label: '温和', desc: '先肯定，再一起找改进点' },
      { id: 'socratic', label: '提问式', desc: '少给答案，多问问题引导你想' }
    ].map(function (x: any) {
      var on: any = s.style === x.id;
      return Object.assign({}, x, { cid: 'sty-' + x.id, on: on, bg: on ? '#E6F2EC' : 'transparent', pick: function () { self.setState({ style: x.id }); } });
    });
    var suggestions: any = ['帮我准备下周的客户会议', '这周效率不高，怎么调整？', '陪我练一次价格谈判', '怎么把课程卖给更多企业？'].map(function (t: any) {
      return { text: t, send: function () { self.send(t); } };
    });
    return {
      messages: messages,
      modes: modes,
      styles: styles,
      suggestions: suggestions,
      inCall: s.inCall,
      notInCall: !s.inCall,
      toggleCall: function () { self.setState({ inCall: !self.state.inCall }); },
      draft: s.draft,
      onDraft: function (e: any) { self.setState({ draft: e.target.value }); },
      sendDraft: function () { self.send(self.state.draft); },
      startRoleplay: function () {
        self.setState({
          mode: 'roleplay',
          messages: self.state.messages.concat([
            { from: 'coach', tag: '模拟陪练中 · 我扮演 IT 总监', text: '好，开始。我是这家半导体厂的 IT 总监。第一个问题：你们的系统要接入我们的员工数据，账号权限怎么管？离职员工的数据多久删除？' }
          ])
        });
      }
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/modes", "/coach"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "32px 40px 48px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
            <section aria-label="与 AI 教练对话" style={{ flex: "999 1 600px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", padding: "18px 22px", borderBottom: "1px solid #EEF0EC" }}>
                <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#2E7D5B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", flexShrink: "0" }}>
                  教
                </span>
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "2px" }}>
                  <h1 style={{ margin: "0", fontSize: "19px", fontWeight: "700" }}>
                    AI 教练 ·{" "}
                    <Link href="/modes" style={{ fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>换一位导师</Link>
                  </h1>
                  <span style={{ fontSize: "13px", color: "#5B6577" }}>熟悉你的 86 条经验、本周任务和最近一次测评</span>
                </div>
                {v.inCall ? (
                  <button type="button" onClick={v.toggleCall} style={{ height: "44px", padding: "0 16px", borderRadius: "999px", border: "none", background: "#B3402E", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFFFFF" }} />
                    通话中 · 挂断
                  </button>
                ) : null}
                {v.notInCall ? (
                  <button type="button" onClick={v.toggleCall} style={{ height: "44px", padding: "0 16px", borderRadius: "999px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                    语音通话
                  </button>
                ) : null}
              </header>
              <div role="tablist" aria-label="对话模式" style={{ display: "flex", gap: "8px", padding: "14px 22px 0", flexWrap: "wrap" }}>
                {v.modes.map((m: any, i0: number) => (
                  <button key={i0} type="button" role="tab" aria-selected={m.sel} onClick={m.pick} style={{ height: "40px", padding: "0 16px", borderRadius: "999px", border: `1px solid ${m.border}`, background: m.bg, color: m.fg, font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    {m.label}
                  </button>
                ))}
              </div>
              <div aria-live="polite" style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "520px" }}>
                {v.messages.map((msg: any, i0: number) => (
                  <Fragment key={i0}>
                    {msg.fromCoach ? (
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", maxWidth: "88%" }}>
                        <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2E7D5B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", flexShrink: "0" }}>
                          教
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
                          {msg.tag ? (
                            <span style={{ alignSelf: "flex-start", background: "#FBF0DC", color: "#7A4E0E", fontSize: "12px", fontWeight: "700", padding: "2px 10px", borderRadius: "999px" }}>
                              {msg.tag}
                            </span>
                          ) : null}
                          <div style={{ background: "#F5F6F3", borderRadius: "4px 16px 16px 16px", padding: "14px 16px", fontSize: "15px", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span>{msg.text}</span>
                            {msg.hasSteps ? (
                              <ol style={{ margin: "0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                {msg.steps.map((st: any, i1: number) => (
                                  <li key={i1}>
                                    <strong>{st.title}</strong>
                                    {st.body}
                                  </li>
                                ))}
                              </ol>
                            ) : null}
                          </div>
                          {msg.hasRefs ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "12px" }}>
                              <span style={{ color: "#5B6577", padding: "3px 0" }}>参考：</span>
                              {msg.refs.map((rf: any, i1: number) => (
                                <span key={i1} style={{ background: "#EEF1F6", padding: "3px 10px", borderRadius: "6px" }}>{rf}</span>
                              ))}
                            </div>
                          ) : null}
                          {msg.hasActions ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              <button type="button" onClick={v.startRoleplay} style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                                开始模拟对话 · 10 分钟
                              </button>
                              <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                                生成会前准备清单
                              </button>
                              <Link href="/video" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #CDD3DB", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                                先看 4 分钟视频
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {msg.fromMe ? (
                      <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "#1B2A4A", color: "#FFFFFF", borderRadius: "16px 4px 16px 16px", padding: "12px 16px", fontSize: "15px", lineHeight: "1.8" }}>
                        {msg.text}
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #EEF0EC", padding: "14px 22px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {v.suggestions.map((sg: any, i0: number) => (
                    <button key={i0} type="button" onClick={sg.send} style={{ minHeight: "36px", padding: "4px 14px", borderRadius: "999px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "13px", cursor: "pointer" }}>
                      {sg.text}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button type="button" aria-label="按住说话" style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  </button>
                  <label htmlFor="msg" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>输入消息</label>
                  <input id="msg" type="text" placeholder="说说你遇到的问题，或想练习的场景" value={v.draft} onChange={v.onDraft} style={{ flex: "1", minWidth: "0", height: "48px", font: "inherit", fontSize: "15px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "12px", padding: "0 16px", boxSizing: "border-box" }} />
                  <button type="button" onClick={v.sendDraft} style={{ height: "48px", padding: "0 22px", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer", flexShrink: "0" }}>
                    发送
                  </button>
                </div>
              </div>
            </section>
            <aside style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
              <section aria-labelledby="know-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <h2 id="know-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>教练了解的你</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>本周在忙</span>
                  <span style={{ fontSize: "14px", lineHeight: "1.6" }}>卡塔尔机场培训方案 · 半导体合规课程</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>测评短板</span>
                  <span style={{ fontSize: "14px" }}>
                    合规知识{" "}
                    <strong>54</strong>
                    {" "}分
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>今天新收下的经验</span>
                  <span style={{ fontSize: "14px", lineHeight: "1.6" }}>2 条：双语交付、事故案例开场</span>
                </div>
                <span style={{ fontSize: "12px", color: "#5B6577", lineHeight: "1.6", paddingTop: "10px", borderTop: "1px solid #EEF0EC" }}>
                  教练只读取你授权的经验库、任务和测评数据。
                  <Link href="/scenarios" style={{ fontWeight: "600", textDecoration: "none" }}>管理权限</Link>
                </span>
              </section>
              <section aria-labelledby="style-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2 id="style-h" style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "700" }}>教练风格</h2>
                {v.styles.map((sy: any, i0: number) => (
                  <label key={i0} htmlFor={sy.cid} style={{ display: "flex", alignItems: "flex-start", gap: "10px", minHeight: "44px", padding: "8px 10px", borderRadius: "10px", background: sy.bg, cursor: "pointer" }}>
                    <input type="radio" name="cstyle" id={sy.cid} checked={sy.on} onChange={sy.pick} style={{ width: "18px", height: "18px", margin: "3px 0 0", accentColor: "#2E7D5B", flexShrink: "0" }} />
                    <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>{sy.label}</span>
                      <span style={{ fontSize: "12px", color: "#5B6577" }}>{sy.desc}</span>
                    </span>
                  </label>
                ))}
              </section>
              <section style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "16px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#E8A33D", fontWeight: "700" }}>已预约</span>
                <span style={{ fontSize: "15px", fontWeight: "700" }}>每周三 21:00 · 1 对 1 复盘</span>
                <span style={{ fontSize: "13px", color: "#C9D2DF", lineHeight: "1.6" }}>教练会带着本周的经验变化和测评结果来找你，20 分钟。</span>
              </section>
            </aside>
          </div>
        </main>
      </div>
    );
  }
}
