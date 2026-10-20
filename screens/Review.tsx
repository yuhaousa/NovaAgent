"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";
import { tr } from "@/lib/i18n/tr";

// 晚间复盘
export default class ReviewScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { status: { c1: 'pending', c2: 'pending', c3: 'pending' }, choice: null };
  }
  renderVals() {
    var self: any = this;
    var st: any = this.state.status;
    var set: any = function (k: any, v: any) {
      var next: any = Object.assign({}, self.state.status);
      next[k] = v;
      self.setState({ status: next });
    };
    var base: any = [
      { key: 'c1', scope: '客户 · 卡塔尔机场', conf: '0.6', source: '卡塔尔机场培训方案初稿', rule: '给中东客户的方案，明确写出阿拉伯语 / 英语双语交付', why: '今天你两次手动补上了“双语”相关内容。' },
      { key: 'c2', scope: '场景 · 课程制作', conf: '0.5', source: '半导体安全合规课程大纲', rule: '合规类课程第一节固定讲“这件事和你有什么关系”，用事故案例开场', why: '你把我写的“法规条款解读”开场，改成了一个真实事故案例。' },
      { key: 'c3', scope: '场景 · 客户跟进', conf: '0.5', source: '回复食品企业报价邮件', rule: '报价回复先确认对方预算区间，再给方案选项', why: '你删掉了我直接列出的三档价格，改成先问预算。' }
    ];
    var candidates: any = base.map(function (c: any) {
      var s: any = st[c.key];
      return Object.assign({}, c, {
        pending: s === 'pending',
        accepted: s === 'accepted',
        discarded: s === 'discarded',
        accept: function () { set(c.key, 'accepted'); },
        discard: function () { set(c.key, 'discarded'); },
        undo: function () { set(c.key, 'pending'); }
      });
    });
    var ch: any = this.state.choice;
    var choices: any = [
      { id: 'old', label: '保留旧经验' },
      { id: 'new', label: '用新经验替换' },
      { id: 'both', label: '都保留，按客户类型区分' }
    ].map(function (c: any) {
      return Object.assign({}, c, {
        cid: 'ch-' + c.id,
        on: ch === c.id,
        pick: function () { self.setState({ choice: c.id }); }
      });
    });
    var doneCount: any = candidates.filter(function (c: any) { return !c.pending; }).length + (ch ? 1 : 0);
    return { candidates: candidates, choices: choices, doneCount: doneCount };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/review"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "14px", color: "#5B6577" }}>{tr("10月19日 · 18:02")}</span>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>{tr("今日复盘")}</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>{tr("我从今天的工作里学到了这些。你确认的才会进入经验库。")}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "999px", padding: "8px 16px", fontSize: "14px" }}>
                <span style={{ color: "#5B6577" }}>{tr("已处理")}</span>
                <span style={{ fontWeight: "700" }}>{tr(v.doneCount)}{" / 4"}</span>
              </div>
            </header>
            <section aria-label={tr("今日概览")} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("完成任务")}</span>
                <span style={{ fontSize: "26px", fontWeight: "700" }}>4</span>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("捕捉修改")}</span>
                <span style={{ fontSize: "26px", fontWeight: "700" }}>{tr("9 处")}</span>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("经验被验证有效")}</span>
                <span style={{ fontSize: "26px", fontWeight: "700", color: "#2E7D5B" }}>{tr("2 条")}</span>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("经验被你推翻")}</span>
                <span style={{ fontSize: "26px", fontWeight: "700", color: "#8A2B1F" }}>{tr("1 条")}</span>
              </div>
            </section>
            <section aria-labelledby="cand-h" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h2 id="cand-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>{tr("候选经验 · 3 条")}</h2>
              {v.candidates.map((item: any, i0: number) => (
                <article key={i0} style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                  <div style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", fontSize: "12px" }}>
                      <span style={{ background: "#EEF1F6", fontWeight: "600", padding: "3px 10px", borderRadius: "6px" }}>{tr(item.scope)}</span>
                      <span style={{ color: "#5B6577" }}>{tr("初始置信 ")}{tr(item.conf)}</span>
                      <span style={{ color: "#5B6577" }}>{tr("· 来自：")}{tr(item.source)}</span>
                    </div>
                    <span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.6" }}>{tr(item.rule)}</span>
                    <span style={{ fontSize: "14px", color: "#5B6577", lineHeight: "1.7" }}>{tr("依据：")}{tr(item.why)}</span>
                  </div>
                  <div style={{ flex: "1 1 240px", display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                    {item.pending ? (
                      <>
                        <button type="button" onClick={item.accept} style={{ height: "44px", padding: "0 18px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                          {tr("收下")}
                        </button>
                        <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                          {tr("修改")}
                        </button>
                        <button type="button" onClick={item.discard} style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "none", background: "transparent", color: "#5B6577", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                          {tr("丢弃")}
                        </button>
                      </>
                    ) : null}
                    {item.accepted ? (
                      <>
                        <span role="status" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 14px", borderRadius: "10px", background: "#E6F2EC", color: "#1F5E43", fontSize: "14px", fontWeight: "700" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                          {tr("已收下，明天生效")}
                        </span>
                        <button type="button" onClick={item.undo} style={{ height: "44px", padding: "0 12px", borderRadius: "10px", border: "none", background: "transparent", color: "#5B6577", font: "inherit", fontSize: "14px", cursor: "pointer" }}>
                          {tr("撤销")}
                        </button>
                      </>
                    ) : null}
                    {item.discarded ? (
                      <>
                        <span role="status" style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 14px", borderRadius: "10px", background: "#EEF0EC", color: "#5B6577", fontSize: "14px", fontWeight: "600" }}>
                          {tr("已丢弃")}
                        </span>
                        <button type="button" onClick={item.undo} style={{ height: "44px", padding: "0 12px", borderRadius: "10px", border: "none", background: "transparent", color: "#5B6577", font: "inherit", fontSize: "14px", cursor: "pointer" }}>
                          {tr("撤销")}
                        </button>
                      </>
                    ) : null}
                  </div>
                </article>
              ))}
            </section>
            <section aria-labelledby="conf-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ background: "#FBE9E6", color: "#8A2B1F", fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px" }}>{tr("冲突")}</span>
                <h2 id="conf-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>{tr("新经验和旧经验矛盾，请你裁决")}</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ flex: "1 1 300px", background: "#F5F6F3", borderRadius: "12px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#5B6577", fontFamily: "'JetBrains Mono', monospace" }}>{tr("旧 · L-0187 · 使用 6 次，有效 2 次")}</span>
                  <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.6" }}>{tr("提案开篇先讲公司资质与客户数量")}</span>
                </div>
                <div style={{ flex: "1 1 300px", background: "#E6F2EC", borderRadius: "12px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#1F5E43", fontFamily: "'JetBrains Mono', monospace" }}>{tr("新 · 来自今天的卡塔尔方案")}</span>
                  <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.6" }}>{tr("机构 / 制造业客户提案，开篇先讲数据安全与合规")}</span>
                </div>
              </div>
              <fieldset style={{ border: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <legend style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>{tr("怎么处理？")}</legend>
                {v.choices.map((c: any, i0: number) => (
                  <label key={i0} htmlFor={c.cid} style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: "10px", minHeight: "48px", padding: "0 14px", border: "1px solid #CDD3DB", borderRadius: "10px", cursor: "pointer", fontSize: "14px", background: "#FFFFFF" }}>
                    <input type="radio" name="conflict" id={c.cid} checked={c.on} onChange={c.pick} style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                    {" "}{tr(c.label)}{" "}
                  </label>
                ))}
              </fieldset>
            </section>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "14px", color: "#5B6577" }}>{tr("每周日我会再做一次整理：合并重复、淘汰低效、把成熟经验升级为 SOP。")}</span>
              <Link href="/lessons" style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 22px", borderRadius: "10px", background: "#1B2A4A", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {tr("完成复盘，查看经验库")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
