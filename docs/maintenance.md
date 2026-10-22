# 维护与交接

## 源码位置

工作目录为 `site/`。这是从原 Sites 项目取回的独立 Git 仓库，已有原始历史。当前没有前端框架、依赖安装、编译或服务器端功能；发布目录是 `dist/`，主文件 `dist/index.html` 同时是可编辑源文件和发布文件。不要把它当作可删除的构建产物。

## 常见修改

- `const tools`：资源数据。每条依次为名称、类别、网址、简述、行动提示、图标文字；后续可选字段为详细介绍、适用人群、开始方法、使用提示和来源网址。以现有条目为格式参考。
- `const cats`：常规分类和顺序。修改前对照 `product-decisions.md`。
- `skillKits`：可复制的创赛 AI 工作流提示词。
- `beginnerSteps`（以文件实际变量命名为准）及入门弹层：零基础路线和交付物提示。
- `render`、`renderSkillKits`、`openDetail`：资源筛选、工作流面板和资源介绍。
- 顶部 `<style>`：颜色、布局、移动端适配及吸顶搜索。

收藏使用 `localStorage` 的 `compass-saved`，按资源数组索引记录。新增资源尽量追加；删除或重排资源会影响已有用户的收藏对应关系，变更前需要考虑兼容性。

## 修改后检查

先核对 JavaScript 语法，再在浏览器查看桌面和窄屏：搜索、分类顺序、三个特色入口、用途筛选、收藏、资源详情开关、零基础路线和跳转。确认“经验分享”没有恢复，B站获奖路演仍在“参考视频”。核对目标资源和来源网址是否相符；只需检查此次涉及的链接，不要求每次全站重查。

截图预览由 `image.thum.io` 即时生成，未托管在本站；加载失败时页面已有打开原站的降级提示。收藏仅保存在当前浏览器，不做跨设备同步。

## GitHub Pages 与原站发布

GitHub Pages 与 Sites 主站是两套独立发布。Pages 工作流 `.github/workflows/pages.yml` 从 `main` 分支的 `site/dist/` 自动部署，入口为 `site/dist/index.html`。公开页面：https://paloma421-tong.github.io/chuangxiang-toolbox/。该 GitHub 仓库为公开状态，以满足 GitHub Free 的 Pages 限制；源代码与页面均可被互联网访问。详细说明见 `github-pages.md`。

Sites 主站仍使用 `site/.openai/hosting.json` 中的原 project_id 和 Sites 源码助手。修改线上主站前，须单独确认当前版本和访问范围，通过 Sites 流程保存、部署；GitHub Pages 部署不会改变或发布到 Sites。
