"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";
import { tr, trBadge } from "@/lib/i18n/tr";

// 场景配置
export default class ScenariosScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = {
      cur: 'course',
      draft: '',
      saved: false,
      data: {
        bd: { name: 'BD提案', lessons: 24, role: '资深 B2B 教育解决方案顾问，熟悉企业培训与机构采购流程', goal: '产出可直接发给客户的方案初稿', tools: ['search', 'docs', 'slides', 'mail'], criteria: ['开篇 3 句话讲清客户收益', '每个亮点对应客户的一个痛点', '包含实施节奏和报价占位'], template: '方案初稿（2 页）', mode: 'all', share: true },
        course: { name: '课程制作', lessons: 31, role: '资深企业培训课程设计师，擅长把专业内容转成可练习的课程', goal: '产出可直接交付的课程大纲和课件', tools: ['search', 'docs', 'slides'], criteria: ['学习目标可衡量', '每节有真实案例和练习', '符合 WSQ 课程格式'], template: '课程大纲', mode: 'low', share: true },
        follow: { name: '客户跟进', lessons: 12, role: '专业、简洁的客户经理', goal: '推进商机，回复不超过一屏', tools: ['mail', 'calendar'], criteria: ['先回应对方的问题', '有明确的下一步', '正文不超过 150 字'], template: '邮件回复', mode: 'all', share: false },
        ops: { name: '运营周报', lessons: 6, role: '细致的运营助理', goal: '把一周进展整理成可决策的周报', tools: ['docs', 'sheets'], criteria: ['先写结论', '列出需要决策的事项'], template: '周报', mode: 'all', share: false }
      }
    };
  }
  patch(fields: any) {
    var data: any = Object.assign({}, this.state.data);
    data[this.state.cur] = Object.assign({}, data[this.state.cur], fields);
    this.setState({ data: data, saved: false });
  }
  renderVals() {
    var self: any = this;
    var st: any = this.state;
    var cur: any = st.data[st.cur];
    var order: any = ['bd', 'course', 'follow', 'ops'];
    var list: any = order.map(function (k: any) {
      var d: any = st.data[k];
      var on: any = k === st.cur;
      return {
        name: d.name,
        meta: '经验 ' + d.lessons + ' 条 · ' + d.tools.length + ' 个工具',
        pressed: on ? 'true' : 'false',
        bg: on ? '#FFFFFF' : 'transparent',
        border: on ? '2px solid #2E7D5B' : '1px solid #E3E6E1',
        pick: function () { self.setState({ cur: k, draft: '', saved: false }); }
      };
    });
    var TOOLS: any = [['search', '网络搜索'], ['docs', '文档'], ['slides', '幻灯片'], ['sheets', '表格'], ['mail', '邮件'], ['calendar', '日历']];
    var tools: any = TOOLS.map(function (t: any) {
      var on: any = cur.tools.indexOf(t[0]) >= 0;
      return {
        cid: 'tool-' + t[0], label: t[1], on: on,
        bg: on ? '#E6F2EC' : '#FFFFFF',
        border: on ? '#2E7D5B' : '#CDD3DB',
        toggle: function () {
          var next: any = on ? cur.tools.filter(function (x: any) { return x !== t[0]; }) : cur.tools.concat([t[0]]);
          self.patch({ tools: next });
        }
      };
    });
    var criteria: any = cur.criteria.map(function (text: any, i: any) {
      return { text: text, remove: function () { self.patch({ criteria: cur.criteria.filter(function (_: any, j: any) { return j !== i; }) }); } };
    });
    var toolNames: any = cur.tools.join(', ');
    var yaml: any = 'scenario: ' + cur.name + '\nrole: ' + cur.role + '\ngoal: ' + cur.goal + '\ntools: [' + toolNames + ']\nquality_criteria:\n' + cur.criteria.map(function (c: any) { return '  - ' + c; }).join('\n') + '\noutput_template: ' + cur.template + '\nlearning:\n  confirm: ' + (cur.mode === 'all' ? 'all' : 'low_confidence_only') + '\n  promote_to_global: ' + (cur.share ? 'true' : 'false');
    return {
      list: list, cur: cur, tools: tools, criteria: criteria, yaml: yaml,
      draft: st.draft,
      onDraft: function (e: any) { self.setState({ draft: e.target.value }); },
      addCrit: function () {
        var v: any = (self.state.draft || '').trim();
        if (!v) return;
        self.patch({ criteria: cur.criteria.concat([v]) });
        self.setState({ draft: '' });
      },
      onRole: function (e: any) { self.patch({ role: e.target.value }); },
      onGoal: function (e: any) { self.patch({ goal: e.target.value }); },
      onTpl: function (e: any) { self.patch({ template: e.target.value }); },
      modeAll: cur.mode === 'all',
      modeLow: cur.mode === 'low',
      setAll: function () { self.patch({ mode: 'all' }); },
      setLow: function () { self.patch({ mode: 'low' }); },
      share: !!cur.share,
      toggleShare: function () { self.patch({ share: !cur.share }); },
      saved: st.saved,
      notSaved: !st.saved,
      save: function () { self.setState({ saved: true }); }
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/scenarios"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>{tr("场景配置")}</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>{tr("同一个 Agent，换一张配置就能胜任新工作。新增场景不需要写代码。")}</p>
              </div>
              {v.saved ? (
                <span role="status" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", background: "#E6F2EC", color: "#1F5E43", fontSize: "14px", fontWeight: "700" }}>
                  {tr("已保存，下个任务起生效")}
                </span>
              ) : null}
              {v.notSaved ? (
                <button type="button" onClick={v.save} style={{ height: "44px", padding: "0 22px", borderRadius: "10px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                  {tr("保存配置")}
                </button>
              ) : null}
            </header>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <section aria-label={tr("场景列表")} style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {v.list.map((s: any, i0: number) => (
                  <button key={i0} type="button" aria-pressed={s.pressed} onClick={s.pick} style={{ textAlign: "left", minHeight: "64px", padding: "12px 16px", borderRadius: "12px", border: s.border, background: s.bg, font: "inherit", color: "#1B2A4A", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>{tr(s.name)}</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr(s.meta)}</span>
                  </button>
                ))}
                <button type="button" style={{ minHeight: "52px", padding: "0 16px", borderRadius: "12px", border: "1.5px dashed #9AA8BC", background: "transparent", font: "inherit", fontSize: "14px", fontWeight: "600", color: "#1B2A4A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  {tr("新建场景")}{" "}
                </button>
              </section>
              <section aria-labelledby="form-h" style={{ flex: "999 1 560px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "16px", padding: "26px 28px", display: "flex", flexDirection: "column", gap: "22px" }}>
                <h2 id="form-h" style={{ margin: "0", fontSize: "20px", fontWeight: "700" }}>{tr(v.cur.name)}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="role" style={{ fontSize: "14px", fontWeight: "700" }}>
                    {tr("角色设定")}{" "}
                    <span style={{ fontWeight: "400", color: "#5B6577" }}>{tr("· 它在这个场景里是谁")}</span>
                  </label>
                  <textarea id="role" rows={2} value={tr(v.cur.role)} onChange={v.onRole} style={{ font: "inherit", fontSize: "15px", lineHeight: "1.7", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "10px 14px", resize: "vertical" }}></textarea>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="goal" style={{ fontSize: "14px", fontWeight: "700" }}>
                    {tr("目标")}{" "}
                    <span style={{ fontWeight: "400", color: "#5B6577" }}>{tr("· 什么样的产出算完成")}</span>
                  </label>
                  <input id="goal" type="text" value={tr(v.cur.goal)} onChange={v.onGoal} style={{ height: "44px", font: "inherit", fontSize: "15px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 14px", boxSizing: "border-box" }} />
                </div>
                <fieldset style={{ border: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <legend style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>{tr("可用工具")}</legend>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {v.tools.map((t: any, i0: number) => (
                      <label key={i0} htmlFor={t.cid} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${t.border}`, background: t.bg, fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        <input type="checkbox" id={t.cid} checked={t.on} onChange={t.toggle} style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                        {tr(t.label)}{" "}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700" }}>
                    {tr("质量标准")}{" "}
                    <span style={{ fontWeight: "400", color: "#5B6577" }}>{tr("· 反思时用来给自己打分")}</span>
                  </span>
                  {v.criteria.map((c: any, i0: number) => (
                    <div key={i0} style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "44px", padding: "0 6px 0 14px", background: "#F5F6F3", borderRadius: "10px" }}>
                      <span style={{ flex: "1", fontSize: "15px" }}>{tr(c.text)}</span>
                      <button type="button" aria-label={tr("删除这条标准")} onClick={c.remove} style={{ width: "44px", height: "44px", border: "none", background: "transparent", color: "#5B6577", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <label htmlFor="newc" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>{trBadge("新的质量标准")}</label>
                    <input id="newc" type="text" placeholder={tr("新增一条标准，例如：结论放在第一段")} value={tr(v.draft)} onChange={v.onDraft} style={{ flex: "1", minWidth: "0", height: "44px", font: "inherit", fontSize: "14px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 14px", boxSizing: "border-box" }} />
                    <button type="button" onClick={v.addCrit} style={{ height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #CDD3DB", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                      {tr("添加")}
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="tpl" style={{ fontSize: "14px", fontWeight: "700" }}>{tr("输出模板")}</label>
                    <select id="tpl" value={v.cur.template} onChange={v.onTpl} style={{ height: "44px", font: "inherit", fontSize: "15px", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 12px", background: "#FFFFFF" }}>
                      <option value="方案初稿（2 页）">{tr("方案初稿（2 页）")}</option>
                      <option value="课程大纲">{tr("课程大纲")}</option>
                      <option value="邮件回复">{tr("邮件回复")}</option>
                      <option value="周报">{tr("周报")}</option>
                    </select>
                  </div>
                  <fieldset style={{ flex: "1 1 260px", border: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <legend style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>{tr("新经验如何生效")}</legend>
                    <label htmlFor="m-all" style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "40px", fontSize: "14px", cursor: "pointer" }}>
                      <input type="radio" name="mode" id="m-all" checked={v.modeAll} onChange={v.setAll} style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                      {tr("每条都由我确认")}
                    </label>
                    <label htmlFor="m-low" style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "40px", fontSize: "14px", cursor: "pointer" }}>
                      <input type="radio" name="mode" id="m-low" checked={v.modeLow} onChange={v.setLow} style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                      {tr("只确认低置信度的")}
                    </label>
                  </fieldset>
                </div>
                <label htmlFor="share" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "14px 16px", background: "#F5F6F3", borderRadius: "12px", cursor: "pointer" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>{tr("允许经验提升为全局")}</span>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr("在本场景被验证 5 次以上的经验，可推荐给其他场景使用")}</span>
                  </span>
                  <input type="checkbox" id="share" checked={v.share} onChange={v.toggleShare} style={{ width: "22px", height: "22px", margin: "0", accentColor: "#2E7D5B", flexShrink: "0" }} />
                </label>
                <details style={{ borderTop: "1px solid #EEF0EC", paddingTop: "16px" }}>
                  <summary style={{ fontSize: "14px", fontWeight: "700", cursor: "pointer", minHeight: "32px" }}>{tr("查看配置文件")}</summary>
                  <pre style={{ margin: "12px 0 0", background: "#1B2A4A", color: "#E6EBF2", borderRadius: "12px", padding: "18px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "1.7", whiteSpace: "pre-wrap", overflowX: "auto" }}>
                    {"{{ yaml }}"}
                  </pre>
                </details>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
