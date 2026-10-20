"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";
import { tr, trBadge } from "@/lib/i18n/tr";

// 经验库
export default class LessonsScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { filter: 'all', sel: 'L-0231' };
  }
  renderVals() {
    var self: any = this;
    var S: any = {
      'SOP': ['#E6F2EC', '#1F5E43'],
      '可升级 SOP': ['#FBF0DC', '#7A4E0E'],
      '活跃': ['#EEF1F6', '#1B2A4A'],
      '待复审': ['#FBE9E6', '#8A2B1F'],
      '即将过期': ['#EEF0EC', '#5B6577']
    };
    var data: any = [
      { id: 'L-0231', type: 'scene', scope: '场景 · BD提案', conf: 0.8, used: 4, helped: 3, status: '可升级 SOP', rule: '制造业 / 机构客户提案：先讲数据安全与合规，再讲功能', why: '两次提案被客户 IT 部门卡在数据安全审查；之后你每次都把安全内容挪到最前面。', sources: ['卡塔尔机场培训方案 · 10/19', '半导体客户提案 · 10/08', '政府机构提案 · 09/26'], expires: '2027-04-19' },
      { id: 'L-0219', type: 'scene', scope: '场景 · 课程制作', conf: 0.9, used: 11, helped: 10, status: 'SOP', rule: '课程大纲每一节都配一个本行业真实案例', why: '学员反馈“太理论”后，你连续三次在大纲里加入行业案例。', sources: ['食品安全课程大纲 · 09/30', '新员工入职课 · 09/12'], expires: '长期' },
      { id: 'L-0204', type: 'scene', scope: '场景 · 客户跟进', conf: 0.6, used: 5, helped: 3, status: '活跃', rule: '报价邮件正文不超过 150 字，明细放附件', why: '你多次把我写的长邮件压缩到几行，并把价格表移到附件。', sources: ['食品企业报价 · 10/18', '机场项目报价 · 10/02'], expires: '2027-01-18' },
      { id: 'L-0198', type: 'global', scope: '全局', conf: 0.95, used: 23, helped: 23, status: 'SOP', rule: '中文交付物用微软雅黑，英文用 Arial', why: '所有交付物的统一品牌规范，你在设置中直接写入。', sources: ['手动添加 · 08/22'], expires: '长期' },
      { id: 'L-0187', type: 'scene', scope: '场景 · BD提案', conf: 0.4, used: 6, helped: 2, status: '待复审', rule: '提案开篇先讲公司资质与客户数量', why: '早期经验，最近被你多次改掉，与 L-0231 冲突。', sources: ['早期提案 · 07/15'], expires: '待裁决' },
      { id: 'L-0152', type: 'client', scope: '客户 · 卡塔尔机场', conf: 0.7, used: 3, helped: 3, status: '活跃', rule: '文档使用英式英语拼写，并标注双语交付', why: '对方培训部负责人在邮件中两次修改了美式拼写。', sources: ['机场项目周报 · 10/12', '机场项目报价 · 10/02'], expires: '2027-04-12' },
      { id: 'L-0140', type: 'scene', scope: '场景 · 运营', conf: 0.5, used: 2, helped: 1, status: '即将过期', rule: '周报先写结论和需要决策的事项', why: '你曾把结论段落从结尾挪到开头。', sources: ['运营周报 · 08/30'], expires: '2026-10-30' }
    ];
    var f: any = this.state.filter;
    var rows: any = data.filter(function (d: any) { return f === 'all' || d.type === f; }).map(function (d: any) {
      return Object.assign({}, d, {
        pct: Math.round(d.conf * 100),
        sBg: S[d.status][0], sFg: S[d.status][1],
        rowBg: d.id === self.state.sel ? '#F0F6F2' : '#FFFFFF',
        select: function () { self.setState({ sel: d.id }); }
      });
    });
    var selRaw: any = data.filter(function (d: any) { return d.id === self.state.sel; })[0] || data[0];
    var sel: any = Object.assign({}, selRaw, { sBg: S[selRaw.status][0], sFg: S[selRaw.status][1], canUpgrade: selRaw.status === '可升级 SOP' });
    var counts: any = { all: data.length, global: 0, scene: 0, client: 0 };
    data.forEach(function (d: any) { counts[d.type] += 1; });
    var filters: any = [
      { id: 'all', name: '全部' }, { id: 'global', name: '全局' }, { id: 'scene', name: '场景' }, { id: 'client', name: '客户' }
    ].map(function (x: any) {
      var on: any = x.id === f;
      return {
        label: x.name + ' ' + counts[x.id],
        pressed: on ? 'true' : 'false',
        bg: on ? '#1B2A4A' : '#FFFFFF',
        fg: on ? '#FFFFFF' : '#1B2A4A',
        border: on ? '#1B2A4A' : '#CDD3DB',
        pick: function () { self.setState({ filter: x.id }); }
      };
    });
    return { rows: rows, sel: sel, filters: filters };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/lessons"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>{tr("经验库")}</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>{tr("86 条经验卡 · 5 个 SOP · 每条都能追溯到当初的那次工作。")}</p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <label htmlFor="q" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>{trBadge("搜索经验")}</label>
                <input id="q" type="search" placeholder={tr("搜索经验、客户、场景")} style={{ height: "44px", width: "260px", maxWidth: "100%", font: "inherit", fontSize: "14px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 14px", boxSizing: "border-box", background: "#FFFFFF" }} />
                <button type="button" style={{ height: "44px", padding: "0 18px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                  {tr("手动添加")}
                </button>
              </div>
            </header>
            <div role="group" aria-label={tr("按作用域筛选")} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {v.filters.map((f: any, i0: number) => (
                <button key={i0} type="button" aria-pressed={f.pressed} onClick={f.pick} style={{ height: "40px", padding: "0 16px", borderRadius: "999px", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", border: `1px solid ${f.border}`, background: f.bg, color: f.fg }}>
                  {tr(f.label)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <section aria-label={tr("经验列表")} style={{ flex: "999 1 560px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "760px", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#5B6577", fontSize: "13px" }}>
                      <th scope="col" style={{ padding: "14px 16px 12px 20px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>ID</th>
                      <th scope="col" style={{ padding: "14px 12px 12px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>{tr("经验")}</th>
                      <th scope="col" style={{ padding: "14px 12px 12px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>{tr("作用域")}</th>
                      <th scope="col" style={{ padding: "14px 12px 12px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>{tr("置信度")}</th>
                      <th scope="col" style={{ padding: "14px 12px 12px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>{tr("有效 / 使用")}</th>
                      <th scope="col" style={{ padding: "14px 20px 12px 12px", fontWeight: "600", borderBottom: "1px solid #EEF0EC" }}>{tr("状态")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.rows.map((r: any, i0: number) => (
                      <tr key={i0} style={{ background: r.rowBg }}>
                        <td style={{ padding: "12px 16px 12px 20px", borderBottom: "1px solid #EEF0EC", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#5B6577", whiteSpace: "nowrap" }}>
                          {tr(r.id)}
                        </td>
                        <td style={{ padding: "6px 12px", borderBottom: "1px solid #EEF0EC" }}>
                          <button type="button" onClick={r.select} style={{ minHeight: "44px", width: "100%", textAlign: "left", background: "none", border: "none", padding: "6px 0", font: "inherit", fontSize: "14px", fontWeight: "500", lineHeight: "1.55", color: "#1B2A4A", cursor: "pointer" }}>
                            {tr(r.rule)}
                          </button>
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #EEF0EC", fontSize: "13px", whiteSpace: "nowrap" }}>{tr(r.scope)}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #EEF0EC" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "64px", height: "6px", borderRadius: "3px", background: "#E3E6E1" }}>
                              <div style={{ height: "6px", borderRadius: "3px", background: "#2E7D5B", width: `${r.pct}%` }} />
                            </div>
                            <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr(r.conf)}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #EEF0EC", fontSize: "13px", whiteSpace: "nowrap" }}>{tr(r.helped)}{" / "}{tr(r.used)}</td>
                        <td style={{ padding: "12px 20px 12px 12px", borderBottom: "1px solid #EEF0EC" }}>
                          <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px", whiteSpace: "nowrap", background: r.sBg, color: r.sFg }}>
                            {tr(r.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <aside aria-labelledby="detail-h" style={{ flex: "1 1 320px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#5B6577" }}>{tr(v.sel.id)}</span>
                  <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px", background: v.sel.sBg, color: v.sel.sFg }}>{tr(v.sel.status)}</span>
                </div>
                <h2 id="detail-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700", lineHeight: "1.6" }}>{tr(v.sel.rule)}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#5B6577" }}>{tr("为什么")}</span>
                  <span style={{ fontSize: "14px", lineHeight: "1.7" }}>{tr(v.sel.why)}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px" }}>
                  <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("置信度")}</span>
                    <span style={{ fontSize: "18px", fontWeight: "700" }}>{tr(v.sel.conf)}</span>
                  </div>
                  <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("使用")}</span>
                    <span style={{ fontSize: "18px", fontWeight: "700" }}>{tr(v.sel.used)}</span>
                  </div>
                  <div style={{ background: "#F5F6F3", borderRadius: "10px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#5B6577" }}>{tr("有效")}</span>
                    <span style={{ fontSize: "18px", fontWeight: "700" }}>{tr(v.sel.helped)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#5B6577" }}>{tr("来源（点开看当时的工作）")}</span>
                  {v.sel.sources.map((s: any, i0: number) => (
                    <Link key={i0} href="/task" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "44px", padding: "0 12px", border: "1px solid #E3E6E1", borderRadius: "10px", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>
                      {tr(s)}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </Link>
                  ))}
                </div>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("作用域：")}{tr(v.sel.scope)}{tr(" · 有效期至 ")}{tr(v.sel.expires)}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "4px" }}>
                  {v.sel.canUpgrade ? (
                    <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "none", background: "#E8A33D", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                      {tr("升级为 SOP")}
                    </button>
                  ) : null}
                  <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    {tr("编辑")}
                  </button>
                  <button type="button" style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "none", background: "transparent", color: "#8A2B1F", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                    {tr("停用")}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
