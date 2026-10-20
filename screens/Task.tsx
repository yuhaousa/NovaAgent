"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 任务执行
export default class TaskScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { fb: null, on: { a: true, b: true, c: true }, done: false };
  }
  renderVals() {
    var s: any = this.state;
    var self: any = this;
    var base: any = [
      { key: 'a', id: 'L-0231', scope: 'BD提案', rule: '制造业/机构客户提案：先讲数据安全与合规，再讲功能' },
      { key: 'b', id: 'L-0152', scope: '客户:卡塔尔机场', rule: '所有文档使用英式英语拼写，标注双语交付' },
      { key: 'c', id: 'L-0198', scope: '全局', rule: '中文用微软雅黑，英文用 Arial' }
    ];
    var lessons: any = base.map(function (l: any) {
      return Object.assign({}, l, {
        cid: 'les-' + l.key,
        on: !!s.on[l.key],
        toggle: function () {
          var next: any = Object.assign({}, self.state.on);
          next[l.key] = !next[l.key];
          self.setState({ on: next });
        }
      });
    });
    return {
      lessons: lessons,
      isUp: s.fb === 'up',
      notUp: s.fb !== 'up',
      isDown: s.fb === 'down',
      notDown: s.fb !== 'down',
      setUp: function () { self.setState({ fb: self.state.fb === 'up' ? null : 'up' }); },
      setDown: function () { self.setState({ fb: self.state.fb === 'down' ? null : 'down' }); },
      done: s.done,
      notDone: !s.done,
      submit: function () { self.setState({ done: true }); }
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/today", "/task"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <header style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "14px", color: "#5B6577", display: "flex", gap: "8px" }}>
                <Link href="/today" style={{ textDecoration: "none", fontWeight: "600" }}>今日</Link>
                <span>/</span>
                <span>任务</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
                  <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "700" }}>卡塔尔机场 · 培训方案初稿</h1>
                  <span style={{ background: "#EEF1F6", fontSize: "13px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px" }}>场景：BD提案</span>
                </div>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>草稿 v2 · 已自动保存</span>
              </div>
            </header>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <div style={{ flex: "999 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                <section style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label htmlFor="brief" style={{ fontSize: "14px", fontWeight: "700" }}>任务描述</label>
                  <textarea id="brief" rows={3} style={{ font: "inherit", fontSize: "15px", lineHeight: "1.7", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "12px 14px", resize: "vertical", background: "#FAFBF9" }}>
                    为卡塔尔国家机场写一份一线员工数字化培训方案初稿，面向培训部负责人，2 页以内，突出我们的平台优势和实施节奏。
                  </textarea>
                </section>
                <section aria-labelledby="out-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "14px 24px", borderBottom: "1px solid #EEF0EC" }}>
                    <h2 id="out-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>输出 · 可直接编辑</h2>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button type="button" style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        重新生成
                      </button>
                      <button type="button" style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        复制
                      </button>
                      <button type="button" style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        导出
                      </button>
                    </div>
                  </div>
                  <article style={{ padding: "28px 32px", fontSize: "15px", lineHeight: "1.85", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "700" }}>卡塔尔国家机场 · 一线员工数字化培训方案（初稿）</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontWeight: "700" }}>一、项目背景</span>
                      <p style={{ margin: "0" }}>为支持 [培训人数] 名一线员工的岗位技能提升，建议采用“线上学习 + AI 助教 + 现场考核”的混合模式，首期覆盖 [岗位范围]。</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontWeight: "700" }}>二、方案亮点</span>
                      <ol style={{ margin: "0", paddingLeft: "22px" }}>
                        <li>
                          <del style={{ background: "#FBE3E0", color: "#8A2B1F" }}>AI 智能出题与自适应学习路径</del>
                          {" "}
                          <ins style={{ background: "#DDEFE5", color: "#1F5E43", textDecoration: "none", borderBottom: "2px solid #2E7D5B" }}>数据安全优先：ISO 27001 体系，培训数据可本地化部署</ins>
                        </li>
                        <li>
                          阿拉伯语 / 英语双语课程
                          <ins style={{ background: "#DDEFE5", color: "#1F5E43", textDecoration: "none", borderBottom: "2px solid #2E7D5B" }}>，配双语 AI 助教</ins>
                        </li>
                        <li><ins style={{ background: "#DDEFE5", color: "#1F5E43", textDecoration: "none", borderBottom: "2px solid #2E7D5B" }}>与现有 HR 系统对接，学习记录自动同步</ins></li>
                        <li>AI 智能出题与自适应学习路径</li>
                      </ol>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontWeight: "700" }}>三、实施节奏</span>
                      <p style={{ margin: "0" }}>第 1–2 周需求调研与课程映射；第 3–6 周内容制作与试点；第 7 周起全面上线，按月输出学习数据报告。</p>
                    </div>
                  </article>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", padding: "14px 24px", background: "#FBF0DC", fontSize: "14px", color: "#5C3B0A" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                    </svg>
                    <span>
                      已捕捉你的{" "}
                      <strong>3 处修改</strong>
                      ，这是最有价值的学习信号，今晚复盘时提炼成经验。
                    </span>
                  </div>
                </section>
              </div>
              <aside style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                <section aria-labelledby="used-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="used-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>本次使用的经验</h2>
                  <p style={{ margin: "0", fontSize: "13px", color: "#5B6577" }}>取消勾选后重新生成，可对比效果。</p>
                  {v.lessons.map((item: any, i0: number) => (
                    <div key={i0} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#F5F6F3", borderRadius: "10px", padding: "12px 14px" }}>
                      <input type="checkbox" id={item.cid} checked={item.on} onChange={item.toggle} style={{ width: "20px", height: "20px", margin: "2px 0 0", accentColor: "#2E7D5B", flexShrink: "0" }} />
                      <label htmlFor={item.cid} style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}>
                        <span style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: "500" }}>{item.rule}</span>
                        <span style={{ fontSize: "12px", color: "#5B6577", fontFamily: "'JetBrains Mono', monospace" }}>{item.id}{" · "}{item.scope}</span>
                      </label>
                    </div>
                  ))}
                </section>
                <section aria-labelledby="fb-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h2 id="fb-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>这次结果怎么样？</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {v.isUp ? (
                      <button type="button" aria-pressed="true" onClick={v.setUp} style={{ flex: "1", height: "48px", borderRadius: "10px", border: "2px solid #2E7D5B", background: "#E6F2EC", color: "#1F5E43", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 11v9H4v-9z" />
                          <path d="M7 11l4-7a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7" />
                        </svg>
                        好用
                      </button>
                    ) : null}
                    {v.notUp ? (
                      <button type="button" aria-pressed="false" onClick={v.setUp} style={{ flex: "1", height: "48px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 11v9H4v-9z" />
                          <path d="M7 11l4-7a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7" />
                        </svg>
                        好用
                      </button>
                    ) : null}
                    {v.isDown ? (
                      <button type="button" aria-pressed="true" onClick={v.setDown} style={{ flex: "1", height: "48px", borderRadius: "10px", border: "2px solid #8A2B1F", background: "#FBE9E6", color: "#8A2B1F", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M17 13V4h3v9z" />
                          <path d="M17 13l-4 7a2 2 0 0 1-3-2l1-4H6a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.2 4H17" />
                        </svg>
                        要改进
                      </button>
                    ) : null}
                    {v.notDown ? (
                      <button type="button" aria-pressed="false" onClick={v.setDown} style={{ flex: "1", height: "48px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M17 13V4h3v9z" />
                          <path d="M17 13l-4 7a2 2 0 0 1-3-2l1-4H6a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.2 4H17" />
                        </svg>
                        要改进
                      </button>
                    ) : null}
                  </div>
                  <label htmlFor="why" style={{ fontSize: "13px", color: "#5B6577" }}>一句话原因（可选）</label>
                  <input id="why" type="text" placeholder="例如：开头太像产品手册" style={{ height: "44px", font: "inherit", fontSize: "14px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 12px", boxSizing: "border-box" }} />
                  {v.notDone ? (
                    <button type="button" onClick={v.submit} style={{ height: "48px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                      完成并记录
                    </button>
                  ) : null}
                  {v.done ? (
                    <div role="status" style={{ display: "flex", alignItems: "center", gap: "10px", background: "#E6F2EC", color: "#1F5E43", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", fontWeight: "600" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                      {" "}已记录，今晚复盘时学习{" "}
                    </div>
                  ) : null}
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
