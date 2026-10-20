"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 今日工作台
export default class MainScreen extends DCLogic {
  renderVals() {
    return {};
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/today"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "14px", color: "#5B6577" }}>10月19日 · 周一</span>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>早上好，Yu</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>
                  今天有 4 项任务，我已从经验库里为你挑出 6 条相关提醒；今日学习已完成 6/15 分钟，
                  <Link href="/learn" style={{ fontWeight: "600", textDecoration: "none" }}>继续学习</Link>
                  。
                </p>
              </div>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 20px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                新任务{" "}
              </Link>
            </header>
            <section aria-label="学习进度" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center" }}>
              <div style={{ flex: "2 1 360px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#2E7D5B" }}>它越来越懂你</span>
                <span style={{ fontSize: "20px", fontWeight: "700", lineHeight: "1.5" }}>需要你大幅修改的输出，6 周内从 41% 降到 23%</span>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>你的每一次修改，都会在晚间复盘时变成新经验。</span>
              </div>
              <div style={{ flex: "1 1 240px", display: "flex", alignItems: "flex-end", gap: "10px", height: "96px" }} role="img" aria-label="6 周修改比例：41%、36%、33%、30%、26%、23%">
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "72px", background: "#D7DCE4", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#5B6577" }}>W1</span>
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "63px", background: "#D7DCE4", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#5B6577" }}>W2</span>
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "58px", background: "#D7DCE4", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#5B6577" }}>W3</span>
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "52px", background: "#D7DCE4", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#5B6577" }}>W4</span>
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "46px", background: "#D7DCE4", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#5B6577" }}>W5</span>
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ width: "100%", height: "40px", background: "#2E7D5B", borderRadius: "6px 6px 2px 2px" }} />
                  <span style={{ fontSize: "11px", color: "#1B2A4A", fontWeight: "700" }}>本周</span>
                </div>
              </div>
              <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px" }}>
                  <span style={{ color: "#5B6577" }}>本周采纳新经验</span>
                  <span style={{ fontWeight: "700" }}>7 / 9</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px" }}>
                  <span style={{ color: "#5B6577" }}>经验命中有效率</span>
                  <span style={{ fontWeight: "700" }}>82%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px" }}>
                  <span style={{ color: "#5B6577" }}>升级为 SOP</span>
                  <span style={{ fontWeight: "700" }}>5</span>
                </div>
              </div>
            </section>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <section aria-labelledby="tasks-h" style={{ flex: "2 1 520px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "24px 28px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h2 id="tasks-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>今日任务</h2>
                  <span style={{ fontSize: "13px", color: "#5B6577" }}>1 / 4 完成</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid #EEF0EC", flexWrap: "wrap" }}>
                  <span style={{ background: "#EEF1F6", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap" }}>BD提案</span>
                  <div style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>卡塔尔机场 · 培训方案初稿</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>14:00 截止 · 已匹配 3 条经验</span>
                  </div>
                  <Link href="/task" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 18px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                    继续
                  </Link>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid #EEF0EC", flexWrap: "wrap" }}>
                  <span style={{ background: "#EEF1F6", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap" }}>课程制作</span>
                  <div style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>半导体客户 · 安全合规课程大纲</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>17:00 截止 · 已匹配 2 条经验，含 1 个 SOP</span>
                  </div>
                  <Link href="/task" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                    开始
                  </Link>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid #EEF0EC", flexWrap: "wrap" }}>
                  <span style={{ background: "#EEF1F6", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap" }}>客户跟进</span>
                  <div style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>食品企业 · 回复报价邮件</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>11:00 截止 · 已匹配 1 条经验</span>
                  </div>
                  <Link href="/task" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                    开始
                  </Link>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid #EEF0EC", flexWrap: "wrap" }}>
                  <span style={{ background: "#E6F2EC", color: "#1F5E43", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap" }}>已完成</span>
                  <div style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#5B6577", textDecoration: "line-through" }}>运营 · 本周周报</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>捕捉到你的 2 处修改，今晚复盘</span>
                  </div>
                </div>
              </section>
              <section aria-labelledby="tips-h" style={{ flex: "1 1 300px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 id="tips-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>今日提醒</h2>
                  <Link href="/lessons" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>经验库</Link>
                </div>
                <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: "500" }}>制造业客户提案：先讲数据安全与合规，再讲功能</span>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>BD提案 · 置信 0.8 · 用于 3 项任务</span>
                </div>
                <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ background: "#E6F2EC", color: "#1F5E43", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "999px" }}>SOP</span>
                  </div>
                  <span style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: "500" }}>课程大纲每一节都配一个本行业真实案例</span>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>课程制作 · 验证 10 次</span>
                </div>
                <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ background: "#FBF0DC", color: "#7A4E0E", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "999px" }}>昨天新学</span>
                  </div>
                  <span style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: "500" }}>报价邮件正文不超过 150 字，明细放附件</span>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>客户跟进 · 置信 0.6</span>
                </div>
              </section>
            </div>
            <section aria-label="晚间复盘" style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "16px", padding: "22px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(232,163,61,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8A33D" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
                </svg>
              </div>
              <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "16px", fontWeight: "700" }}>18:00 晚间复盘 · 约 5 分钟</span>
                <span style={{ fontSize: "14px", color: "#C9D2DF" }}>我会把今天的修改和反馈提炼成新经验，等你确认后才生效。</span>
              </div>
              <Link href="/review" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 20px", borderRadius: "10px", background: "#E8A33D", color: "#1B2A4A", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
                现在复盘
              </Link>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
