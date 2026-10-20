// 学习者 Yu 的技能图谱数据：与技能图谱（/skills）和能力测评（/assess）页面一致。
import type { Lang } from "@/components/lang";

export type Text = Record<Lang, string>;
export type Status = "done" | "doing" | "lock";
export type DomainId = "comm" | "write" | "comp" | "course";

export type Domain = { id: DomainId; name: Text; prev: number; now: number };
export type SkillNode = { id: string; domain: DomainId; level: 1 | 2 | 3 | 4; name: Text; status: Status; pct?: number; focus?: boolean };

// 上次测评 / 本次测评（能力测评页的“各项能力”）
export const DOMAINS: Domain[] = [
  { id: "comm", name: { zh: "客户沟通", en: "Client communication" }, prev: 58, now: 65 },
  { id: "write", name: { zh: "方案写作", en: "Proposal writing" }, prev: 63, now: 72 },
  { id: "comp", name: { zh: "合规知识", en: "Compliance" }, prev: 55, now: 54 },
  { id: "course", name: { zh: "课程设计", en: "Course design" }, prev: 79, now: 81 },
];

export const TARGET = 80; // L3 精通

export const LEVELS: Text[] = [
  { zh: "L1 基础", en: "L1 Basic" },
  { zh: "L2 应用", en: "L2 Applied" },
  { zh: "L3 精通", en: "L3 Proficient" },
  { zh: "L4 专家", en: "L4 Expert" },
];

export const NODES: SkillNode[] = [
  { id: "c1", domain: "comm", level: 1, name: { zh: "需求挖掘", en: "Needs discovery" }, status: "done" },
  { id: "c2", domain: "comm", level: 2, name: { zh: "异议处理", en: "Objection handling" }, status: "done" },
  { id: "c3", domain: "comm", level: 3, name: { zh: "价格谈判", en: "Price negotiation" }, status: "doing", pct: 40 },
  { id: "c4", domain: "comm", level: 4, name: { zh: "战略客户经营", en: "Strategic accounts" }, status: "lock" },
  { id: "p1", domain: "write", level: 1, name: { zh: "结构化写作", en: "Structured writing" }, status: "done" },
  { id: "p2", domain: "write", level: 2, name: { zh: "痛点价值映射", en: "Pain-to-value mapping" }, status: "done" },
  { id: "p3", domain: "write", level: 3, name: { zh: "安全先行提案", en: "Security-first proposals" }, status: "doing", pct: 70 },
  { id: "p4", domain: "write", level: 4, name: { zh: "招投标方案", en: "Tender proposals" }, status: "lock" },
  { id: "g1", domain: "comp", level: 1, name: { zh: "PDPA 基础", en: "PDPA basics" }, status: "done" },
  { id: "g2", domain: "comp", level: 2, name: { zh: "数据安全与 ISO 27001", en: "Data security & ISO 27001" }, status: "doing", pct: 55, focus: true },
  { id: "g3", domain: "comp", level: 3, name: { zh: "行业合规课程化", en: "Compliance courseware" }, status: "lock" },
  { id: "g4", domain: "comp", level: 4, name: { zh: "合规培训顾问", en: "Compliance consultant" }, status: "lock" },
  { id: "k1", domain: "course", level: 1, name: { zh: "学习目标设计", en: "Learning objectives" }, status: "done" },
  { id: "k2", domain: "course", level: 2, name: { zh: "案例驱动设计", en: "Case-driven design" }, status: "done" },
  { id: "k3", domain: "course", level: 3, name: { zh: "WSQ 课程开发", en: "WSQ course development" }, status: "done" },
  { id: "k4", domain: "course", level: 4, name: { zh: "学习效果评估", en: "Learning evaluation" }, status: "doing", pct: 20 },
];

// 前置关系 from → to：同领域逐级解锁，另有两条跨领域前置。
export const EDGES: { from: string; to: string; cross?: boolean }[] = [
  ...(["c", "p", "g", "k"] as const).flatMap((d) => [1, 2, 3].map((l) => ({ from: `${d}${l}`, to: `${d}${l + 1}` }))),
  { from: "g2", to: "p3", cross: true },
  { from: "k2", to: "g3", cross: true },
];

export const mastery = (n: SkillNode) => (n.status === "done" ? 100 : n.status === "doing" ? n.pct ?? 0 : 0);
