"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { AgentNav } from "@/components/agent-nav";
import { DCLogic } from "@/components/dc";

// 一个知识点，六种学法
export default class SessionScreen extends DCLogic {
  constructor(props: object) {
    super(props);
    this.state = { fmt: 'podcast', flipped: false };
  }
  renderVals() {
    var self: any = this;
    var s: any = this.state;
    var F: any = [
      { id: 'video', k: '看', label: '视频', meta: '3 分钟', c: ['#E3ECF6', '#1F4E8C'] },
      { id: 'podcast', k: '听', label: '播客', meta: '6 分钟 · 可离线', c: ['#EEEAF8', '#5B3FA0'], reco: true },
      { id: 'cards', k: '读', label: '图文卡片', meta: '5 张 · 2 分钟', c: ['#F8EEDC', '#7A4E0E'] },
      { id: 'flash', k: '测', label: '闪卡', meta: '4 张到期', c: ['#FBE9E6', '#8A2B1F'] },
      { id: 'role', k: '聊', label: '陪练', meta: '10 分钟 · 语音', c: ['#E3F1EA', '#1F5E43'] },
      { id: 'quiz', k: '测', label: '测一测', meta: '3 题', c: ['#FBE9E6', '#8A2B1F'] }
    ];
    var formats: any = F.map(function (f: any) {
      var on: any = s.fmt === f.id;
      return { k: f.k, label: f.label, meta: f.meta, reco: !!f.reco, tileBg: f.c[0], tileFg: f.c[1], sel: on ? 'true' : 'false', border: on ? '#1B2A4A' : '#E6E8E3', bg: on ? '#FFFFFF' : '#F7F8F5', pick: function () { self.setState({ fmt: f.id, flipped: false }); } };
    });
    var is: any = {};
    F.forEach(function (f: any) { is[f.id] = s.fmt === f.id; });
    var wave: any = [];
    for (var i = 0; i < 40; i++) {
      var h: any = 8 + Math.round(Math.abs(Math.sin(i * 0.9) * 18) + (i % 3) * 3);
      wave.push({ h: h, c: i < 11 ? '#5B3FA0' : '#D5CCEB' });
    }
    return {
      formats: formats, is: is, wave: wave,
      flip: function () { self.setState({ flipped: !self.state.flipped }); },
      cardSide: s.flipped ? '答案' : '问题 · 点击翻面',
      cardText: s.flipped ? '按收集目的确定期限，写进保留政策；到期删除或匿名化，并保留处理记录。' : '离职员工的培训数据，应该在什么时候删除？',
      cardBg: s.flipped ? '#F0F7F3' : '#FFFFFF'
    };
  }

