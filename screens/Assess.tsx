"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";
import { tr, trBadge } from "@/lib/i18n/tr";

// 能力测评
export default class AssessScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { view: 'quiz', q: 0, picks: {} };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var QS: any = [
      { skill: '课程设计', text: '为合规课程写学习目标，下面哪一个最可衡量？', options: ['理解数据安全的重要性', '能在 5 分钟内识别邮件中的 3 类数据泄露风险', '全面提升员工的安全意识'] },
      { skill: '客户沟通', text: '客户说预算有限，你的第一步最好是？', options: ['立即主动给出折扣', '询问预算区间和最看重的结果', '推荐最便宜的那一档方案'] },
      { skill: '方案写作', text: '一份给企业客户的提案，第一页最应该放什么？', options: ['公司介绍和发展历程', '客户面临的问题，以及我们能带来的结果', '产品功能截图'] }
    ];
    var q: any = QS[s.q];
    var picked: any = s.picks[s.q];
    var opts: any = q.options.map(function (t: any, i: any) {
      var on: any = picked === i;
      return {
        text: t, cid: 'opt-' + s.q + '-' + i, on: on,
        bg: on ? '#E6F2EC' : '#FFFFFF',
        border: on ? '#2E7D5B' : '#E3E6E1',
        pick: function () {
          var p: any = Object.assign({}, self.state.picks);
          p[self.state.q] = i;
          self.setState({ picks: p });
        }
      };
    });
    var last: any = s.q === QS.length - 1;
    var skills: any = [
      { name: '课程设计', prev: 79, now: 81 },
      { name: '方案写作', prev: 63, now: 72 },
      { name: '客户沟通', prev: 58, now: 65 },
      { name: '合规知识', prev: 55, now: 54 }
    ].map(function (k: any) {
      var d: any = k.now - k.prev;
      return Object.assign({}, k, {
        delta: (d > 0 ? '+' : '') + d,
        deltaFg: d > 0 ? '#1F5E43' : '#8A2B1F',
        color: k.now < 60 ? '#E8A33D' : '#2E7D5B'
      });
    });
    var inQuiz: any = s.view === 'quiz';
    return {
      inQuiz: inQuiz,
      inResult: !inQuiz,
      quizSel: inQuiz ? 'true' : 'false',
      resSel: inQuiz ? 'false' : 'true',
      quizTabBg: inQuiz ? '#1B2A4A' : 'transparent',
      quizTabFg: inQuiz ? '#FFFFFF' : '#1B2A4A',
      resTabBg: inQuiz ? 'transparent' : '#1B2A4A',
      resTabFg: inQuiz ? '#1B2A4A' : '#FFFFFF',
      showQuiz: function () { self.setState({ view: 'quiz' }); },
      showResult: function () { self.setState({ view: 'result' }); },
      q: q,
      qNo: s.q + 1,
      progress: Math.round(((s.q + (picked !== undefined ? 1 : 0)) / QS.length) * 100),
      opts: opts,
      cantNext: picked === undefined,
      nextBg: picked === undefined ? '#9AA8BC' : '#2E7D5B',
      nextLabel: last ? '提交并查看报告' : '下一题',
      next: function () {
        if (last) self.setState({ view: 'result', q: 0, picks: {} });
        else self.setState({ q: self.state.q + 1 });
      },
      skills: skills
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/skills"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>{tr("能力测评")}</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>{tr("每两周一次，题目来自你的真实场景。结果会告诉 Agent 该在哪些任务里多提醒你。")}</p>
              </div>
              <div role="tablist" aria-label={tr("视图")} style={{ display: "flex", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "12px", padding: "4px" }}>
                <button type="button" role="tab" aria-selected={v.quizSel} onClick={v.showQuiz} style={{ height: "40px", padding: "0 16px", borderRadius: "8px", border: "none", background: v.quizTabBg, color: v.quizTabFg, font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  {tr("答题")}
                </button>
                <button type="button" role="tab" aria-selected={v.resSel} onClick={v.showResult} style={{ height: "40px", padding: "0 16px", borderRadius: "8px", border: "none", background: v.resTabBg, color: v.resTabFg, font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  {tr("测评报告")}
                </button>
              </div>
            </header>
            {v.inQuiz ? (
              <section aria-label={tr("答题")} style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "22px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ fontWeight: "700" }}>{tr("第 ")}{tr(v.qNo)}{tr(" / 3 题")}</span>
                    <span style={{ color: "#5B6577" }}>{tr("约 3 分钟 · 不计时")}</span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "4px", background: "#EEF0EC" }}><div style={{ height: "8px", borderRadius: "4px", background: "#2E7D5B", width: `${v.progress}%` }} /></div>
                </div>
                <span style={{ alignSelf: "flex-start", background: "#EEF1F6", fontSize: "13px", fontWeight: "600", padding: "4px 12px", borderRadius: "6px" }}>{tr("能力项：")}{tr(v.q.skill)}</span>
                <h2 style={{ margin: "0", fontSize: "21px", fontWeight: "700", lineHeight: "1.6" }}>{tr(v.q.text)}</h2>
                <fieldset style={{ border: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <legend style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>{trBadge("选项")}</legend>
                  {v.opts.map((o: any, i0: number) => (
                    <label key={i0} htmlFor={o.cid} style={{ display: "flex", alignItems: "center", gap: "14px", minHeight: "56px", padding: "12px 16px", borderRadius: "12px", border: `2px solid ${o.border}`, background: o.bg, fontSize: "16px", lineHeight: "1.6", cursor: "pointer", boxSizing: "border-box" }}>
                      <input type="radio" name="q" id={o.cid} checked={o.on} onChange={o.pick} style={{ width: "20px", height: "20px", margin: "0", accentColor: "#2E7D5B", flexShrink: "0" }} />
                      {" "}{tr(o.text)}{" "}
                    </label>
                  ))}
                </fieldset>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("提交后可以在报告里看到每题解析")}</span>
                  <button type="button" onClick={v.next} disabled={v.cantNext} style={{ height: "48px", padding: "0 24px", borderRadius: "10px", border: "none", background: v.nextBg, color: "#FFFFFF", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                    {tr(v.nextLabel)}
                  </button>
                </div>
              </section>
            ) : null}
            {v.inResult ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <section aria-label={tr("总分")} style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "18px", padding: "28px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "28px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "14px", color: "#C9D2DF" }}>{tr("综合得分 · 10月19日")}</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                      <span style={{ fontSize: "56px", fontWeight: "700", lineHeight: "1" }}>74</span>
                      <span style={{ fontSize: "16px", color: "#E8A33D", fontWeight: "700" }}>{tr("比上次 +6")}</span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "15px", lineHeight: "1.7", color: "#E6EBF2" }}>
                    <span style={{ fontWeight: "700", color: "#FFFFFF" }}>{tr("AI 诊断")}</span>
                    <span>{tr("方案写作和客户沟通进步明显，这和你最近收下的几条提案经验一致。合规知识仍是短板：遇到行业法规细节时，你倾向于跳过而不是给出依据。")}</span>
                  </div>
                </section>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-start" }}>
                  <section aria-labelledby="sk-h" style={{ flex: "999 1 460px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "24px 26px", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                      <h2 id="sk-h" style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>{tr("各项能力")}</h2>
                      <div style={{ display: "flex", gap: "14px", fontSize: "12px", color: "#5B6577" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "12px", height: "6px", borderRadius: "3px", background: "#CDD3DB" }} />
                          {tr("上次")}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "12px", height: "6px", borderRadius: "3px", background: "#2E7D5B" }} />
                          {tr("本次")}
                        </span>
                      </div>
                    </div>
                    {v.skills.map((k: any, i0: number) => (
                      <div key={i0} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                          <span style={{ fontWeight: "600" }}>{tr(k.name)}</span>
                          <span>
                            <span style={{ fontWeight: "700" }}>{tr(k.now)}</span>
                            <span style={{ color: k.deltaFg, marginLeft: "8px", fontSize: "13px", fontWeight: "700" }}>{tr(k.delta)}</span>
                          </span>
                        </div>
                        <div style={{ height: "6px", borderRadius: "3px", background: "#F0F2EE" }}>
                          <div style={{ height: "6px", borderRadius: "3px", background: "#CDD3DB", width: `${k.prev}%` }} />
                        </div>
                        <div style={{ height: "10px", borderRadius: "5px", background: "#F0F2EE" }}>
                          <div style={{ height: "10px", borderRadius: "5px", background: k.color, width: `${k.now}%` }} />
                        </div>
                      </div>
                    ))}
                  </section>
                  <aside style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <section aria-labelledby="rec-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h2 id="rec-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>{tr("补短板：合规知识")}</h2>
                      <Link href="/video" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "8px 12px", border: "1px solid #E3E6E1", borderRadius: "10px", color: "#1B2A4A", textDecoration: "none" }}>
                        <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                        </span>
                        <span style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "14px", fontWeight: "600" }}>{tr("PDPA 在培训数据里的 3 个坑")}</span>
                          <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("AI 视频 · 3 分钟")}</span>
                        </span>
                      </Link>
                      <Link href="/game" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "8px 12px", border: "1px solid #E3E6E1", borderRadius: "10px", color: "#1B2A4A", textDecoration: "none" }}>
                        <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#E6F2EC", color: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 18l5-6 4 4 7-9" />
                          </svg>
                        </span>
                        <span style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "14px", fontWeight: "600" }}>{tr("情景闯关：IT 总监的五个问题")}</span>
                          <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("学习游戏 · 5 分钟")}</span>
                        </span>
                      </Link>
                      <Link href="/coach" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "8px 12px", border: "1px solid #E3E6E1", borderRadius: "10px", color: "#1B2A4A", textDecoration: "none" }}>
                        <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FBF0DC", color: "#B26F12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 5h16v11H9l-5 4z" />
                          </svg>
                        </span>
                        <span style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "14px", fontWeight: "600" }}>{tr("和 AI 教练模拟一次合规答疑")}</span>
                          <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("对话陪练 · 10 分钟")}</span>
                        </span>
                      </Link>
                    </section>
                    <section style={{ background: "#E6F2EC", borderRadius: "16px", padding: "18px 20px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F5E43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}>
                        <path d="M4 12a8 8 0 0 1 14-5.3L20 9" />
                        <path d="M20 4v5h-5" />
                        <path d="M20 12a8 8 0 0 1-14 5.3L4 15" />
                        <path d="M4 20v-5h5" />
                      </svg>
                      <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#1F5E43" }}>{tr("测评结果已同步给 Agent：在合规相关任务中，它会多提醒你 2 条经验，并在输出里主动标出需要法规依据的地方。")}</span>
                    </section>
                  </aside>
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}
