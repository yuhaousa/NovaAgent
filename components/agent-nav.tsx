"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLang, type Lang } from "./lang";

type Text = Record<Lang, string>;

const icon = (body: ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {body}
  </svg>
);

const MAIN: { href: string; label: Text; icon: ReactNode; extra?: ReactNode }[] = [
  { href: "/", label: { zh: "新建", en: "New" }, icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>) },
  { href: "/today", label: { zh: "今日工作", en: "Today's work" }, icon: icon(<><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></>) },
  { href: "/learn", label: { zh: "今日学习", en: "Learning" }, icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" /></>), extra: "progress" },
  { href: "/review", label: { zh: "复盘", en: "Review" }, icon: icon(<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />), extra: "badge" },
  { href: "/modes", label: { zh: "学习模式 · 导师", en: "Modes · Mentors" }, icon: icon(<><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>) },
  { href: "/skills", label: { zh: "技能图谱", en: "Skill map" }, icon: icon(<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M7.2 8.2l3.6 7.6M16.8 8.2l-3.6 7.6" /></>) },
  { href: "/progress", label: { zh: "学习进度", en: "Progress" }, icon: icon(<><path d="M12 3l8 5.5-3 9.5H7L4 8.5z" /><path d="M12 8l3.5 2.5-1.2 4H9.7l-1.2-4z" /></>) },
  { href: "/schedule", label: { zh: "定时学习", en: "Scheduled" }, icon: icon(<><circle cx="12" cy="13" r="7" /><path d="M12 10v3l2 2M5 4l3 2M19 4l-3 2" /></>), extra: "dot" },
  { href: "/lessons", label: { zh: "资料库 · 经验", en: "Library · Lessons" }, icon: icon(<><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11" /></>) },
  { href: "/scenarios", label: { zh: "场景配置", en: "Scenarios" }, icon: icon(<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>) },
];

const RECENT: { href: string; label: Text; when: Text }[] = [
  { href: "/task", label: { zh: "卡塔尔机场培训方案", en: "Qatar airport training plan" }, when: { zh: "3 分钟前", en: "3 min ago" } },
  { href: "/session", label: { zh: "离职员工数据怎么删", en: "Deleting ex-employee data" }, when: { zh: "1 小时前", en: "1 hr ago" } },
  { href: "/coach", label: { zh: "陪练：IT 总监五问", en: "Drill: IT director's 5 questions" }, when: { zh: "2 小时前", en: "2 hr ago" } },
  { href: "/game", label: { zh: "情景闯关：客户异议", en: "Quest: customer objections" }, when: { zh: "4 小时前", en: "4 hr ago" } },
  { href: "/video", label: { zh: "视频：安全先行", en: "Video: Security first" }, when: { zh: "昨天", en: "Yesterday" } },
];

const PATHS: { color: string; label: Text }[] = [
  { color: "#2E7D5B", label: { zh: "解决方案顾问 · L2 → L3", en: "Solutions consultant · L2 → L3" } },
  { color: "#E8A33D", label: { zh: "卡塔尔机场项目空间", en: "Qatar airport project space" } },
];

const T = {
  brand: { zh: "学习助手", en: "NovaAgent" },
  org: { zh: "九竹教育云", en: "Jiuzhu EduCloud" },
  nav: { zh: "主导航", en: "Main navigation" },
  recent: { zh: "最近 (36)", en: "Recent (36)" },
  paths: { zh: "学习路径 (2)", en: "Learning paths (2)" },
  progress: { zh: "6/15 分钟", en: "6/15 min" },
  user: { zh: "Yu · 九竹教育云", en: "Yu · Jiuzhu EduCloud" },
  streak: { zh: "连续学习 12 天 · 经验卡 86", en: "12-day streak · 86 lesson cards" },
  language: { zh: "界面语言", en: "Interface language" },
};

const base = { display: "flex", alignItems: "center", gap: "10px", color: "#1B2A4A", textDecoration: "none" } as const;
// Labels stay on one line in both languages; long English ones end in an ellipsis.
const clip = { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
const activeStyle = (on: boolean) => (on ? { background: "#E4E7E1", fontWeight: 700 } : {});

export function AgentNav({ active }: { active: string[] }) {
  const { lang, setLang } = useLang();
  const isOn = (href: string) => active.includes(href);

  return (
    <nav aria-label={T.nav[lang]} style={{ flex: lang === "en" ? "1 1 288px" : "1 1 240px", minWidth: 0, background: "#F4F5F2", borderRight: "1px solid #E6E8E3", padding: "20px 14px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 8px" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#2E7D5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 3v18" /><path d="M9 9l-4-3" /><path d="M15 6v15" /><path d="M15 14l4-3" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ ...clip, fontSize: "16px", fontWeight: 700 }}>{T.brand[lang]}</span>
          <span style={{ ...clip, fontSize: "12px", color: "#5B6577" }}>{T.org[lang]}</span>
        </div>
        <div role="group" aria-label={T.language[lang]} style={{ marginLeft: "auto", display: "flex", background: "#E4E7E1", borderRadius: "8px", padding: "2px" }}>
          {(["zh", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              style={{ minWidth: "36px", height: "28px", padding: "0 8px", border: "none", borderRadius: "6px", background: lang === l ? "#FFFFFF" : "transparent", boxShadow: lang === l ? "0 1px 3px rgba(27,42,74,0.14)" : "none", font: "inherit", fontSize: "12px", fontWeight: 700, color: "#1B2A4A", cursor: "pointer" }}
            >
              {l === "zh" ? "中" : "EN"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {MAIN.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isOn(item.href) ? "page" : undefined} style={{ ...base, minHeight: "40px", padding: "0 10px", borderRadius: "10px", fontSize: "15px", ...activeStyle(isOn(item.href)) }}>
            {item.icon}
            <span style={clip}>{item.label[lang]}</span>
            {item.extra === "progress" && <span style={{ marginLeft: "auto", fontSize: "12px", color: "#5B6577", fontWeight: 400 }}>{T.progress[lang]}</span>}
            {item.extra === "badge" && <span style={{ marginLeft: "auto", background: "#E8A33D", color: "#1B2A4A", fontSize: "12px", fontWeight: 700, padding: "1px 8px", borderRadius: "999px" }}>3</span>}
            {item.extra === "dot" && <span style={{ marginLeft: "auto", width: "7px", height: "7px", borderRadius: "50%", background: "#B3402E" }} />}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#5B6577", padding: "0 10px 6px" }}>{T.recent[lang]}</span>
        {RECENT.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isOn(item.href) ? "page" : undefined} style={{ ...base, justifyContent: "space-between", gap: "8px", minHeight: "34px", padding: "0 10px", borderRadius: "8px", fontSize: "14px", ...activeStyle(isOn(item.href)) }}>
            <span style={clip}>{item.label[lang]}</span>
            <span style={{ fontSize: "12px", color: "#5B6577", whiteSpace: "nowrap", fontWeight: 400 }}>{item.when[lang]}</span>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#5B6577", padding: "0 10px 6px" }}>{T.paths[lang]}</span>
        {PATHS.map((p) => (
          <Link key={p.color} href="/skills" style={{ ...base, minHeight: "34px", padding: "0 10px", borderRadius: "8px", fontSize: "14px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={clip}>{p.label[lang]}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", padding: "12px 8px 0", borderTop: "1px solid #E6E8E3" }}>
        <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#1B2A4A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>Y</span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "14px", fontWeight: 700 }}>{T.user[lang]}</span>
          <span style={{ fontSize: "12px", color: "#7A4E0E" }}>{T.streak[lang]}</span>
        </span>
      </div>
    </nav>
  );
}
