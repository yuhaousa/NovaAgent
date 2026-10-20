"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// AI 视频课
export default class VideoScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { playing: false, answer: null, checkpointOpen: true, chapter: 2 };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var correct: any = 'B';
    var opts: any = [
      { key: 'A', text: '平台功能清单和产品截图' },
      { key: 'B', text: '数据安全与本地化部署方案' },
      { key: 'C', text: '已合作客户的 Logo 墙' }
    ].map(function (o: any) {
      var chosen: any = s.answer === o.key;
      var isRight: any = o.key === correct;
      var bg: any = '#FFFFFF', border = '#CDD3DB';
      if (s.answer && isRight) { bg = '#E6F2EC'; border = '#2E7D5B'; }
      else if (chosen) { bg = '#FBE9E6'; border = '#8A2B1F'; }
      return Object.assign({}, o, { bg: bg, border: border, pick: function () { self.setState({ answer: o.key }); } });
    });
    var right: any = s.answer === correct;
    var chapters: any = [
      { time: '00:00', title: '开场：一次被卡住的提案' },
      { time: '01:05', title: '客户 IT 部门在看什么' },
      { time: '02:20', title: '三句话讲清安全方案' },
      { time: '02:45', title: '用证据代替承诺' },
      { time: '03:40', title: '小结与练习' }
    ].map(function (c: any, i: any) {
      var on: any = i === s.chapter;
      return Object.assign({}, c, { bg: on ? '#E6F2EC' : 'transparent', weight: on ? '700' : '400', go: function () { self.setState({ chapter: i }); } });
    });
    return {
      showCheckpoint: s.checkpointOpen,
      options: opts,
      answered: !!s.answer,
      feedback: right ? '答对了。这正是经验 L-0231：安全先行，功能在后。IT 负责人确认风险可控后，才会认真看功能。' : '不太对。IT 负责人最先要确认风险可控，功能和客户案例放在后面讲。正确答案是 B。',
      fbBg: right ? '#E6F2EC' : '#FBE9E6',
      fbFg: right ? '#1F5E43' : '#8A2B1F',
      resume: function () { self.setState({ checkpointOpen: false, playing: true }); },
      playing: s.playing,
      paused: !s.playing,
      playLabel: s.playing ? '暂停' : '播放',
      togglePlay: function () { self.setState({ playing: !self.state.playing }); },
      chapters: chapters
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/learn", "/video"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "32px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "14px", color: "#5B6577", display: "flex", gap: "8px" }}>
              <Link href="/learn" style={{ textDecoration: "none", fontWeight: "600" }}>学习</Link>
              <span>/</span>
              <span>视频课</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <div style={{ flex: "999 1 600px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                <section aria-label="视频播放器" style={{ background: "#0F1A2E", borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#1B2A4A", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: "6%", top: "10%", right: "34%", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#E8A33D", letterSpacing: "1px" }}>第 3 节 · 三句话讲清安全方案</span>
                      <span style={{ fontSize: "30px", fontWeight: "700", lineHeight: "1.35" }}>制造业客户最先关心什么？</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", fontSize: "16px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>
                            1
                          </span>
                          数据存在哪里
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", fontSize: "16px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>
                            2
                          </span>
                          谁能访问
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", fontSize: "16px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>
                            3
                          </span>
                          出了问题怎么办
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "absolute", right: "6%", bottom: "20%", width: "22%", aspectRatio: "3 / 4", borderRadius: "16px", background: "#2B3D5E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", color: "#C9D2DF" }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                      </svg>
                      <span style={{ fontSize: "12px" }}>[AI 讲师形象]</span>
                    </div>
                    <div style={{ position: "absolute", left: "0", right: "0", bottom: "6%", display: "flex", justifyContent: "center", padding: "0 8%" }}>
                      <span style={{ background: "rgba(0,0,0,0.65)", color: "#FFFFFF", fontSize: "16px", lineHeight: "1.6", padding: "6px 14px", borderRadius: "6px", textAlign: "center" }}>
                        当客户的 IT 部门参与评审时，安全问题会决定方案能不能进入下一轮。
                      </span>
                    </div>
                    {v.showCheckpoint ? (
                      <div style={{ position: "absolute", inset: "0", background: "rgba(15,26,46,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                        <div role="dialog" aria-label="检查点" style={{ width: "100%", maxWidth: "560px", background: "#FFFFFF", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E", background: "#FBF0DC", padding: "3px 10px", borderRadius: "999px", alignSelf: "flex-start" }}>
                            检查点 · 02:31
                          </span>
                          <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: "1.6" }}>半导体客户的 IT 负责人第一次看方案，最先应该看到什么？</span>
                          {v.options.map((o: any, i0: number) => (
                            <button key={i0} type="button" onClick={o.pick} style={{ textAlign: "left", minHeight: "48px", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${o.border}`, background: o.bg, color: "#1B2A4A", font: "inherit", fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                              <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#EEF1F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: "0" }}>
                                {o.key}
                              </span>
                              {o.text}{" "}
                            </button>
                          ))}
                          {v.answered ? (
                            <>
                              <div role="status" style={{ background: v.fbBg, color: v.fbFg, borderRadius: "10px", padding: "12px 14px", fontSize: "14px", lineHeight: "1.7" }}>
                                {v.feedback}
                              </div>
                              <button type="button" onClick={v.resume} style={{ alignSelf: "flex-end", height: "44px", padding: "0 20px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                                继续播放
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div style={{ padding: "12px 18px 14px", display: "flex", flexDirection: "column", gap: "10px", color: "#FFFFFF" }}>
                    <div role="img" aria-label="播放进度 02:31 / 04:12，含 5 个章节" style={{ position: "relative", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.2)" }}>
                      <div style={{ width: "60%", height: "6px", borderRadius: "3px", background: "#2E7D5B" }} />
                      <span style={{ position: "absolute", left: "26%", top: "-2px", width: "2px", height: "10px", background: "#0F1A2E" }} />
                      <span style={{ position: "absolute", left: "55%", top: "-2px", width: "2px", height: "10px", background: "#0F1A2E" }} />
                      <span style={{ position: "absolute", left: "66%", top: "-2px", width: "2px", height: "10px", background: "#0F1A2E" }} />
                      <span style={{ position: "absolute", left: "87%", top: "-2px", width: "2px", height: "10px", background: "#0F1A2E" }} />
                      <span style={{ position: "absolute", left: "calc(60% - 5px)", top: "-3px", width: "12px", height: "12px", borderRadius: "50%", background: "#E8A33D" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <button type="button" aria-label={v.playLabel} onClick={v.togglePlay} style={{ width: "44px", height: "44px", border: "none", background: "transparent", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {v.playing ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                            <rect x="6" y="5" width="4" height="14" rx="1" />
                            <rect x="14" y="5" width="4" height="14" rx="1" />
                          </svg>
                        ) : null}
                        {v.paused ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                        ) : null}
                      </button>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#C9D2DF" }}>02:31 / 04:12</span>
                      <span style={{ flex: "1" }} />
                      <button type="button" style={{ height: "44px", padding: "0 10px", border: "none", background: "transparent", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        1.25x
                      </button>
                      <button type="button" style={{ height: "44px", padding: "0 10px", border: "none", background: "transparent", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        中 / EN
                      </button>
                      <button type="button" aria-label="全屏" style={{ width: "44px", height: "44px", border: "none", background: "transparent", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 360px" }}>
                    <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "700" }}>为什么制造业客户先问数据安全</h1>
                    <span style={{ fontSize: "14px", color: "#5B6577", lineHeight: "1.7" }}>4 分 12 秒 · AI 生成于 10月19日 · 素材：你在 3 份提案中的修改 + 经验 L-0231</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <Link href="/session" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                      换种学法：播客 / 图文 / 闪卡
                    </Link>
                    <button type="button" style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                      分享给团队
                    </button>
                  </div>
                </div>
                <section aria-labelledby="notes-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="notes-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>要点笔记 · AI 整理</h2>
                  <ol style={{ margin: "0", paddingLeft: "20px", fontSize: "15px", lineHeight: "1.9" }}>
                    <li>IT 部门有一票否决权：安全没讲清，功能再好也进不了下一轮。</li>
                    <li>用三个问题组织安全内容：数据在哪、谁能访问、出事怎么办。</li>
                    <li>每个回答都附一个可验证的证据：认证、部署方式、安全白皮书。</li>
                  </ol>
                </section>
              </div>
              <aside style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                <section aria-labelledby="ch-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "18px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <h2 id="ch-h" style={{ margin: "0 8px 8px", fontSize: "16px", fontWeight: "700" }}>章节</h2>
                  {v.chapters.map((c: any, i0: number) => (
                    <button key={i0} type="button" onClick={c.go} style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "48px", padding: "6px 10px", borderRadius: "10px", border: "none", background: c.bg, color: "#1B2A4A", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#5B6577", width: "42px", flexShrink: "0" }}>{c.time}</span>
                      <span style={{ fontSize: "14px", fontWeight: c.weight, lineHeight: "1.5" }}>{c.title}</span>
                    </button>
                  ))}
                </section>
                <section aria-labelledby="ask-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="ask-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>问 AI 讲师</h2>
                  <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", lineHeight: "1.7" }}>
                    <span style={{ fontWeight: "700" }}>你：</span>
                    如果客户要求私有化部署，我们的报价该怎么调？{" "}
                  </div>
                  <div style={{ background: "#E6F2EC", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", lineHeight: "1.7", color: "#1F5E43" }}>
                    {" "}把私有化部署做成单独的选项，单列实施和运维费用，正文只说明“支持”，明细放附件。这也符合你的经验 L-0204。{" "}
                  </div>
                  <label htmlFor="askq" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>提问</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input id="askq" type="text" placeholder="对这节课有疑问？" style={{ flex: "1", minWidth: "0", height: "44px", font: "inherit", fontSize: "14px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 12px", boxSizing: "border-box" }} />
                    <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "none", background: "#1B2A4A", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                      发送
                    </button>
                  </div>
                </section>
                <Link href="/game" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "18px 20px", borderRadius: "16px", background: "#1B2A4A", color: "#FFFFFF", textDecoration: "none" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>看完了？去闯关练一练</span>
                    <span style={{ fontSize: "13px", color: "#C9D2DF" }}>情景闯关 · IT 总监的五个问题</span>
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
