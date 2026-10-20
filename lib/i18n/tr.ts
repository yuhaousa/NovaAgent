// English mode: Chinese UI text is looked up at render time, so screen logic keeps
// comparing its original values and only what is displayed changes.
import EN from "./en.json";

const dict = EN as Record<string, string>;
let current: "zh" | "en" = "zh";

export const setRenderLang = (lang: "zh" | "en") => {
  current = lang;
};

const CJK = /[　-〿一-鿿＀-￯]/;
const RUN = /[　-〿一-鿿＀-￯][　-〿一-鿿＀-￯\s·]*/g;
const NUM = /\d+(?:\.\d+)?/g;

function lookup(s: string): string | undefined {
  const hit = dict[s];
  if (hit !== undefined) return hit;
  // Same sentence with different numbers: '已匹配 3 条经验' → template '已匹配 # 条经验'
  const nums = s.match(NUM);
  if (nums) {
    const tpl = dict[s.replace(NUM, "#")];
    if (tpl !== undefined) {
      let i = 0;
      return tpl.replace(/#/g, () => nums[i++] ?? "#");
    }
  }
  return undefined;
}

export function tr<T>(value: T): T {
  if (current === "zh" || typeof value !== "string" || !CJK.test(value)) return value;
  const s = value as string;
  const core = s.trim();
  const lead = s.slice(0, s.indexOf(core));
  const trail = s.slice(s.indexOf(core) + core.length);
  const whole = lookup(core);
  if (whole !== undefined) return (lead + whole + trail) as T;
  // Fall back to translating each Chinese run on its own
  return s.replace(RUN, (run) => {
    const r = run.trimEnd();
    const t = lookup(r);
    return t === undefined ? run : t + run.slice(r.length);
  }) as T;
}

// Short codes for single-glyph badges, avatars and step dots, where a full English word won't fit
const BADGE: Record<string, string> = {
  听: "Au", 看: "Vi", 读: "Rd", 练: "Pr", 测: "Qz", 聊: "Ch", 组队: "Tm", 学: "Le", 用: "Ap", 沉淀: "Ca",
  讲: "Sp", 思: "Th", 英: "EN", 教: "Co", 课: "Cd", 谈: "Ng", 合: "Cp", 新: "New", 今日: "Today",
  采: "PM", 微: "Wc", 邮: "@", 历: "Ca", 竹: "JZ", 飞: "Lk", 钉: "DT",
};

export function trBadge<T>(value: T): T {
  if (current === "en" && typeof value === "string" && BADGE[value] !== undefined) return BADGE[value] as T;
  return tr(value);
}
