"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { AgentNav } from "@/components/agent-nav";
import { useLang, type Lang } from "@/components/lang";
import { DOMAINS, EDGES, LEVELS, NODES, TARGET, mastery, type SkillNode, type Status, type Text } from "@/lib/skills";

const INK = "#1B2A4A";
const MUTED = "#5B6577";
const LINE = "#E6E8E3";
const GRID = "#E9ECE7";
// 状态色沿用技能图谱页：已掌握 / 学习中 / 未解锁，均配图标与文字
const STATUS: Record<Status, { fill: string; stroke: string; label: Text }> = {
  done: { fill: "#2E7D5B", stroke: "#2E7D5B", label: { zh: "已掌握", en: "Mastered" } },
  doing: { fill: "#FFFFFF", stroke: "#E8A33D", label: { zh: "学习中", en: "Learning" } },
  lock: { fill: "#F1F2EF", stroke: "#B8C0CC", label: { zh: "未解锁", en: "Locked" } },
};
const CROSS = "#D08A1E";
// 雷达图两组系列（已用校验脚本通过 CVD 与对比度检查）
const NOW = "#2a78d6";
const PREV = "#eb6834";

const T = {
  title: { zh: "学习进度", en: "Learner progress" },
  lede: {
    zh: "把技能图谱换成两种看法：网状图看节点之间怎么解锁，雷达图看四个能力领域是否均衡、离 L3 目标还差多少。",
    en: "Two views of the skill map: the network shows how skills unlock each other; the radar shows how balanced the four domains are and how far each is from the L3 target.",
  },
  learner: { zh: "学习者", en: "Learner" },
  role: { zh: "Yu · 企业培训解决方案顾问", en: "Yu · Training solutions consultant" },
  level: { zh: "当前岗位等级", en: "Current level" },
  levelVal: { zh: "L2 应用", en: "L2 Applied" },
  levelGoal: { zh: "目标：L3 精通", en: "Goal: L3 Proficient" },
  mastered: { zh: "已掌握节点", en: "Skills mastered" },
  learning: { zh: "学习中", en: "In progress" },
  learningSub: { zh: "本周重点：数据安全与 ISO 27001", en: "Focus: Data security & ISO 27001" },
  overall: { zh: "测评平均分", en: "Assessment average" },
  overallSub: { zh: "四个领域本次测评平均，较上次", en: "Mean of the four domains, vs previous" },
  netTitle: { zh: "技能网状图", en: "Skill network" },
  netSub: { zh: "由内向外 L1 → L4；虚线表示尚未打通的前置，橙色为跨领域前置。点击节点查看详情。", en: "Inner to outer ring is L1 → L4. Dashed links are not yet unlocked; orange links are cross-domain prerequisites. Select a skill for details." },
  radarTitle: { zh: "能力雷达图", en: "Ability radar" },
  byDomain: { zh: "能力领域", en: "Domains" },
  byNode: { zh: "技能节点", en: "Skills" },
  radarSubDomain: { zh: "本次与上次测评对比，虚线为 L3 目标 80 分。", en: "Latest vs previous assessment; the dashed ring is the L3 target of 80." },
  radarSubNode: { zh: "16 个技能节点的掌握度（已掌握 = 100%）。", en: "Mastery of all 16 skills (mastered = 100%)." },
  now: { zh: "本次测评", en: "Latest" },
  prev: { zh: "上次测评", en: "Previous" },
  target: { zh: "L3 目标", en: "L3 target" },
  masteryLbl: { zh: "掌握度", en: "Mastery" },
  table: { zh: "表格", en: "Table" },
  chart: { zh: "图表", en: "Chart" },
  domain: { zh: "领域", en: "Domain" },
  levelCol: { zh: "等级", en: "Level" },
  skill: { zh: "技能", en: "Skill" },
  status: { zh: "状态", en: "Status" },
  change: { zh: "变化", en: "Change" },
  pre: { zh: "前置", en: "Requires" },
  unlocks: { zh: "解锁", en: "Unlocks" },
  none: { zh: "无", en: "None" },
  focus: { zh: "本周重点", en: "Focus" },
  cross: { zh: "跨领域前置", en: "Cross-domain prerequisite" },
  openMap: { zh: "在技能图谱中查看", en: "Open in skill map" },
  practise: { zh: "去练习", en: "Practise" },
  gap: { zh: "离目标", en: "to target" },
};

