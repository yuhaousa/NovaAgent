"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 技能图谱
export default class SkillMapScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { sel: 'p3' };
  }
  renderVals() {
    var self: any = this;
    var N: any = {
      c1: { d: '客户沟通', l: 'L1 基础', n: '需求挖掘', s: 'done', crit: '首次会谈中用 5 个开放问题，摸清客户的培训目标、学员人群和预算范围。', pre: [], unl: 'L2 异议处理', ev: ['食品企业首次会谈纪要', '经验 L-0204 报价沟通'] },
      c2: { d: '客户沟通', l: 'L2 应用', n: '异议处理', s: 'done', crit: '面对价格、效果、安全三类常见异议，能给出有依据的回应。', pre: [['L1 需求挖掘', 'done']], unl: 'L3 价格谈判', ev: ['情景闯关通关 3 次', '测评：客户沟通 65 分'] },
      c3: { d: '客户沟通', l: 'L3 精通', n: '价格谈判', s: 'doing', pct: 40, crit: '不先让价，把比较拉回同一口径，在守住目标毛利的前提下推进成交。', pre: [['客户沟通 L2 异议处理', 'done']], unl: 'L4 战略客户经营', ev: ['食品企业报价回复（你改成了先问预算）'], steps: ['done', 'doing', 'todo', 'todo', 'todo'] },
      c4: { d: '客户沟通', l: 'L4 专家', n: '战略客户经营', s: 'lock', crit: '为年度采购额较大的机构客户制定年度合作与续约计划。', pre: [['客户沟通 L3 价格谈判', 'doing']], unl: '岗位等级 L4 专家', ev: [] },
      p1: { d: '方案写作', l: 'L1 基础', n: '结构化写作', s: 'done', crit: '用“结论—依据—行动”结构写出一页纸方案。', pre: [], unl: 'L2 痛点价值映射', ev: ['运营周报（结论前置）'] },
      p2: { d: '方案写作', l: 'L2 应用', n: '痛点价值映射', s: 'done', crit: '方案里的每个亮点，都能对应到客户的一个具体痛点。', pre: [['方案写作 L1 结构化写作', 'done']], unl: 'L3 安全先行提案', ev: ['机场项目报价方案', '测评：方案写作 72 分'] },
      p3: { d: '方案写作', l: 'L3 精通', n: '安全先行提案', s: 'doing', pct: 70, crit: '面向机构和制造业客户，开篇用三句话讲清数据安全，并给出可核验的证据（认证、部署方式、白皮书）。', pre: [['方案写作 L2 痛点价值映射', 'done'], ['合规知识 L2 数据安全与 ISO 27001', 'doing']], unl: 'L4 招投标方案', ev: ['卡塔尔机场培训方案（3 处修改）', '经验 L-0231 · 已验证 3 次', '半导体客户提案'], steps: ['done', 'done', 'done', 'todo', 'doing'] },
      p4: { d: '方案写作', l: 'L4 专家', n: '招投标方案', s: 'lock', crit: '独立完成政府与大型机构招投标的技术方案和评分响应表。', pre: [['方案写作 L3 安全先行提案', 'doing']], unl: '岗位等级 L4 专家', ev: [] },
      g1: { d: '合规知识', l: 'L1 基础', n: 'PDPA 基础', s: 'done', crit: '说清培训数据中哪些属于个人数据，以及收集、保存、删除的基本要求。', pre: [], unl: 'L2 数据安全与 ISO 27001', ev: ['新学员数据收集表修订'] },
      g2: { d: '合规知识', l: 'L2 应用', n: '数据安全与 ISO 27001', s: 'doing', pct: 55, focus: true, crit: '能向客户 IT 部门解释我们的信息安全控制措施、部署方式和事件响应流程。', pre: [['合规知识 L1 PDPA 基础', 'done']], unl: 'L3 行业合规课程化，以及方案写作 L3 安全先行提案', ev: ['公司 ISO 27001 认证项目文档', '测评：合规知识 54 分'], steps: ['done', 'doing', 'todo', 'todo', 'todo'] },
      g3: { d: '合规知识', l: 'L3 精通', n: '行业合规课程化', s: 'lock', crit: '把行业法规转化为员工学得会、考得了的合规课程。', pre: [['合规知识 L2 数据安全与 ISO 27001', 'doing'], ['课程设计 L2 案例驱动设计', 'done']], unl: 'L4 合规培训顾问', ev: [] },
      g4: { d: '合规知识', l: 'L4 专家', n: '合规培训顾问', s: 'lock', crit: '为客户做培训合规诊断，并给出整改与培训建议。', pre: [['合规知识 L3 行业合规课程化', 'lock']], unl: '岗位等级 L4 专家', ev: [] },
      k1: { d: '课程设计', l: 'L1 基础', n: '学习目标设计', s: 'done', crit: '写出可衡量的学习目标：行为 + 条件 + 标准。', pre: [], unl: 'L2 案例驱动设计', ev: ['测评题：学习目标（答对）'] },
      k2: { d: '课程设计', l: 'L2 应用', n: '案例驱动设计', s: 'done', crit: '课程的每一节都由本行业真实案例驱动练习。', pre: [['课程设计 L1 学习目标设计', 'done']], unl: 'L3 WSQ 课程开发', ev: ['SOP L-0219 · 验证 10 次', '食品安全课程大纲'] },
      k3: { d: '课程设计', l: 'L3 精通', n: 'WSQ 课程开发', s: 'done', crit: '按 WSQ 格式完成课程大纲、评估计划和教案。', pre: [['课程设计 L2 案例驱动设计', 'done']], unl: 'L4 学习效果评估', ev: ['新员工入职课（WSQ）', '测评：课程设计 81 分'] },
      k4: { d: '课程设计', l: 'L4 专家', n: '学习效果评估', s: 'doing', pct: 20, crit: '用柯氏四级评估课程效果，并向客户交付数据报告。', pre: [['课程设计 L3 WSQ 课程开发', 'done']], unl: '岗位等级 L4 专家', ev: [], steps: ['doing', 'todo', 'todo', 'todo', 'todo'] }
    };
    var STEP: any = [
      { k: '学', t: 'AI 视频课', href: '/video' },
      { k: '练', t: '游戏与陪练', href: '/game' },
      { k: '用', t: '在真实任务中应用', href: '/task' },
      { k: '测', t: '节点测评', href: '/assess' },
      { k: '沉淀', t: '形成经验卡', href: '/lessons' }
    ];
    var sel: any = this.state.sel;
    var ring: any = {}, pick: any = {}, pressed: any = {};
    Object.keys(N).forEach(function (id: any) {
      ring[id] = id === sel ? '0 0 0 3px #FFFFFF, 0 0 0 6px #1B2A4A' : 'none';
      pressed[id] = id === sel ? 'true' : 'false';
      pick[id] = function () { self.setState({ sel: id }); };
    });
    var raw: any = N[sel];
    var stLabel: any = { done: '已掌握', doing: (raw.focus ? '本周重点 · ' : '学习中 · ') + (raw.pct || 0) + '%', lock: '未解锁' };
    var stBg: any = { done: '#E6F2EC', doing: '#FBF0DC', lock: '#EEF0EC' };
    var stFg: any = { done: '#1F5E43', doing: '#7A4E0E', lock: '#5B6577' };
    var node: any = Object.assign({}, raw, { sLabel: stLabel[raw.s], sBg: stBg[raw.s], sFg: stFg[raw.s] });
    var states: any = raw.steps || (raw.s === 'done' ? ['done', 'done', 'done', 'done', 'done'] : ['todo', 'todo', 'todo', 'todo', 'todo']);
    var steps: any = STEP.map(function (x: any, i: any) {
      var s: any = states[i];
      return Object.assign({}, x, {
        stateLabel: s === 'done' ? '已完成' : (s === 'doing' ? '进行中' : '待开始'),
        stateFg: s === 'done' ? '#1F5E43' : (s === 'doing' ? '#7A4E0E' : '#5B6577'),
        bg: s === 'done' ? '#F0F7F3' : (s === 'doing' ? '#FDF7EC' : '#FFFFFF'),
        border: s === 'done' ? '#CFE5D9' : (s === 'doing' ? '#E8A33D' : '#E3E6E1'),
        dotBg: s === 'done' ? '#2E7D5B' : (s === 'doing' ? '#E8A33D' : '#EEF0EC'),
        dotFg: s === 'done' ? '#FFFFFF' : '#1B2A4A'
      });
    });
    var nextIdx: any = -1;
    states.forEach(function (s: any, i: any) { if (nextIdx < 0 && s !== 'done') nextIdx = i; });
    var pre: any = raw.pre.map(function (p: any) {
      return { name: p[0], label: p[1] === 'done' ? '已掌握' : (p[1] === 'doing' ? '学习中' : '未解锁'), fg: p[1] === 'done' ? '#1F5E43' : (p[1] === 'doing' ? '#7A4E0E' : '#5B6577') };
    });
    var route: any = [
      { id: 'g2', name: '合规知识 L2 · 数据安全与 ISO 27001', when: '本周 · 它是下一个节点的前置' },
      { id: 'p3', name: '方案写作 L3 · 安全先行提案', when: '第 2–3 周 · 已完成 70%' },
      { id: 'c3', name: '客户沟通 L3 · 价格谈判', when: '第 3–4 周 · 已完成 40%' }
    ].map(function (r: any, i: any) {
      var on: any = r.id === sel;
      return Object.assign({}, r, { no: i + 1, bg: on ? '#F0F7F3' : '#FFFFFF', border: on ? '#2E7D5B' : '#E3E6E1', go: function () { self.setState({ sel: r.id }); } });
    });
    return {
      ring: ring, pick: pick, pressed: pressed,
      node: node,
      steps: steps,
      pre: pre,
      noPre: pre.length === 0,
      ev: raw.ev,
      noEv: raw.ev.length === 0,
      canGo: raw.s === 'doing' && nextIdx >= 0,
      nextHref: nextIdx >= 0 ? STEP[nextIdx].href : '/learn',
      nextLabel: nextIdx >= 0 ? STEP[nextIdx].k + ' · ' + STEP[nextIdx].t : '',
      route: route,
      today: [
        { type: '任务', tBg: '#EEF1F6', tFg: '#1B2A4A', node: 'p3', text: '卡塔尔机场培训方案初稿：你把“数据安全”挪到了第一条亮点', nodeName: '方案写作 L3 · 安全先行提案', gain: '“用”这一步 +1 条证据，进度 65% → 70%' },
        { type: '问题', tBg: '#FBE9E6', tFg: '#8A2B1F', node: 'g2', text: '和 AI 教练模拟时，答不上“离职员工的数据多久删除”', nodeName: '合规知识 L2 · 数据安全与 ISO 27001', gain: '定位到知识缺口，已生成明天的 3 分钟视频和 2 道练习题' },
        { type: '修改', tBg: '#FBF0DC', tFg: '#7A4E0E', node: 'c3', text: '食品企业报价邮件：你删掉三档价格，改成先问预算', nodeName: '客户沟通 L3 · 价格谈判', gain: '已进入今晚复盘的候选经验，收下后进度 +10%' },
        { type: '任务', tBg: '#EEF1F6', tFg: '#1B2A4A', node: 'g2', text: '半导体安全合规课程大纲（今天 17:00 截止）', nodeName: '合规知识 L2 · 数据安全与 ISO 27001', gain: '真实练习机会：AI 会在输出中标出需要法规依据的地方，你补充后计入进度' }
      ].map(function (t: any) {
        var on: any = t.node === sel;
        return Object.assign({}, t, { bg: on ? '#F0F7F3' : '#FFFFFF', border: on ? '#2E7D5B' : '#E3E6E1', go: function () { self.setState({ sel: t.node }); } });
      })
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/skills"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "36px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "700" }}>技能图谱</h1>
                <p style={{ margin: "0", fontSize: "15px", color: "#5B6577", maxWidth: "640px", lineHeight: "1.7" }}>你学的每一个视频、玩的每一局游戏、做的每一项任务，都挂在这张图谱的某个节点上。按岗位能力模型一级一级往上走，而不是想到什么学什么。</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="path" style={{ fontSize: "13px", fontWeight: "600", color: "#5B6577" }}>岗位路径</label>
                <select id="path" style={{ height: "44px", minWidth: "240px", font: "inherit", fontSize: "15px", fontWeight: "600", color: "#1B2A4A", border: "1px solid #CDD3DB", borderRadius: "10px", padding: "0 12px", background: "#FFFFFF" }}>
                  <option>企业培训解决方案顾问</option>
                  <option>课程设计师</option>
                  <option>客户成功经理</option>
                </select>
              </div>
            </header>
            <section aria-label="当前进度" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#C9D2DF" }}>当前岗位等级</span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>L2 应用</span>
                <span style={{ fontSize: "13px", color: "#E8A33D", fontWeight: "600" }}>目标：L3 精通</span>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>已掌握节点</span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>
                  8{" "}
                  <span style={{ fontSize: "15px", fontWeight: "500", color: "#5B6577" }}>/ 16</span>
                </span>
                <div style={{ height: "6px", borderRadius: "3px", background: "#EEF0EC" }}><div style={{ width: "50%", height: "6px", borderRadius: "3px", background: "#2E7D5B" }} /></div>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>学习中</span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>4 个节点</span>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>本周重点：数据安全与 ISO 27001</span>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "14px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>预计达到 L3</span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>5 周后</span>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>按每天 15 分钟 + 日常任务</span>
              </div>
            </section>
            <section aria-labelledby="today-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                <h2 id="today-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>今天的工作，正在练哪些节点</h2>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>10月19日 · 来自任务、修改和 AI 教练对话</span>
              </div>
              <p style={{ margin: "0", fontSize: "14px", color: "#5B6577", lineHeight: "1.7" }}>图谱不是另一套要额外上的课。你每天的任务、做出的修改和卡住的问题，都会被归到对应节点，推动进度或生成下一步练习。点击一行，在图谱中定位。</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {v.today.map((t: any, i0: number) => (
                  <button key={i0} type="button" onClick={t.go} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 16px", minHeight: "64px", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${t.border}`, background: t.bg, color: "#1B2A4A", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "6px", background: t.tBg, color: t.tFg, whiteSpace: "nowrap" }}>{t.type}</span>
                    <span style={{ flex: "2 1 280px", fontSize: "15px", fontWeight: "500", lineHeight: "1.6" }}>{t.text}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AA8BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#1F5E43" }}>{t.nodeName}</span>
                      <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.5" }}>{t.gain}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <section aria-labelledby="map-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <h2 id="map-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>4 个能力领域 × 4 个等级</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13px", color: "#5B6577" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#2E7D5B" }} />
                    已掌握
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", border: "2px solid #E8A33D", boxSizing: "border-box" }} />
                    学习中
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#FBF0DC", border: "2px solid #E8A33D", boxSizing: "border-box" }} />
                    本周重点
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#EEF0EC", border: "1px dashed #9AA8BC", boxSizing: "border-box" }} />
                    未解锁
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "20px", borderTop: "2px dashed #D08A1E" }} />
                    跨领域前置
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ background: "#1B2A4A", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", padding: "1px 8px", borderRadius: "999px" }}>今日</span>
                    今天的工作涉及
                  </span>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <div style={{ position: "relative", width: "1080px", height: "520px", margin: "0 auto" }}>
                  <div style={{ position: "absolute", left: "618px", top: "52px", width: "204px", height: "456px", background: "#FDF7EC", borderRadius: "14px" }} />
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "330px", top: "96px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#2E7D5B", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-1" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#2E7D5B" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-1)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "570px", top: "96px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#9AA8BC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-2" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#9AA8BC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-2)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "810px", top: "96px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#B8C0CC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-3" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#B8C0CC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-3)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "330px", top: "216px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#2E7D5B", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-4" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#2E7D5B" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-4)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "570px", top: "216px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#9AA8BC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-5" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#9AA8BC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-5)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "810px", top: "216px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#B8C0CC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-6" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#B8C0CC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-6)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "330px", top: "336px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#9AA8BC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-7" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#9AA8BC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-7)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "570px", top: "336px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#B8C0CC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-8" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#B8C0CC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-8)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "810px", top: "336px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#B8C0CC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-9" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#B8C0CC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-9)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "330px", top: "456px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#2E7D5B", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-10" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#2E7D5B" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-10)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "570px", top: "456px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#2E7D5B", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-11" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#2E7D5B" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-11)" />
                  </svg>
                  <svg width="59" height="8" viewBox="0 0 59 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "810px", top: "456px", width: "59px", height: "8px", overflow: "visible", fill: "none", stroke: "#9AA8BC", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-12" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#9AA8BC" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 0 4 L 55 4" markerEnd="url(#dc-arrow-head-filled-12)" />
                  </svg>
                  <svg width="8" height="24" viewBox="0 0 8 24" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "506px", top: "280px", width: "8px", height: "24px", overflow: "visible", fill: "none", stroke: "#D08A1E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <path d="M 4 0 L 4 24" />
                  </svg>
                  <svg width="180" height="8" viewBox="0 0 180 8" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "510px", top: "276px", width: "180px", height: "8px", overflow: "visible", fill: "none", stroke: "#D08A1E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: "5 5" }}>
                    <path d="M 0 4 L 180 4" />
                  </svg>
                  <svg width="8" height="23" viewBox="0 0 8 23" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "686px", top: "257px", width: "8px", height: "23px", overflow: "visible", fill: "none", stroke: "#D08A1E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <defs>
                      <marker id="dc-arrow-head-filled-13" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                        <path d="M0 0 L4 2 L0 4 Z" fill="#D08A1E" stroke="none" style={{ stroke: "none", fill: "context-stroke" }} />
                      </marker>
                    </defs>
                    <path d="M 4 23 L 4 4" markerEnd="url(#dc-arrow-head-filled-13)" />
                  </svg>
                  <div style={{ position: "absolute", left: "150px", top: "16px", width: "180px", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#5B6577" }}>L1 基础</div>
                  <div style={{ position: "absolute", left: "390px", top: "16px", width: "180px", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#1B2A4A" }}>L2 应用 · 当前</div>
                  <div style={{ position: "absolute", left: "630px", top: "16px", width: "180px", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#7A4E0E" }}>L3 精通 · 目标</div>
                  <div style={{ position: "absolute", left: "870px", top: "16px", width: "180px", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#5B6577" }}>L4 专家</div>
                  <div style={{ position: "absolute", left: "0px", top: "64px", width: "130px", height: "72px", display: "flex", alignItems: "center", fontSize: "15px", lineHeight: "1.5" }}>
                    <span>
                      <b>客户沟通</b>
                      <br />
                      <span style={{ fontSize: "13px", color: "#5B6577" }}>65 分</span>
                    </span>
                  </div>
                  <div style={{ position: "absolute", left: "0px", top: "184px", width: "130px", height: "72px", display: "flex", alignItems: "center", fontSize: "15px", lineHeight: "1.5" }}>
                    <span>
                      <b>方案写作</b>
                      <br />
                      <span style={{ fontSize: "13px", color: "#5B6577" }}>72 分</span>
                    </span>
                  </div>
                  <div style={{ position: "absolute", left: "0px", top: "304px", width: "130px", height: "72px", display: "flex", alignItems: "center", fontSize: "15px", lineHeight: "1.5" }}>
                    <span>
                      <b>合规知识</b>
                      <br />
                      <span style={{ fontSize: "13px", color: "#7A4E0E", fontWeight: "600" }}>54 分 · 短板</span>
                    </span>
                  </div>
                  <div style={{ position: "absolute", left: "0px", top: "424px", width: "130px", height: "72px", display: "flex", alignItems: "center", fontSize: "15px", lineHeight: "1.5" }}>
                    <span>
                      <b>课程设计</b>
                      <br />
                      <span style={{ fontSize: "13px", color: "#5B6577" }}>81 分</span>
                    </span>
                  </div>
                  <button type="button" onClick={v.pick.c1} aria-pressed={v.pressed.c1} style={{ position: "absolute", left: "150px", top: "64px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.c1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>需求挖掘</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.c2} aria-pressed={v.pressed.c2} style={{ position: "absolute", left: "390px", top: "64px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.c2 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>异议处理</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.c3} aria-pressed={v.pressed.c3} style={{ position: "absolute", left: "630px", top: "64px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "2px solid #E8A33D", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.c3 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D08A1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <circle cx="12" cy="12" r="8" stroke="#F1D9AE" />
                      <path d="M12 4a8 8 0 0 1 7.6 5.5" />
                    </svg>
                    <span>
                      <b>价格谈判</b>
                      <br />
                      学习中 · 40%
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.c4} aria-pressed={v.pressed.c4} style={{ position: "absolute", left: "870px", top: "64px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "1px dashed #9AA8BC", background: "#EEF0EC", color: "#5B6577", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.c4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span>
                      <b>战略客户经营</b>
                      <br />
                      未解锁
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.p1} aria-pressed={v.pressed.p1} style={{ position: "absolute", left: "150px", top: "184px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.p1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>结构化写作</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.p2} aria-pressed={v.pressed.p2} style={{ position: "absolute", left: "390px", top: "184px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.p2 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>痛点价值映射</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.p3} aria-pressed={v.pressed.p3} style={{ position: "absolute", left: "630px", top: "184px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "2px solid #E8A33D", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.p3 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D08A1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <circle cx="12" cy="12" r="8" stroke="#F1D9AE" />
                      <path d="M12 4a8 8 0 1 1 -7.6 10.5" />
                    </svg>
                    <span>
                      <b>安全先行提案</b>
                      <br />
                      学习中 · 70%
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.p4} aria-pressed={v.pressed.p4} style={{ position: "absolute", left: "870px", top: "184px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "1px dashed #9AA8BC", background: "#EEF0EC", color: "#5B6577", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.p4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span>
                      <b>招投标方案</b>
                      <br />
                      未解锁
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.g1} aria-pressed={v.pressed.g1} style={{ position: "absolute", left: "150px", top: "304px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.g1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>PDPA 基础</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.g2} aria-pressed={v.pressed.g2} style={{ position: "absolute", left: "390px", top: "304px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "2px solid #E8A33D", background: "#FBF0DC", color: "#1B2A4A", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.g2 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D08A1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <circle cx="12" cy="12" r="8" stroke="#F1D9AE" />
                      <path d="M12 4a8 8 0 0 1 3 15.4" />
                    </svg>
                    <span>
                      <b>数据安全与 ISO 27001</b>
                      <br />
                      本周重点 · 55%
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.g3} aria-pressed={v.pressed.g3} style={{ position: "absolute", left: "630px", top: "304px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "1px dashed #9AA8BC", background: "#EEF0EC", color: "#5B6577", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.g3 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span>
                      <b>行业合规课程化</b>
                      <br />
                      未解锁
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.g4} aria-pressed={v.pressed.g4} style={{ position: "absolute", left: "870px", top: "304px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "1px dashed #9AA8BC", background: "#EEF0EC", color: "#5B6577", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.g4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span>
                      <b>合规培训顾问</b>
                      <br />
                      未解锁
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.k1} aria-pressed={v.pressed.k1} style={{ position: "absolute", left: "150px", top: "424px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.k1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>学习目标设计</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.k2} aria-pressed={v.pressed.k2} style={{ position: "absolute", left: "390px", top: "424px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.k2 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>案例驱动设计</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.k3} aria-pressed={v.pressed.k3} style={{ position: "absolute", left: "630px", top: "424px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "none", background: "#2E7D5B", color: "#FFFFFF", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.k3 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>
                      <b>WSQ 课程开发</b>
                      <br />
                      已掌握
                    </span>
                  </button>
                  <button type="button" onClick={v.pick.k4} aria-pressed={v.pressed.k4} style={{ position: "absolute", left: "870px", top: "424px", width: "180px", height: "72px", boxSizing: "border-box", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", borderRadius: "12px", border: "2px solid #E8A33D", background: "#FFFFFF", color: "#1B2A4A", font: "inherit", fontSize: "14px", lineHeight: "1.45", cursor: "pointer", boxShadow: v.ring.k4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D08A1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <circle cx="12" cy="12" r="8" stroke="#F1D9AE" />
                      <path d="M12 4a8 8 0 0 1 4.7 1.5" />
                    </svg>
                    <span>
                      <b>学习效果评估</b>
                      <br />
                      学习中 · 20%
                    </span>
                  </button>
                  <div style={{ position: "absolute", left: "766px", top: "54px", width: "44px", height: "20px", borderRadius: "999px", background: "#1B2A4A", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    今日
                  </div>
                  <div style={{ position: "absolute", left: "766px", top: "174px", width: "44px", height: "20px", borderRadius: "999px", background: "#1B2A4A", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    今日
                  </div>
                  <div style={{ position: "absolute", left: "526px", top: "294px", width: "44px", height: "20px", borderRadius: "999px", background: "#1B2A4A", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    今日
                  </div>
                </div>
              </div>
              <p style={{ margin: "0", fontSize: "13px", color: "#5B6577", lineHeight: "1.7" }}>同一领域内必须逐级解锁；橙色虚线表示跨领域前置：先学会“数据安全与 ISO 27001”，“安全先行提案”才能达标。点击任意节点查看详情。</p>
            </section>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
              <section aria-labelledby="node-h" style={{ flex: "999 1 560px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "24px 26px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>{v.node.d}{" · "}{v.node.l}</span>
                    <h2 id="node-h" style={{ margin: "0", fontSize: "22px", fontWeight: "700" }}>{v.node.n}</h2>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "700", padding: "4px 12px", borderRadius: "999px", background: v.node.sBg, color: v.node.sFg }}>{v.node.sLabel}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>掌握标准</span>
                  <span style={{ fontSize: "15px", lineHeight: "1.8" }}>{v.node.crit}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>这个节点的五步闭环</span>
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
                    {v.steps.map((st: any, i0: number) => (
                      <li key={i0} style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: "12px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: st.dotBg, color: st.dotFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: "0" }}>
                            {st.k}
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: st.stateFg }}>{st.stateLabel}</span>
                        </span>
                        <Link href={st.href} style={{ fontSize: "14px", fontWeight: "600", color: "#1B2A4A", textDecoration: "none", lineHeight: "1.5" }}>{st.t}</Link>
                      </li>
                    ))}
                  </ol>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>前置条件</span>
                    {v.noPre ? (
                      <span style={{ fontSize: "14px", color: "#5B6577" }}>无，入门节点</span>
                    ) : null}
                    {v.pre.map((pr: any, i0: number) => (
                      <div key={i0} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", minHeight: "40px", padding: "0 12px", borderRadius: "10px", background: "#F5F6F3", fontSize: "14px" }}>
                        <span>{pr.name}</span>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: pr.fg, whiteSpace: "nowrap" }}>{pr.label}</span>
                      </div>
                    ))}
                    <span style={{ fontSize: "13px", color: "#5B6577", marginTop: "4px" }}>掌握后解锁：{v.node.unl}</span>
                  </div>
                  <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>来自日常工作的证据</span>
                    {v.noEv ? (
                      <span style={{ fontSize: "14px", color: "#5B6577" }}>解锁后，相关任务的修改和反馈会自动记到这里。</span>
                    ) : null}
                    {v.ev.map((e: any, i0: number) => (
                      <Link key={i0} href="/lessons" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "40px", padding: "0 12px", border: "1px solid #E3E6E1", borderRadius: "10px", fontSize: "14px", color: "#1B2A4A", textDecoration: "none" }}>
                        {e}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
                {v.canGo ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingTop: "4px" }}>
                    <Link href={v.nextHref} style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 22px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                      继续：{v.nextLabel}
                    </Link>
                    <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 20px", borderRadius: "10px", border: "1px solid #CDD3DB", color: "#1B2A4A", fontSize: "15px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                      问 AI 教练怎么学
                    </Link>
                  </div>
                ) : null}
              </section>
              <aside style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
                <section aria-labelledby="route-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="route-h" style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>通往 L3 精通的路线</h2>
                  <span style={{ fontSize: "13px", color: "#5B6577", lineHeight: "1.6" }}>L3 需要掌握 4 个领域的 L3 节点，还差 3 个。按依赖关系排好了顺序：</span>
                  {v.route.map((r: any, i0: number) => (
                    <button key={i0} type="button" onClick={r.go} style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", padding: "8px 12px", borderRadius: "12px", border: `1px solid ${r.border}`, background: r.bg, color: "#1B2A4A", font: "inherit", textAlign: "left", cursor: "pointer" }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1B2A4A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: "0" }}>
                        {r.no}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700" }}>{r.name}</span>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>{r.when}</span>
                      </span>
                    </button>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "52px", padding: "8px 12px", borderRadius: "12px", background: "#E6F2EC", color: "#1F5E43" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 21V4h11l-2 4 2 4H5" />
                    </svg>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>第 5 周：L3 综合测评，通过后升级岗位等级</span>
                  </div>
                </section>
                <section aria-labelledby="sys-h" style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h2 id="sys-h" style={{ margin: "0", fontSize: "17px", fontWeight: "700" }}>一切都连在这张图上</h2>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8A33D", marginTop: "8px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#E6EBF2" }}>每个视频、游戏关卡和测评题都对应一个节点，学完直接计入该节点的进度。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8A33D", marginTop: "8px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#E6EBF2" }}>真实任务里的修改和复盘收下的经验卡，会作为“用”和“沉淀”两步的证据。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8A33D", marginTop: "8px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#E6EBF2" }}>每日 15 分钟的学习计划，从图谱上“下一个该学的节点”自动生成。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8A33D", marginTop: "8px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#E6EBF2" }}>AI 教练和工作 Agent 都读取这张图，知道你现在在哪、下一步去哪。</span>
                  </div>
                </section>
              </aside>
            </div>
            <section aria-labelledby="grow-h" style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "24px 26px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <h2 id="grow-h" style={{ margin: "0", fontSize: "18px", fontWeight: "700" }}>成长曲线</h2>
                  <span style={{ fontSize: "13px", color: "#5B6577" }}>综合能力分 = 每周测评 × 50% + 日常任务证据 × 50%</span>
                </div>
                <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#5B6577" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "20px", borderTop: "3px solid #2E7D5B" }} />
                    实际
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "20px", borderTop: "3px dashed #E8A33D" }} />
                    按当前节奏预测
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ flex: "999 1 560px", minWidth: "0" }}>
                  <svg viewBox="0 0 740 290" width="100%" role="img" aria-label="成长曲线：第 1 周 52 分，第 3 到 5 周停在 55 到 57 分的平台期，开始任务驱动练习后上升到本周 74 分，预计第 13 周达到 81 分、进入 L3 精通" style={{ display: "block", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif" }}>
                    <rect x="56" y="24" width="660" height="44" fill="#FDF7EC" />
                    <rect x="166" y="24" width="110" height="220" fill="#F0F2EE" />
                    <text x="221" y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5B6577">平台期</text>
                    <line x1="56" y1="244" x2="716" y2="244" stroke="#CDD3DB" strokeWidth="1" />
                    <line x1="56" y1="200" x2="716" y2="200" stroke="#EEF0EC" strokeWidth="1" />
                    <line x1="56" y1="156" x2="716" y2="156" stroke="#9AA8BC" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="56" y1="112" x2="716" y2="112" stroke="#EEF0EC" strokeWidth="1" />
                    <line x1="56" y1="68" x2="716" y2="68" stroke="#D08A1E" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="48" y="248" textAnchor="end" fontSize="12" fill="#5B6577">40</text>
                    <text x="48" y="204" textAnchor="end" fontSize="12" fill="#5B6577">50</text>
                    <text x="48" y="160" textAnchor="end" fontSize="12" fill="#5B6577">60</text>
                    <text x="48" y="116" textAnchor="end" fontSize="12" fill="#5B6577">70</text>
                    <text x="48" y="72" textAnchor="end" fontSize="12" fill="#5B6577">80</text>
                    <text x="48" y="28" textAnchor="end" fontSize="12" fill="#5B6577">90</text>
                    <text x="710" y="150" textAnchor="end" fontSize="12" fontWeight="700" fill="#5B6577">L2 应用 · 60</text>
                    <text x="62" y="62" fontSize="12" fontWeight="700" fill="#7A4E0E">L3 精通 · 80</text>
                    <polyline points="441,94.4 496,85.6 551,81.2 606,76.8 661,72.4 716,63.6" fill="none" stroke="#E8A33D" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="56,191.2 111,182.4 166,178 221,173.6 276,169.2 331,142.8 386,120.8 441,94.4" fill="none" stroke="#2E7D5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="56" cy="191.2" r="4" fill="#FFFFFF" stroke="#2E7D5B" strokeWidth="2" />
                    <circle cx="111" cy="182.4" r="4" fill="#FFFFFF" stroke="#2E7D5B" strokeWidth="2" />
                    <circle cx="166" cy="178" r="4" fill="#FFFFFF" stroke="#2E7D5B" strokeWidth="2" />
                    <circle cx="221" cy="173.6" r="4" fill="#FFFFFF" stroke="#2E7D5B" strokeWidth="2" />
                    <circle cx="276" cy="169.2" r="5" fill="#1B2A4A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="331" cy="142.8" r="4" fill="#FFFFFF" stroke="#2E7D5B" strokeWidth="2" />
                    <circle cx="386" cy="120.8" r="5" fill="#1B2A4A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="441" cy="94.4" r="7" fill="#2E7D5B" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="716" cy="63.6" r="5" fill="#FFFFFF" stroke="#E8A33D" strokeWidth="2.5" />
                    <text x="284" y="196" fontSize="12" fontWeight="700" fill="#1B2A4A">① 开始任务驱动练习 + 每日复盘</text>
                    <text x="394" y="140" fontSize="12" fontWeight="700" fill="#1B2A4A">② 收下 L-0231</text>
                    <text x="451" y="118" fontSize="13" fontWeight="700" fill="#1F5E43">本周 74 分</text>
                    <text x="712" y="50" textAnchor="end" fontSize="12" fontWeight="700" fill="#7A4E0E">L3 综合测评</text>
                    <text x="56" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W1</text>
                    <text x="111" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W2</text>
                    <text x="166" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W3</text>
                    <text x="221" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W4</text>
                    <text x="276" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W5</text>
                    <text x="331" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W6</text>
                    <text x="386" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W7</text>
                    <text x="441" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1B2A4A">本周</text>
                    <text x="496" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W9</text>
                    <text x="551" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W10</text>
                    <text x="606" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W11</text>
                    <text x="661" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W12</text>
                    <text x="716" y="270" textAnchor="middle" fontSize="12" fill="#5B6577">W13</text>
                  </svg>
                </div>
                <div style={{ flex: "1 1 280px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700" }}>成长的四个阶段</span>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: "#EEF1F6", whiteSpace: "nowrap" }}>入门</span>
                    <span style={{ fontSize: "13px", lineHeight: "1.7", color: "#1B2A4A" }}>W1–2：新知识多，分数上升快。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: "#EEF0EC", whiteSpace: "nowrap" }}>平台期</span>
                    <span style={{ fontSize: "13px", lineHeight: "1.7", color: "#1B2A4A" }}>W3–5：只看视频、不在工作里用，分数停在 55 分左右。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: "#E6F2EC", color: "#1F5E43", whiteSpace: "nowrap" }}>突破</span>
                    <span style={{ fontSize: "13px", lineHeight: "1.7", color: "#1B2A4A" }}>W6–8：学习内容来自当天任务，修改变成经验，每周涨 5 分以上。</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: "#FBF0DC", color: "#7A4E0E", whiteSpace: "nowrap" }}>精通</span>
                    <span style={{ fontSize: "13px", lineHeight: "1.7", color: "#1B2A4A" }}>预计 W13 通过 L3 综合测评，升级岗位等级。</span>
                  </div>
                  <div style={{ background: "#F5F6F3", borderRadius: "12px", padding: "14px 16px", fontSize: "13px", lineHeight: "1.7", color: "#1B2A4A" }}>
                    平台期还会再出现。连续 2 周增长不到 2 分时，AI 教练会主动找你，换一种练法，比如从看视频改成模拟陪练。
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
