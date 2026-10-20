"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";
import { tr, trBadge } from "@/lib/i18n/tr";

// 情景闯关
export default class GameScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { round: 0, picked: null, xp: 50, lives: 3, right: 0, done: false };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var ROUNDS: any = [
      {
        initials: 'IT', who: '半导体客户 · IT 总监', lesson: 'L-0231 安全先行',
        says: '你们的平台数据存在哪里？我们的工艺数据绝对不能出境。',
        options: [
          { key: 'A', text: '放心，我们用的是大厂云服务，很安全。', grade: 'wrong', xp: 0, fb: '太笼统。IT 总监需要具体的部署方式和可以核验的证据。' },
          { key: 'B', text: '支持本地化部署，数据不出厂区；我们按 ISO 27001 建设安全体系，可以先把安全白皮书发给您。', grade: 'best', xp: 50, fb: '具体、可验证，还主动给出了下一步。' },
          { key: 'C', text: '这个问题我回去问一下技术同事再答复您。', grade: 'ok', xp: 10, fb: '诚实，但失去了主动。先给出原则性答案，再承诺补充细节。' }
        ]
      },
      {
        initials: '采', who: '食品企业 · 采购经理', lesson: 'L-0204 报价沟通',
        says: '你们的报价比另一家贵了 30%。',
        options: [
          { key: 'A', text: '我们可以马上给您打八折。', grade: 'wrong', xp: 0, fb: '过早让价，会让对方觉得原价有水分。' },
          { key: 'B', text: '一分钱一分货，我们的质量更好。', grade: 'wrong', xp: 0, fb: '空泛的价值主张没有说服力，对方无法核实。' },
          { key: 'C', text: '能先了解一下对方方案包含哪些内容吗？我们可以逐项对比，看差在哪里。', grade: 'best', xp: 50, fb: '先把比较拉回同一口径，再谈价值。' }
        ]
      }
    ];
    var r: any = ROUNDS[s.round];
    var pickedOpt: any = null;
    r.options.forEach(function (o: any) { if (o.key === s.picked) pickedOpt = o; });
    var options: any = r.options.map(function (o: any) {
      var bg: any = '#FFFFFF', border = '#E3E6E1';
      if (s.picked) {
        if (o.grade === 'best') { bg = '#E6F2EC'; border = '#2E7D5B'; }
        else if (o.key === s.picked && o.grade === 'ok') { bg = '#FBF0DC'; border = '#B26F12'; }
        else if (o.key === s.picked) { bg = '#FBE9E6'; border = '#8A2B1F'; }
      }
      return Object.assign({}, o, {
        bg: bg, border: border, locked: !!s.picked,
        pick: function () {
          if (self.state.picked) return;
          self.setState({
            picked: o.key,
            xp: self.state.xp + o.xp,
            lives: o.grade === 'wrong' ? Math.max(0, self.state.lives - 1) : self.state.lives,
            right: o.grade === 'best' ? self.state.right + 1 : self.state.right
          });
        }
      });
    });
    var g: any = pickedOpt ? pickedOpt.grade : null;
    var hearts: any = [0, 1, 2].map(function (i: any) { return { fill: i < s.lives ? '#B3402E' : 'none' }; });
    var current: any = 1 + s.round + (s.done ? 1 : 0);
    var levels: any = [1, 2, 3, 4, 5].map(function (n: any) {
      var done: any = n <= current;
      var now: any = n === current + 1 && !s.done;
      return {
        n: n,
        bg: done ? '#2E7D5B' : (now ? '#FFFFFF' : '#F5F6F3'),
        fg: done ? '#FFFFFF' : '#1B2A4A',
        border: done ? '#2E7D5B' : (now ? '#E8A33D' : '#CDD3DB'),
        line: n === 5 ? 'transparent' : (n < current + 1 ? '#2E7D5B' : '#CDD3DB')
      };
    });
    var last: any = s.round === ROUNDS.length - 1;
    return {
      round: r,
      options: options,
      answered: !!s.picked,
      fbTitle: g === 'best' ? '漂亮！+' + pickedOpt.xp + ' XP' : (g === 'ok' ? '还行，+' + (pickedOpt ? pickedOpt.xp : 0) + ' XP' : '这样回答有风险，-1 生命'),
      fbText: pickedOpt ? pickedOpt.fb : '',
      fbBg: g === 'best' ? '#E6F2EC' : (g === 'ok' ? '#FBF0DC' : '#FBE9E6'),
      fbFg: g === 'best' ? '#1F5E43' : (g === 'ok' ? '#7A4E0E' : '#8A2B1F'),
      nextLabel: last ? '查看结果' : '下一关',
      next: function () {
        if (last) self.setState({ done: true });
        else self.setState({ round: self.state.round + 1, picked: null });
      },
      restart: function () { self.setState({ round: 0, picked: null, xp: 50, lives: 3, right: 0, done: false }); },
      xp: s.xp,
      lives: s.lives,
      hearts: hearts,
      levels: levels,
      levelNo: current + (s.done ? 0 : 1),
      playing: !s.done,
      finished: s.done,
      rightCount: s.right
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/learn", "/game"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "32px 40px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "920px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}>
            <div style={{ fontSize: "14px", color: "#5B6577", display: "flex", gap: "8px" }}>
              <Link href="/learn" style={{ textDecoration: "none", fontWeight: "600" }}>{tr("学习")}</Link>
              <span>/</span>
              <span>{tr("学习游戏")}</span>
            </div>
            <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h1 style={{ margin: "0", fontSize: "26px", fontWeight: "700" }}>{tr("情景闯关 · 客户异议应对")}</h1>
                <span style={{ fontSize: "14px", color: "#5B6577" }}>{tr("题目来自你最近的真实客户沟通")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <div role="img" aria-label={tr(`剩余生命 ${v.lives} / 3`)} style={{ display: "flex", gap: "4px", background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "999px", padding: "8px 14px" }}>
                  {v.hearts.map((h: any, i0: number) => (
                    <svg key={i0} width="18" height="18" viewBox="0 0 24 24" fill={h.fill} stroke="#B3402E" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                    </svg>
                  ))}
                </div>
                <span style={{ background: "#FBF0DC", color: "#7A4E0E", borderRadius: "999px", padding: "8px 14px", fontSize: "14px", fontWeight: "700" }}>{tr(v.xp)}{" XP"}</span>
              </div>
            </header>
            <div role="img" aria-label={tr(`关卡进度：第 ${v.levelNo} 关，共 5 关`)} style={{ display: "flex", alignItems: "center", gap: "0" }}>
              {v.levels.map((lv: any, i0: number) => (
                <div key={i0} style={{ flex: "1", display: "flex", alignItems: "center" }}>
                  <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: lv.bg, color: lv.fg, border: `2px solid ${lv.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", boxSizing: "border-box", flexShrink: "0" }}>
                    {trBadge(lv.n)}
                  </span>
                  <span style={{ flex: "1", height: "3px", background: lv.line, margin: "0 6px" }} />
                </div>
              ))}
            </div>
            {v.playing ? (
              <section aria-label={tr("当前关卡")} style={{ background: "#FFFFFF", border: "1px solid #E3E6E1", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "22px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1B2A4A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", flexShrink: "0" }}>
                    {trBadge(v.round.initials)}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>{tr(v.round.who)}</span>
                    <div style={{ background: "#EEF1F6", borderRadius: "4px 16px 16px 16px", padding: "14px 18px", fontSize: "18px", fontWeight: "500", lineHeight: "1.6" }}>{tr(v.round.says)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700" }}>{tr("你会怎么回答？")}</span>
                  {v.options.map((o: any, i0: number) => (
                    <button key={i0} type="button" onClick={o.pick} disabled={o.locked} style={{ textAlign: "left", minHeight: "56px", padding: "14px 16px", borderRadius: "12px", border: `2px solid ${o.border}`, background: o.bg, color: "#1B2A4A", font: "inherit", fontSize: "15px", lineHeight: "1.6", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #CDD3DB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: "0", boxSizing: "border-box" }}>
                        {trBadge(o.key)}
                      </span>
                      <span>{tr(o.text)}</span>
                    </button>
                  ))}
                </div>
                {v.answered ? (
                  <div role="status" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", background: v.fbBg, borderRadius: "12px", padding: "16px 18px" }}>
                    <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "16px", fontWeight: "700", color: v.fbFg }}>{tr(v.fbTitle)}</span>
                      <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#1B2A4A" }}>{tr(v.fbText)}</span>
                      <Link href="/lessons" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>{tr("相关经验：")}{tr(v.round.lesson)}</Link>
                    </div>
                    <button type="button" onClick={v.next} style={{ height: "48px", padding: "0 22px", borderRadius: "10px", border: "none", background: "#1B2A4A", color: "#FFFFFF", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                      {tr(v.nextLabel)}
                    </button>
                  </div>
                ) : null}
              </section>
            ) : null}
            {v.finished ? (
              <section aria-label={tr("闯关结果")} style={{ background: "#1B2A4A", color: "#FFFFFF", borderRadius: "18px", padding: "36px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
                <span style={{ fontSize: "14px", color: "#E8A33D", fontWeight: "700" }}>{tr("本轮完成")}</span>
                <span style={{ fontSize: "44px", fontWeight: "700" }}>+{tr(v.xp)}{" XP"}</span>
                <span style={{ fontSize: "16px", color: "#C9D2DF" }}>{tr("答对 ")}{tr(v.rightCount)}{tr(" / 2 · 答错的题已加入明天的复习")}</span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
                  <button type="button" onClick={v.restart} style={{ height: "48px", padding: "0 22px", borderRadius: "10px", border: "none", background: "#E8A33D", color: "#1B2A4A", font: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                    {tr("再玩一次")}
                  </button>
                  <Link href="/learn" style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 22px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.4)", color: "#FFFFFF", fontSize: "15px", fontWeight: "700", textDecoration: "none", boxSizing: "border-box" }}>
                    {tr("返回学习")}
                  </Link>
                </div>
              </section>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}