const LIST: Text = { zh: "、", en: ", " };
const COLON: Text = { zh: "：", en: ": " };

const card: CSSProperties = { background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: "16px", padding: "22px 24px", minWidth: 0, display: "flex", flexDirection: "column", gap: "14px" };
const btn = (on: boolean): CSSProperties => ({ height: "34px", padding: "0 12px", borderRadius: "8px", border: "none", background: on ? "#FFFFFF" : "transparent", boxShadow: on ? "0 1px 3px rgba(27,42,74,0.14)" : "none", font: "inherit", fontSize: "13px", fontWeight: on ? 700 : 500, color: INK, cursor: "pointer" });
const th: CSSProperties = { textAlign: "left", padding: "8px 10px", fontSize: "12px", color: MUTED, fontWeight: 700, borderBottom: `1px solid ${LINE}` };
const td: CSSProperties = { padding: "8px 10px", fontSize: "13px", borderBottom: `1px solid #F0F2EE` };

function Segmented<K extends string>({ value, options, onChange, label }: { value: K; options: [K, string][]; onChange: (k: K) => void; label: string }) {
  return (
    <div role="group" aria-label={label} style={{ display: "flex", gap: "2px", background: "#F1F2EF", borderRadius: "10px", padding: "3px" }}>
      {options.map(([k, text]) => (
        <button key={k} type="button" aria-pressed={value === k} onClick={() => onChange(k)} style={btn(value === k)}>{text}</button>
      ))}
    </div>
  );
}

