# NovaAgent · 学习型工作 Agent UI

在你做事时向你学习的工作 Agent：工作（今日任务、任务执行、晚间复盘、经验库、场景配置）、学习（今日学习、六种学法、视频课、情景闯关、AI 教练、定时学习）、成长（能力测评、技能图谱）。

这是可演示的前端原型：Next.js 静态导出，部署到 Cloudflare Workers 的静态资源，不需要数据库或密钥。所有交互状态都在浏览器里。侧边栏菜单支持中文 / English 切换（记在浏览器里）。

## 本地运行

需要 Node 22+。

```bash
npm install
npm run dev        # http://localhost:3000
npm run preview    # 构建后用 wrangler 在本地按线上方式运行 http://localhost:8787
```

## 部署到 Cloudflare

```bash
npx wrangler login
npm run deploy     # next build → ./out，wrangler deploy 发布为 novaagent.<你的子域>.workers.dev
```

## 页面

| 路径 | 页面 |
| --- | --- |
| `/` | 对话式首页 |
| `/today` | 今日工作 |
| `/task` | 任务执行 |
| `/review` | 晚间复盘 |
| `/lessons` | 资料库 · 经验 |
| `/scenarios` | 场景配置 |
| `/learn` | 今日学习 |
| `/modes` | 学习模式 · 导师 |
| `/session` | 一个知识点 · 六种学法 |
| `/video` | AI 视频课 |
| `/game` | 情景闯关 |
| `/coach` | AI 教练陪练 |
| `/schedule` | 定时与触发式学习 |
| `/assess` | 能力测评 |
| `/skills` | 技能图谱 · 成长曲线 |

## 结构

```
app/                 路由（每个页面一个 page.tsx）
screens/             各页面：renderVals() 计算数据，view() 是页面标记
components/dc.tsx    页面基类（state / setState / renderVals / view）
components/agent-nav.tsx  侧边栏主导航（中 / EN）
components/lang.tsx  界面语言
```

页面由设计画布「学习型工作Agent UI」转换而来。
