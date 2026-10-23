# 创想 · 从零开始的创赛工具箱

面向第一次参加创赛的同学，提供备赛步骤、工具导航和可执行的行动说明。

网站：https://chuangsai-compass-oct22.neatyak6.chatgpt.site/

本次同步基线：2026-10-23，线上版本 17，本地 Sites 源提交 `47a1f67038f3ccabe3d3fc4e076d7237e1919f3c`。GitHub Pages 镜像发布于 https://paloma421-tong.github.io/chuangxiang-toolbox/，来源为 `main` 分支的 `site/dist/`。页面公开访问；仓库源码也已公开以满足 GitHub Free 的 Pages 限制。原 Sites 站点及其访问设置独立维护。

## 当前内容

- 备赛步骤、工具箱（126 个资源入口）、资源搜索与浏览器本地收藏。
- 2026-10-23 新增 33 项资源，细分环境与地理数据、企业与竞品、市场趋势、思维导图、海报与设计、问卷与表单、商标查询。
- 首页“有个想法，然后呢？”提供备赛步骤、工具箱、小 tips 三个直接跳转入口。
- 创想 tips：数据收集清洗与可视化、企业与实地调研、专利与软著。
- 左侧贴边目录、绿色背景的白色小花 Logo。
- 可下载的美化 Excel 企业与实地调研工作簿，以及三张站内工作表预览图。

## 文件结构

- `site/dist/index.html`：可编辑的完整 HTML、CSS、数据与交互；也是直接发布文件。
- `site/dist/assets/fieldwork/`：工作簿与页面使用的预览图。
- `site/.openai/hosting.json`：原 Sites 身份和静态目录配置。
- `workbook-build/build-fieldwork.mjs`：工作簿与预览图生成源码。
- `docs/`：维护说明、产品决策与历史发布记录。

## 本地查看

在本仓库根目录执行 `python -m http.server 8080 --directory site/dist`，打开 http://localhost:8080 。网站无需安装依赖或构建。

## 工作簿生成

脚本使用 OpenAI artifact-tool，需在提供该依赖的 Codex 环境中运行。可设置 `ARTIFACT_TOOL_PACKAGE_JSON` 指向该依赖所在的 package.json；未设置时从本仓库正常解析依赖。执行 `node workbook-build/build-fieldwork.mjs`。生成结果写入 `outputs/`，站点下载与预览文件写入 `site/dist/assets/fieldwork/`。现有文件已包含，可直接使用。

## 同步与发布

此目录是干净的 GitHub 同步副本，只有一层 Git 仓库。原工作区外层仓库及 `site/.git` 保持原状；禁止把嵌套仓库当作普通目录直接提交。

GitHub 备份与 Sites 发布是两个流程。未来发布仍使用 Sites 技能、原 project_id 和源码助手：先确认原站最新状态，协调远端变化，再同步源码、打包与部署。提交 main 后，GitHub Pages 与已关联的 Netlify 镜像自动部署 site/dist；原 Sites 的受众独立维护。Netlify：https://illustrious-phoenix-92a79b.netlify.app/ 。详见 `docs/maintenance.md`。

同步内容不含私人截图、小红书采集图片、临时 tar、缓存、凭据或 Git 凭据配置。历史发布文档中的旧版本仅作追溯；最新同步摘要见 `docs/github-sync.md`。