function Tooltip({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  const right = x / w > 0.6;
  return (
    <div role="status" style={{ position: "absolute", left: `${(x / w) * 100}%`, top: `${(y / h) * 100}%`, transform: `translate(${right ? "calc(-100% - 14px)" : "14px"}, -50%)`, background: INK, color: "#FFFFFF", borderRadius: "10px", padding: "8px 12px", fontSize: "12px", lineHeight: 1.6, pointerEvents: "none", whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(27,42,74,0.2)", zIndex: 2 }}>
      {children}
    </div>
  );
}

function Legend({ items }: { items: { swatch: ReactNode; label: string }[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: MUTED }}>
      {items.map((it) => (
        <span key={it.label} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <svg width="18" height="12" aria-hidden="true">{it.swatch}</svg>
          {it.label}
        </span>
      ))}
    </div>
  );
}

function statusText(n: SkillNode, lang: Lang) {
  return n.status === "doing" ? `${STATUS.doing.label[lang]} · ${n.pct}%` : STATUS[n.status].label[lang];
}

/* ---------- 技能网状图 ---------- */

const NW = 800;
const NH = 700;
const CX = 400;
const CY = 350;
const RADII = [80, 150, 220, 290];
const ANGLE = { comm: -135, write: -45, comp: 45, course: 135 } as const;
const NR = 20;

function pos(n: SkillNode) {
  const a = (ANGLE[n.domain] * Math.PI) / 180;
  const r = RADII[n.level - 1];
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

function NodeGlyph({ n, selected }: { n: SkillNode; selected: boolean }) {
  const { x, y } = pos(n);
  const s = STATUS[n.status];
  const arc = 2 * Math.PI * (NR + 4);
  return (
    <g>
      {selected && <circle cx={x} cy={y} r={NR + 9} fill="none" stroke={INK} strokeWidth="3" />}
      <circle cx={x} cy={y} r={NR} fill={s.fill} stroke={s.stroke} strokeWidth="2" strokeDasharray={n.status === "lock" ? "4 3" : undefined} />
      {n.status === "doing" && (
        <circle cx={x} cy={y} r={NR + 4} fill="none" stroke={CROSS} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(arc * (n.pct ?? 0)) / 100} ${arc}`} transform={`rotate(-90 ${x} ${y})`} />
      )}
      {n.status === "done" && <path d={`M${x - 7} ${y}l5 5 9-10`} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
      {n.status === "doing" && <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>{n.pct}</text>}
      {n.status === "lock" && (
        <g fill="none" stroke="#7A8496" strokeWidth="1.8" strokeLinecap="round">
          <rect x={x - 6} y={y - 1} width="12" height="9" rx="2" />
          <path d={`M${x - 3.5} ${y - 1}v-3a3.5 3.5 0 0 1 7 0v3`} />
        </g>
      )}
    </g>
  );
}

function SkillNetwork({ lang, sel, setSel }: { lang: Lang; sel: string; setSel: (id: string) => void }) {
  const [hover, setHover] = useState<string | null>(null);
  const [table, setTable] = useState(false);
  const cur = byId[sel];
  const pre = EDGES.filter((e) => e.to === sel).map((e) => byId[e.from]);
  const unl = EDGES.filter((e) => e.from === sel).map((e) => byId[e.to]);
  const hv = hover ? byId[hover] : null;

  return (
    <section aria-labelledby="net-h" style={card}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "62ch" }}>
          <h2 id="net-h" style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{T.netTitle[lang]}</h2>
          <p style={{ margin: 0, fontSize: "13px", color: MUTED, lineHeight: 1.6 }}>{T.netSub[lang]}</p>
        </div>
        <Segmented label={T.netTitle[lang]} value={table ? "t" : "c"} options={[["c", T.chart[lang]], ["t", T.table[lang]]]} onChange={(k) => setTable(k === "t")} />
      </div>
      <Legend
        items={[
          { label: STATUS.done.label[lang], swatch: <circle cx="9" cy="6" r="5" fill={STATUS.done.fill} /> },
          { label: STATUS.doing.label[lang], swatch: <circle cx="9" cy="6" r="4.5" fill="#FFFFFF" stroke={STATUS.doing.stroke} strokeWidth="2" /> },
          { label: STATUS.lock.label[lang], swatch: <circle cx="9" cy="6" r="4.5" fill={STATUS.lock.fill} stroke={STATUS.lock.stroke} strokeWidth="1.5" strokeDasharray="2 2" /> },
          { label: T.cross[lang], swatch: <path d="M1 6h16" stroke={CROSS} strokeWidth="2" strokeDasharray="4 3" /> },
        ]}
      />

      {table ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th style={th}>{T.domain[lang]}</th><th style={th}>{T.levelCol[lang]}</th><th style={th}>{T.skill[lang]}</th><th style={th}>{T.status[lang]}</th><th style={th}>{T.pre[lang]}</th></tr>
            </thead>
            <tbody>
              {NODES.map((n) => (
                <tr key={n.id}>
                  <td style={td}>{DOMAINS.find((d) => d.id === n.domain)!.name[lang]}</td>
                  <td style={td}>{LEVELS[n.level - 1][lang]}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{n.name[lang]}</td>
                  <td style={td}>{statusText(n, lang)}</td>
                  <td style={td}>{EDGES.filter((e) => e.to === n.id).map((e) => byId[e.from].name[lang]).join(LIST[lang]) || T.none[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
          <svg viewBox={`0 0 ${NW} ${NH}`} width="100%" role="img" aria-label={`${T.netTitle[lang]}: ${NODES.map((n) => `${n.name[lang]} ${statusText(n, lang)}`).join("; ")}`} style={{ display: "block", fontFamily: "inherit" }}>
            <defs>
              <marker id="arrow-cross" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill={CROSS} />
              </marker>
            </defs>
            {RADII.map((r, i) => (
              <g key={r}>
                <circle cx={CX} cy={CY} r={r} fill="none" stroke={GRID} strokeWidth="1" strokeDasharray="3 5" />
                <text x={CX} y={CY - r - 6} textAnchor="middle" fontSize="11" fill={MUTED}>{LEVELS[i][lang]}</text>
              </g>
            ))}
            {DOMAINS.map((d) => {
              const a = (ANGLE[d.id] * Math.PI) / 180;
              // Centred above (top domains) or below (bottom domains) the L4 node, clear of the side labels
              const x = CX + RADII[3] * Math.cos(a);
              const y = CY + RADII[3] * Math.sin(a) + (Math.sin(a) < 0 ? -46 : 58);
              return (
                <text key={d.id} x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>
                  {d.name[lang]} · {d.now}
                </text>
              );
            })}
            {NODES.filter((n) => n.level === 1).map((n) => {
              const p = pos(n);
              return <line key={n.id} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#C9D0D8" strokeWidth="1.5" />;
            })}
            {EDGES.map((e) => {
              const a = pos(byId[e.from]);
              const b = pos(byId[e.to]);
              const open = byId[e.from].status === "done" && byId[e.to].status !== "lock";
              const active = sel === e.from || sel === e.to;
              if (e.cross) {
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                // 控制点推离圆心，让跨领域曲线绕开中心
                const k = 1.9;
                const qx = CX + (mx - CX) * k;
                const qy = CY + (my - CY) * k;
                const len = Math.hypot(b.x - qx, b.y - qy);
                const ex = b.x - ((b.x - qx) / len) * (NR + 8);
                const ey = b.y - ((b.y - qy) / len) * (NR + 8);
                return <path key={e.from + e.to} d={`M${a.x} ${a.y}Q${qx} ${qy} ${ex} ${ey}`} fill="none" stroke={CROSS} strokeWidth={active ? 3 : 2} strokeDasharray="6 4" markerEnd="url(#arrow-cross)" />;
              }
              return <line key={e.from + e.to} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={open || byId[e.to].status === "done" ? STATUS.done.fill : "#B8C0CC"} strokeWidth={active ? 3.5 : 2} strokeDasharray={byId[e.to].status === "lock" ? "5 4" : undefined} />;
            })}
            <circle cx={CX} cy={CY} r="36" fill={INK} />
            <text x={CX} y={CY - 3} textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFFFFF">Yu</text>
            <text x={CX} y={CY + 14} textAnchor="middle" fontSize="11" fill="#C9D2DF">{T.levelVal[lang]}</text>
            {NODES.map((n) => {
              const { x, y } = pos(n);
              const left = x < CX;
              const lx = x + (left ? -(NR + 12) : NR + 12);
              return (
                <g
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.name[lang]}, ${LEVELS[n.level - 1][lang]}, ${statusText(n, lang)}`}
                  aria-pressed={sel === n.id}
                  onClick={() => setSel(n.id)}
                  onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(n.id); } }}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover(null)}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <circle cx={x} cy={y} r={NR + 12} fill="transparent" />
                  <NodeGlyph n={n} selected={sel === n.id} />
                  <text x={lx} y={y - 2} textAnchor={left ? "end" : "start"} fontSize="13" fontWeight="700" fill={INK}>{n.name[lang]}</text>
                  <text x={lx} y={y + 14} textAnchor={left ? "end" : "start"} fontSize="11" fill={MUTED}>
                    {statusText(n, lang)}{n.focus ? ` · ${T.focus[lang]}` : ""}
                  </text>
                </g>
              );
            })}
          </svg>
          {hv && (
            <Tooltip x={pos(hv).x} y={pos(hv).y} w={NW} h={NH}>
              <div style={{ fontWeight: 700 }}>{hv.name[lang]}</div>
              <div>{DOMAINS.find((d) => d.id === hv.domain)!.name[lang]} · {LEVELS[hv.level - 1][lang]}</div>
              <div>{T.masteryLbl[lang]} {mastery(hv)}% · {statusText(hv, lang)}</div>
            </Tooltip>
          )}
        </div>
      )}

      <div aria-live="polite" style={{ borderTop: `1px solid ${LINE}`, paddingTop: "14px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "12px", color: MUTED }}>{DOMAINS.find((d) => d.id === cur.domain)!.name[lang]} · {LEVELS[cur.level - 1][lang]}</span>
          <span style={{ fontSize: "16px", fontWeight: 700 }}>{cur.name[lang]} <span style={{ fontSize: "13px", fontWeight: 600, color: cur.status === "done" ? "#1F5E43" : cur.status === "doing" ? "#7A4E0E" : MUTED }}>{statusText(cur, lang)}</span></span>
          <span style={{ fontSize: "13px", color: MUTED }}>{T.pre[lang]}{COLON[lang]}{pre.map((p) => p.name[lang]).join(LIST[lang]) || T.none[lang]}　{T.unlocks[lang]}{COLON[lang]}{unl.map((p) => p.name[lang]).join(LIST[lang]) || LEVELS[3][lang]}</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/skills" style={{ display: "inline-flex", alignItems: "center", height: "40px", padding: "0 14px", borderRadius: "10px", border: "1px solid #CDD3DB", color: INK, fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>{T.openMap[lang]}</Link>
          {cur.status !== "lock" && <Link href="/session" style={{ display: "inline-flex", alignItems: "center", height: "40px", padding: "0 14px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>{T.practise[lang]}</Link>}
        </div>
      </div>
    </section>
  );
}

/* ---------- 能力雷达图 ---------- */

const RW = 760;
const RH = 580;
const RCX = 380;
const RCY = 295;
const RR = 190;

type Axis = { key: string; label: string; now: number; prev?: number; sub?: string };

function point(i: number, n: number, value: number) {
  const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
  const r = (RR * value) / 100;
  return { x: RCX + r * Math.cos(a), y: RCY + r * Math.sin(a), a };
}

const poly = (vals: number[]) => vals.map((v, i) => { const p = point(i, vals.length, v); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ");

function AbilityRadar({ lang, onPick }: { lang: Lang; onPick: (id: string) => void }) {
  const [mode, setMode] = useState<"domain" | "node">("domain");
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);

  const axes: Axis[] =
    mode === "domain"
      ? DOMAINS.map((d) => ({ key: d.id, label: d.name[lang], now: d.now, prev: d.prev }))
      : NODES.map((n) => ({ key: n.id, label: n.name[lang], now: mastery(n), sub: statusText(n, lang) }));
  const n = axes.length;
  const hasPrev = mode === "domain";
  const hv = hover === null ? null : axes[hover];

  return (
    <section aria-labelledby="radar-h" style={card}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "52ch" }}>
          <h2 id="radar-h" style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{T.radarTitle[lang]}</h2>
          <p style={{ margin: 0, fontSize: "13px", color: MUTED, lineHeight: 1.6 }}>{mode === "domain" ? T.radarSubDomain[lang] : T.radarSubNode[lang]}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <Segmented label={T.radarTitle[lang]} value={mode} options={[["domain", T.byDomain[lang]], ["node", T.byNode[lang]]]} onChange={(m) => { setMode(m); setHover(null); }} />
          <Segmented label={T.table[lang]} value={table ? "t" : "c"} options={[["c", T.chart[lang]], ["t", T.table[lang]]]} onChange={(k) => setTable(k === "t")} />
        </div>
      </div>
      {hasPrev && (
        <Legend
          items={[
            { label: T.now[lang], swatch: <><path d="M1 6h16" stroke={NOW} strokeWidth="2" /><circle cx="9" cy="6" r="3.5" fill={NOW} stroke="#FFFFFF" strokeWidth="1.5" /></> },
            { label: T.prev[lang], swatch: <><path d="M1 6h16" stroke={PREV} strokeWidth="2" /><circle cx="9" cy="6" r="3.5" fill={PREV} stroke="#FFFFFF" strokeWidth="1.5" /></> },
            { label: `${T.target[lang]} ${TARGET}`, swatch: <path d="M1 6h16" stroke="#7A8496" strokeWidth="1.5" strokeDasharray="4 3" /> },
          ]}
        />
      )}

      {table ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>{hasPrev ? T.domain[lang] : T.skill[lang]}</th>
                <th style={{ ...th, textAlign: "right" }}>{hasPrev ? T.now[lang] : T.masteryLbl[lang]}</th>
                {hasPrev && <th style={{ ...th, textAlign: "right" }}>{T.prev[lang]}</th>}
                {hasPrev && <th style={{ ...th, textAlign: "right" }}>{T.change[lang]}</th>}
                <th style={{ ...th, textAlign: "right" }}>{hasPrev ? `${T.gap[lang]} ${TARGET}` : T.status[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {axes.map((ax) => (
                <tr key={ax.key}>
                  <td style={{ ...td, fontWeight: 600 }}>{ax.label}</td>
                  <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{ax.now}{hasPrev ? "" : "%"}</td>
                  {hasPrev && <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{ax.prev}</td>}
                  {hasPrev && <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{signed(ax.now - (ax.prev ?? 0))}</td>}
                  <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{hasPrev ? Math.max(0, TARGET - ax.now) : ax.sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", maxWidth: "760px", margin: "0 auto" }}>
          <svg viewBox={`0 0 ${RW} ${RH}`} width="100%" role="img" aria-label={`${T.radarTitle[lang]}: ${axes.map((a) => `${a.label} ${a.now}${hasPrev ? ` (${T.prev[lang]} ${a.prev})` : "%"}`).join("; ")}`} style={{ display: "block", fontFamily: "inherit" }}>
            {[20, 40, 60, 80, 100].map((g) => (
              <polygon key={g} points={poly(axes.map(() => g))} fill="none" stroke={GRID} strokeWidth="1" />
            ))}
            {axes.map((ax, i) => {
              const p = point(i, n, 100);
              // 节点模式下，领域分界的轴线加深
              const boundary = mode === "node" && i % 4 === 0;
              return <line key={ax.key} x1={RCX} y1={RCY} x2={p.x} y2={p.y} stroke={boundary ? "#C9D0D8" : GRID} strokeWidth={boundary ? 1.5 : 1} />;
            })}
            {[20, 40, 60, 80, 100].map((g) => (
              <text key={g} x={RCX + 5} y={RCY - (RR * g) / 100 + 12} fontSize="10" fill="#7A8496">{g}</text>
            ))}
            {hasPrev && <polygon points={poly(axes.map(() => TARGET))} fill="none" stroke="#7A8496" strokeWidth="1.5" strokeDasharray="5 4" />}
            {hasPrev && <polygon points={poly(axes.map((a) => a.prev ?? 0))} fill={PREV} fillOpacity="0.08" stroke={PREV} strokeWidth="2" strokeLinejoin="round" />}
            <polygon points={poly(axes.map((a) => a.now))} fill={NOW} fillOpacity="0.14" stroke={NOW} strokeWidth="2" strokeLinejoin="round" />
            {axes.map((ax, i) => {
              const p = point(i, n, ax.now);
              const q = hasPrev ? point(i, n, ax.prev ?? 0) : null;
              return (
                <g key={ax.key}>
                  {q && <circle cx={q.x} cy={q.y} r={hover === i ? 6 : 4.5} fill={PREV} stroke="#FFFFFF" strokeWidth="2" />}
                  <circle cx={p.x} cy={p.y} r={hover === i ? 6.5 : 5} fill={NOW} stroke="#FFFFFF" strokeWidth="2" />
                </g>
              );
            })}
            {axes.map((ax, i) => {
              const p = point(i, n, 100);
              const lx = RCX + (RR + 18) * Math.cos(p.a);
              const ly = RCY + (RR + 18) * Math.sin(p.a);
              const cos = Math.cos(p.a);
              const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
              const top = Math.sin(p.a) < -0.5;
              const dy = Math.sin(p.a) > 0.5 ? 12 : top ? (mode === "domain" ? -22 : -4) : 4;
              const hit = point(i, n, Math.max(ax.now, 30));
              return (
                <g
                  key={ax.key}
                  tabIndex={0}
                  role={mode === "node" ? "button" : undefined}
                  aria-label={`${ax.label} ${ax.now}${hasPrev ? `, ${T.prev[lang]} ${ax.prev}` : "%"}`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => mode === "node" && onPick(ax.key)}
                  onKeyDown={(ev) => { if (mode === "node" && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); onPick(ax.key); } }}
                  style={{ cursor: mode === "node" ? "pointer" : "default", outline: "none" }}
                >
                  <line x1={RCX} y1={RCY} x2={p.x} y2={p.y} stroke="transparent" strokeWidth="26" />
                  <circle cx={hit.x} cy={hit.y} r="16" fill="transparent" />
                  <text x={lx} y={ly + dy} textAnchor={anchor} fontSize={mode === "domain" ? 14 : 11.5} fontWeight={hover === i ? 700 : 600} fill={INK}>
                    {ax.label}
                    {mode === "domain" && <tspan fontWeight="700" fill={INK}>{` ${ax.now}`}</tspan>}
                  </text>
                  {mode === "domain" && (
                    <text x={lx} y={ly + dy + 17} textAnchor={anchor} fontSize="12" fill={MUTED}>{`${T.prev[lang]} ${ax.prev} · ${signed(ax.now - (ax.prev ?? 0))}`}</text>
                  )}
                </g>
              );
            })}
          </svg>
          {hv && hover !== null && (
            <Tooltip x={point(hover, n, Math.max(hv.now, 30)).x} y={point(hover, n, Math.max(hv.now, 30)).y} w={RW} h={RH}>
              <div style={{ fontWeight: 700 }}>{hv.label}</div>
              {hasPrev ? (
                <>
                  <div><Dot c={NOW} />{T.now[lang]} {hv.now}</div>
                  <div><Dot c={PREV} />{T.prev[lang]} {hv.prev} · {signed(hv.now - (hv.prev ?? 0))}</div>
                  <div>{T.target[lang]} {TARGET} · {T.gap[lang]} {Math.max(0, TARGET - hv.now)}</div>
                </>
              ) : (
                <div><Dot c={NOW} />{T.masteryLbl[lang]} {hv.now}% · {hv.sub}</div>
              )}
            </Tooltip>
          )}
        </div>
      )}
    </section>
  );
}

const signed = (d: number) => (d > 0 ? `+${d}` : `${d}`);
const Dot = ({ c }: { c: string }) => <span aria-hidden="true" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: c, marginRight: "6px" }} />;

/* ---------- 页面 ---------- */

export default function ProgressScreen() {
  const { lang } = useLang();
  const [sel, setSel] = useState("g2");
  const done = NODES.filter((n) => n.status === "done").length;
  const doing = NODES.filter((n) => n.status === "doing").length;
  const overall = Math.round(DOMAINS.reduce((s, d) => s + d.now, 0) / DOMAINS.length);
  const prevOverall = Math.round(DOMAINS.reduce((s, d) => s + d.prev, 0) / DOMAINS.length);

  const tile: CSSProperties = { flex: "1 1 200px", border: `1px solid ${LINE}`, borderRadius: "14px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "4px", background: "#FFFFFF" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: INK }}>
      <AgentNav active={["/progress"]} />
      <main style={{ flex: "999 1 560px", minWidth: 0, padding: "32px 36px 56px", boxSizing: "border-box", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}>
          <header style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: MUTED }}>{T.learner[lang]} · {T.role[lang]}</span>
            <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 700 }}>{T.title[lang]}</h1>
            <p style={{ margin: 0, fontSize: "15px", color: MUTED, lineHeight: 1.7, maxWidth: "70ch" }}>{T.lede[lang]}</p>
          </header>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ ...tile, background: INK, color: "#FFFFFF", border: "none" }}>
              <span style={{ fontSize: "12px", color: "#C9D2DF" }}>{T.level[lang]}</span>
              <span style={{ fontSize: "24px", fontWeight: 700 }}>{T.levelVal[lang]}</span>
              <span style={{ fontSize: "12px", color: "#E8A33D", fontWeight: 600 }}>{T.levelGoal[lang]}</span>
            </div>
            <div style={tile}>
              <span style={{ fontSize: "12px", color: MUTED }}>{T.mastered[lang]}</span>
              <span style={{ fontSize: "24px", fontWeight: 700 }}>{done}<span style={{ fontSize: "14px", color: MUTED, fontWeight: 500 }}> / {NODES.length}</span></span>
              <div role="img" aria-label={`${done} / ${NODES.length}`} style={{ height: "6px", background: "#EEF0EC", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(done / NODES.length) * 100}%`, height: "100%", background: "#2E7D5B", borderRadius: "999px" }} />
              </div>
            </div>
            <div style={tile}>
              <span style={{ fontSize: "12px", color: MUTED }}>{T.learning[lang]}</span>
              <span style={{ fontSize: "24px", fontWeight: 700 }}>{doing}</span>
              <span style={{ fontSize: "12px", color: MUTED }}>{T.learningSub[lang]}</span>
            </div>
            <div style={tile}>
              <span style={{ fontSize: "12px", color: MUTED }}>{T.overall[lang]}</span>
              <span style={{ fontSize: "24px", fontWeight: 700 }}>{overall} <span style={{ fontSize: "14px", color: "#1F5E43", fontWeight: 700 }}>{signed(overall - prevOverall)}</span></span>
              <span style={{ fontSize: "12px", color: MUTED }}>{T.overallSub[lang]}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "18px" }}>
            <SkillNetwork lang={lang} sel={sel} setSel={setSel} />
            <AbilityRadar lang={lang} onPick={setSel} />
          </div>
        </div>
      </main>
    </div>
  );
}
