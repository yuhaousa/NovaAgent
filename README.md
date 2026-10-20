# NovaAgent · 学习型工作 Agent UI

在你做事时向你学习的工作 Agent：工作（今日任务、任务执行、晚间复盘、经验库、场景配置）、学习（今日学习、六种学法、视频课、情景闯关、AI 教练、定时学习）、成长（能力测评、技能图谱）。

这是可演示的前端原型：Next.js 静态导出，部署到 Cloudflare Workers 的静态资源，不需要数据库或密钥。所有交互状态都在浏览器里。左上角可切换中文 / English：菜单和页面内容一起切换，选择记在浏览器里。

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

或交给 GitHub Actions（`.github/workflows/deploy.yml`）：在仓库 Settings → Secrets and variables → Actions 添加机密 `CLOUDFLARE_API_TOKEN`（模板 “Edit Cloudflare Workers”），之后每次推送到 `main` 自动构建并部署；也可在 Actions 页手动运行 “Deploy”。账号 ID 默认沿用 deepread 的账号，需要换账号时添加变量 `CLOUDFLARE_ACCOUNT_ID`。

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
| `/progress` | 学习进度：技能网状图 + 能力雷达图（均可切换表格视图） |

## 结构

```
app/                 路由（每个页面一个 page.tsx）
screens/             各页面：renderVals() 计算数据，view() 是页面标记
components/dc.tsx    页面基类（state / setState / renderVals / view）
components/agent-nav.tsx  侧边栏主导航（中 / EN）
components/lang.tsx  界面语言
lib/i18n/            英文模式：tr() 在渲染时查 en.json；页面逻辑仍用中文原值，不受影响
lib/skills.ts        学习者技能数据（学习进度页使用，与技能图谱、能力测评页一致）
```

## 英文翻译

页面文字在显示时经过 `tr()`：先整句查 `lib/i18n/en.json`，再按“数字换成 #”的模板查，最后逐段查。新增或修改中文文案后，在 `en.json` 补上对应英文即可；查不到的会原样显示中文。

页面由设计画布「学习型工作Agent UI」转换而来。