  view(v: any) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", background: "#FFFFFF", fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", color: "#1B2A4A" }}>
        <AgentNav active={["/modes", "/session"]} />
        <main style={{ flex: "999 1 560px", minWidth: "0", padding: "28px 36px 56px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}>
            <header style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                <Link href="/skills" style={{ fontSize: "13px", fontWeight: "600", padding: "4px 12px", borderRadius: "999px", background: "#FBF0DC", color: "#7A4E0E", textDecoration: "none" }}>
                  合规知识 L2 · 数据安全与 ISO 27001
                </Link>
                <span style={{ fontSize: "13px", color: "#5B6577" }}>来源：昨天与 AI 教练模拟时卡住的问题</span>
              </div>
              <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "700" }}>离职员工的数据，该保留多久、怎么删除？</h1>
              <p style={{ margin: "0", fontSize: "15px", color: "#5B6577" }}>同一个知识点，选一种此刻最合适的学法。换形式不丢进度。</p>
            </header>
            <div role="tablist" aria-label="学习形式" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
              {v.formats.map((f: any, i0: number) => (
                <button key={i0} type="button" role="tab" aria-selected={f.sel} onClick={f.pick} style={{ position: "relative", minHeight: "76px", padding: "12px 14px", borderRadius: "14px", border: `2px solid ${f.border}`, background: f.bg, color: "#1B2A4A", font: "inherit", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: f.tileBg, color: f.tileFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>
                      {f.k}
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>{f.label}</span>
                  </span>
                  <span style={{ fontSize: "12px", color: "#5B6577" }}>{f.meta}</span>
                  {f.reco ? (
                    <span style={{ position: "absolute", right: "10px", top: "10px", fontSize: "11px", fontWeight: "700", padding: "1px 8px", borderRadius: "999px", background: "#E8A33D", color: "#1B2A4A" }}>
                      推荐
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "22px", alignItems: "flex-start" }}>
              <section aria-label="学习内容" style={{ flex: "999 1 560px", minWidth: "0", border: "1px solid #E6E8E3", borderRadius: "20px", padding: "24px", boxSizing: "border-box", minHeight: "470px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {v.is.video ? (
                  <>
                    <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", background: "#1B2A4A", display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px", boxSizing: "border-box", color: "#FFFFFF", gap: "14px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#E8A33D" }}>3 分钟视频</span>
                      <span style={{ fontSize: "26px", fontWeight: "700", lineHeight: "1.4" }}>
                        离职不等于删除：
                        <br />
                        先看目的，再看期限
                      </span>
                      <span style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1B2A4A" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                      </span>
                    </div>
                    <p style={{ margin: "0", fontSize: "14px", color: "#5B6577" }}>00:52 处有一道检查点题目；看完自动计入“学”这一步。</p>
                  </>
                ) : null}
                {v.is.podcast ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", background: "#F6F3FC", borderRadius: "16px", padding: "20px" }}>
                      <button type="button" aria-label="播放" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "none", background: "#5B3FA0", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                      </button>
                      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
                        <span style={{ fontSize: "17px", fontWeight: "700" }}>数据安全三句话 · 第 2 集</span>
                        <div role="img" aria-label="音频波形，已播放 1 分 40 秒，共 6 分钟" style={{ display: "flex", alignItems: "center", gap: "3px", height: "32px" }}>
                          {v.wave.map((w: any, i0: number) => (
                            <span key={i0} style={{ width: "4px", borderRadius: "2px", height: `${w.h}px`, background: w.c }} />
                          ))}
                        </div>
                        <span style={{ fontSize: "12px", color: "#5B6577" }}>01:40 / 06:00 · 1.25x · 已下载，可离线</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>文字稿</span>
                      <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.8" }}>
                        <b style={{ color: "#5B3FA0" }}>主持人 A：</b>
                        很多客户以为员工一离职，系统里的数据就该马上删。其实要先问一句：这份数据当初是为什么收集的？
                      </p>
                      <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.8" }}>
                        <b style={{ color: "#1F5E43" }}>主持人 B：</b>
                        对。培训记录可能还要用于资质证明，所以保留期限要按目的来定，并且写进公司的数据保留政策里。
                      </p>
                      <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.8", color: "#5B6577" }}>
                        <b style={{ color: "#5B3FA0" }}>主持人 A：</b>
                        那到了期限，怎么证明真的删干净了……
                      </p>
                    </div>
                  </>
                ) : null}
                {v.is.cards ? (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      <div style={{ background: "#FDF7EC", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>1 / 5</span>
                        <span style={{ fontSize: "17px", fontWeight: "700" }}>先问目的</span>
                        <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#3D4757" }}>数据为什么收集，决定它能留多久。</span>
                      </div>
                      <div style={{ background: "#FDF7EC", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>2 / 5</span>
                        <span style={{ fontSize: "17px", fontWeight: "700" }}>写进政策</span>
                        <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#3D4757" }}>保留期限要在数据保留政策里明确写出。</span>
                      </div>
                      <div style={{ background: "#FDF7EC", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#7A4E0E" }}>3 / 5</span>
                        <span style={{ fontSize: "17px", fontWeight: "700" }}>到期即处理</span>
                        <span style={{ fontSize: "14px", lineHeight: "1.7", color: "#3D4757" }}>删除或匿名化，并保留处理记录。</span>
                      </div>
                    </div>
                    <p style={{ margin: "0", fontSize: "13px", color: "#5B6577" }}>左右滑动查看全部 5 张 · 可收藏到资料库</p>
                  </>
                ) : null}
                {v.is.flash ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "12px 0" }}>
                    <span style={{ fontSize: "13px", color: "#5B6577" }}>今日到期 1 / 4</span>
                    <button type="button" onClick={v.flip} aria-label="翻面" style={{ width: "100%", maxWidth: "520px", minHeight: "220px", borderRadius: "18px", border: "1px solid #E6E8E3", background: v.cardBg, boxShadow: "0 8px 24px rgba(27,42,74,0.08)", font: "inherit", color: "#1B2A4A", padding: "28px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#8A2B1F" }}>{v.cardSide}</span>
                      <span style={{ fontSize: "20px", fontWeight: "700", lineHeight: "1.6" }}>{v.cardText}</span>
                    </button>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="button" style={{ height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #DCE0DA", background: "#FFFFFF", font: "inherit", fontSize: "14px", color: "#8A2B1F", fontWeight: "700", cursor: "pointer" }}>
                        忘了 · 10 分钟后
                      </button>
                      <button type="button" style={{ height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #DCE0DA", background: "#FFFFFF", font: "inherit", fontSize: "14px", color: "#7A4E0E", fontWeight: "700", cursor: "pointer" }}>
                        模糊 · 明天
                      </button>
                      <button type="button" style={{ height: "44px", padding: "0 18px", borderRadius: "10px", border: "none", background: "#2E7D5B", font: "inherit", fontSize: "14px", color: "#FFFFFF", fontWeight: "700", cursor: "pointer" }}>
                        记住了 · 4 天后
                      </button>
                    </div>
                  </div>
                ) : null}
                {v.is.role ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <span style={{ alignSelf: "flex-start", fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px", background: "#E3F1EA", color: "#1F5E43" }}>
                      AI 扮演：半导体客户 IT 总监
                    </span>
                    <div style={{ maxWidth: "80%", background: "#F1F2EF", borderRadius: "4px 16px 16px 16px", padding: "12px 16px", fontSize: "15px", lineHeight: "1.8" }}>
                      我们有员工离职后，你们平台上他的学习记录还会一直保存吗？保存多久？谁能看到？
                    </div>
                    <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: "#1B2A4A", color: "#FFFFFF", borderRadius: "16px 4px 16px 16px", padding: "12px 16px", fontSize: "15px", lineHeight: "1.8" }}>
                      我们按贵司的数据保留政策设置期限，到期自动匿名化……
                    </div>
                    <div style={{ maxWidth: "80%", background: "#FDF7EC", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", lineHeight: "1.7", color: "#5C3B0A" }}>
                      <b>教练点评：</b>
                      方向对。再补一句“处理记录可导出供审计”，IT 总监会更放心。
                    </div>
                    <Link href="/coach" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", height: "44px", padding: "0 18px", borderRadius: "10px", background: "#2E7D5B", color: "#FFFFFF", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
                      继续语音陪练
                    </Link>
                  </div>
                ) : null}
                {v.is.quiz ? (
                  <fieldset style={{ border: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <legend style={{ fontSize: "18px", fontWeight: "700", lineHeight: "1.6", marginBottom: "10px" }}>第 1 / 3 题：决定离职员工数据保留期限的首要依据是？</legend>
                    <label htmlFor="q1a" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "0 16px", border: "1px solid #DCE0DA", borderRadius: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input type="radio" name="q1" id="q1a" style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                      员工离职的日期
                    </label>
                    <label htmlFor="q1b" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "0 16px", border: "1px solid #DCE0DA", borderRadius: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input type="radio" name="q1" id="q1b" style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                      收集这份数据的目的
                    </label>
                    <label htmlFor="q1c" style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", padding: "0 16px", border: "1px solid #DCE0DA", borderRadius: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input type="radio" name="q1" id="q1c" style={{ width: "18px", height: "18px", margin: "0", accentColor: "#2E7D5B" }} />
                      系统的存储空间
                    </label>
                  </fieldset>
                ) : null}
              </section>
              <aside style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                <section aria-labelledby="why-h" style={{ background: "#F7F8F5", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="why-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>为什么推荐“播客”</h2>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5B3FA0", marginTop: "7px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7" }}>现在 08:15，日历显示你 09:30 才到办公室，通勤中适合只用耳朵。</span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2E7D5B", marginTop: "7px", flexShrink: "0" }} />
                    <span style={{ fontSize: "14px", lineHeight: "1.7" }}>下午 15:00 有半导体客户会议，会前建议再做 10 分钟陪练。</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#5B6577" }}>你过去 30 天的学习偏好</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                      <span style={{ width: "24px" }}>看</span>
                      <div style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#E6E8E3" }}>
                        <div style={{ width: "40%", height: "8px", borderRadius: "4px", background: "#1F4E8C" }} />
                      </div>
                      <span style={{ width: "32px", textAlign: "right" }}>40%</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                      <span style={{ width: "24px" }}>练</span>
                      <div style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#E6E8E3" }}>
                        <div style={{ width: "35%", height: "8px", borderRadius: "4px", background: "#2E7D5B" }} />
                      </div>
                      <span style={{ width: "32px", textAlign: "right" }}>35%</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                      <span style={{ width: "24px" }}>听</span>
                      <div style={{ flex: "1", height: "8px", borderRadius: "4px", background: "#E6E8E3" }}>
                        <div style={{ width: "25%", height: "8px", borderRadius: "4px", background: "#5B3FA0" }} />
                      </div>
                      <span style={{ width: "32px", textAlign: "right" }}>25%</span>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="node-h" style={{ border: "1px solid #E6E8E3", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h2 id="node-h" style={{ margin: "0", fontSize: "16px", fontWeight: "700" }}>计入技能图谱</h2>
                  <span style={{ fontSize: "13px", color: "#5B6577" }}>节点进度 55% · 学完本次 +5%</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ flex: "1", textAlign: "center", fontSize: "12px", fontWeight: "700", padding: "6px 0", borderRadius: "8px", background: "#2E7D5B", color: "#FFFFFF" }}>学</span>
                    <span style={{ flex: "1", textAlign: "center", fontSize: "12px", fontWeight: "700", padding: "6px 0", borderRadius: "8px", background: "#FBF0DC", color: "#7A4E0E" }}>练</span>
                    <span style={{ flex: "1", textAlign: "center", fontSize: "12px", fontWeight: "700", padding: "6px 0", borderRadius: "8px", background: "#F1F2EF", color: "#5B6577" }}>用</span>
                    <span style={{ flex: "1", textAlign: "center", fontSize: "12px", fontWeight: "700", padding: "6px 0", borderRadius: "8px", background: "#F1F2EF", color: "#5B6577" }}>测</span>
                    <span style={{ flex: "1", textAlign: "center", fontSize: "12px", fontWeight: "700", padding: "6px 0", borderRadius: "8px", background: "#F1F2EF", color: "#5B6577" }}>沉淀</span>
                  </div>
                </section>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <Link href="/schedule" style={{ flex: "1", display: "inline-flex", alignItems: "center", justifyContent: "center", height: "44px", borderRadius: "10px", border: "1px solid #DCE0DA", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                    设为每日通勤学习
                  </Link>
                  <Link href="/lessons" style={{ flex: "1", display: "inline-flex", alignItems: "center", justifyContent: "center", height: "44px", borderRadius: "10px", border: "1px solid #DCE0DA", color: "#1B2A4A", fontSize: "14px", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}>
                    存到资料库
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
