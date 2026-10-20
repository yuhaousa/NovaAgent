"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 学习中心
export default class LearnScreen extends DCLogic {
  renderVals() {
    return {};
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/learn"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>今日学习</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>所有内容都由你这周的真实工作和经验库生成。每天 15 分钟。</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "999px", padding: "8px 18px 8px 10px" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#FBF0DC", color: "#B26F12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5.5 1 1.5 2 2 3 2-1-2-1-4 0-6.5z" />
                  </svg>
                </span>
                <span style={{ fontSize: "14px" }}>
                  <strong>连续学习 12 天</strong>
                  {" "}· 本周 640 XP
                </span>
              </div>
            </header>
            <section aria-labelledby="plan-h" style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "18px", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                <h2 id="plan-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>今天的 15 分钟</h2>
                <span style={{ fontSize: "14px", color: "#C9D2DF" }}>已完成 1 / 3 · 根据今天的任务和昨天卡住的问题生成 · 节点：合规知识 L2</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link href="/session" style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", background: "rgba(255,255,255,0.08)", color: "#FFFFFF", textDecoration: "none" }}>
                  <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>听播客 · 6 分钟</span>
                    <span style={{ fontSize: "13px", color: "#C9D2DF" }}>通勤路上：数据安全三句话</span>
                  </span>
                </Link>
                <Link href="/game" style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", background: "#FFFFFF", color: "#1B2A4A", textDecoration: "none" }}>
                  <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#E8A33D", color: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", fontWeight: "700" }}>
                    2
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>玩一局 · 5 分钟</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>情景闯关：IT 总监的五个问题</span>
                  </span>
                </Link>
                <Link href="/session" style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", background: "rgba(255,255,255,0.08)", color: "#FFFFFF", textDecoration: "none" }}>
                  <span style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #9AA8BC", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", fontWeight: "700", boxSizing: "border-box" }}>
                    3
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>闪卡 · 4 张到期</span>
                    <span style={{ fontSize: "13px", color: "#C9D2DF" }}>按遗忘曲线复习，2 分钟</span>
                  </span>
                </Link>
              </div>
            </section>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <div style={{ flex: "999 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
                <section aria-labelledby="vid-h" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h2 id="vid-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>为你生成的视频课</h2>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>由经验和复盘自动生成</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                    <Link href="/video" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", overflow: "hidden", color: "#1B2A4A", textDecoration: "none" }}>
                      <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ position: "absolute", left: "14px", top: "12px", fontSize: "13px", fontWeight: "700", color: "#FFFFFF" }}>安全先行</span>
                        <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1B2A4A" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                        </span>
                        <span style={{ position: "absolute", right: "10px", bottom: "10px", background: "rgba(0,0,0,0.6)", color: "#FFFFFF", fontSize: "12px", padding: "2px 6px", borderRadius: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
                          4:12
                        </span>
                        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "4px", background: "rgba(255,255,255,0.25)" }}>
                          <div style={{ width: "60%", height: "4px", background: "#E8A33D" }} />
                        </div>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.5" }}>为什么制造业客户先问数据安全</span>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>来自经验 L-0231 · 已看 60%</span>
                      </div>
                    </Link>
                    <Link href="/video" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", overflow: "hidden", color: "#1B2A4A", textDecoration: "none" }}>
                      <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#24543F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ position: "absolute", left: "14px", top: "12px", fontSize: "13px", fontWeight: "700", color: "#FFFFFF" }}>案例开场</span>
                        <span style={{ position: "absolute", right: "12px", top: "12px", background: "#E8A33D", color: "#1B2A4A", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "999px" }}>
                          新
                        </span>
                        <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#24543F" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                        </span>
                        <span style={{ position: "absolute", right: "10px", bottom: "10px", background: "rgba(0,0,0,0.6)", color: "#FFFFFF", fontSize: "12px", padding: "2px 6px", borderRadius: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
                          3:40
                        </span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.5" }}>合规课程如何用事故案例开场</span>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>来自今晚复盘 · 未开始</span>
                      </div>
                    </Link>
                    <Link href="/video" style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", overflow: "hidden", color: "#1B2A4A", textDecoration: "none" }}>
                      <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#5C3B0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ position: "absolute", left: "14px", top: "12px", fontSize: "13px", fontWeight: "700", color: "#FFFFFF" }}>报价沟通</span>
                        <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#5C3B0A" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                        </span>
                        <span style={{ position: "absolute", right: "10px", bottom: "10px", background: "rgba(0,0,0,0.6)", color: "#FFFFFF", fontSize: "12px", padding: "2px 6px", borderRadius: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
                          2:55
                        </span>
                      </div>
                      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.5" }}>三步回复报价邮件</span>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>来自 SOP · 未开始</span>
                      </div>
                    </Link>
                  </div>
                </section>
                <section aria-labelledby="game-h" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h2 id="game-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>学习游戏</h2>
                    <Link href="/modes" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>全部 12 种学习模式</Link>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                    <Link href="/game" style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px", color: "#1B2A4A", textDecoration: "none" }}>
                      <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#E6F2EC", color: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 18l5-6 4 4 7-9" />
                          <path d="M15 7h5v5" />
                        </svg>
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: "700" }}>情景闯关</span>
                      <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.6" }}>扮演你自己，应对客户的真实异议。5 关 · 约 5 分钟</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>+150 XP</span>
                    </Link>
                    <Link href="/game" style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px", color: "#1B2A4A", textDecoration: "none" }}>
                      <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#EEF1F6", color: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="7" height="7" rx="1.5" />
                          <rect x="14" y="13" width="7" height="7" rx="1.5" />
                          <path d="M10 7.5h4a3 3 0 0 1 3 3V13" />
                        </svg>
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: "700" }}>经验配对</span>
                      <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.6" }}>把经验规则拖到它适用的场景里，越快越好。约 3 分钟</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>+80 XP</span>
                    </Link>
                    <Link href="/game" style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px", color: "#1B2A4A", textDecoration: "none" }}>
                      <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#FBF0DC", color: "#B26F12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="11" cy="11" r="6.5" />
                          <path d="M16 16l4.5 4.5" />
                        </svg>
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: "700" }}>限时找错</span>
                      <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.6" }}>AI 写了一份有 5 处问题的方案，90 秒内找出来。</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>+100 XP</span>
                    </Link>
                  </div>
                </section>
              </div>
              <aside style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                <section aria-labelledby="skill-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h2 id="skill-h" style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>能力地图</h2>
                    <Link href="/skills" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>完整技能图谱</Link>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span>课程设计</span>
                      <span style={{ fontWeight: "700" }}>81</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#EEF0EC" }}><div style={{ width: "81%", height: "8px", borderRadius: "4px", background: "#2E7D5B" }} /></div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span>方案写作</span>
                      <span style={{ fontWeight: "700" }}>72</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#EEF0EC" }}><div style={{ width: "72%", height: "8px", borderRadius: "4px", background: "#2E7D5B" }} /></div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span>客户沟通</span>
                      <span style={{ fontWeight: "700" }}>65</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#EEF0EC" }}><div style={{ width: "65%", height: "8px", borderRadius: "4px", background: "#2E7D5B" }} /></div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span>
                        合规知识{" "}
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E", background: "#FBF0DC", padding: "1px 8px", borderRadius: "999px", marginLeft: "4px" }}>本周重点</span>
                      </span>
                      <span style={{ fontWeight: "700" }}>54</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#EEF0EC" }}><div style={{ width: "54%", height: "8px", borderRadius: "4px", background: "#E8A33D" }} /></div>
                  </div>
                  <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.6" }}>下次测评：周五 · 今天的视频和游戏都在补合规知识。</span>
                </section>
                <section aria-label="AI 教练" style={{ background: "#E6F2EC", borderRadius: "16px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>卡住了？问问 AI 教练</span>
                  <span style={{ fontSize: "14px", color: "#1F5E43", lineHeight: "1.7" }}>它了解你的经验库和测评结果，可以给建议，也能陪你模拟一次客户会议。</span>
                  <Link href="/coach" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", height: "44px", padding: "0 18px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
                    和教练聊聊
                  </Link>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
