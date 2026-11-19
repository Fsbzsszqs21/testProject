# 小站 · 模块化多入口网站

一个纯静态、模块化的小网站，每个功能是一个独立模块，方便多人分工开发。

## 项目框架

### 架构总览

整体采用「三层分离」的纯静态架构，无构建工具、无后端依赖，所有资源通过相对路径加载：

```
┌───────────────────────────────────────────────┐
│  门户层  index.html（导航入口，仅列卡片 + 跳转）   │
└──────────────────┬────────────────────────────┘
                   │  相对路径跳转
      ┌────────────┴────────────┐
      ▼                         ▼
┌─────────────┐          ┌─────────────┐
│ 模块层 modules │  ...   │ 模块层 modules │  ← 各模块自包含（HTML/CSS/JS）
│ module_chatRoom│        │ module_memo   │
└──────┬──────┘          └──────┬──────┘
       │  引用                  │  引用
       ▼                        ▼
┌───────────────────────────────────────────────┐
│  共享层 shared/                                │
│   ├── styles/theme.css   公共主题（CSS 变量）    │
│   └── js/common.js       共享状态（localStorage）│
└───────────────────────────────────────────────┘
```

- **门户层**：根目录 `index.html`，唯一职责是列出所有模块卡片并提供跳转，不承载业务逻辑。
- **模块层**：`modules/<模块名>/`，每个功能一个独立文件夹，HTML / CSS / JS 全部自包含，开发者只需关注自己的模块。
- **共享层**：`shared/`，沉淀全站共用的主题样式与轻量状态，供所有模块引用；修改需双方确认。

### 技术栈

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| 结构 | HTML5 | 语义化标签，多入口页面 |
| 样式 | CSS3（原生） | 基于 CSS 变量的主题系统，支持明 / 暗切换 |
| 脚本 | 原生 JavaScript（ES5+） | 无框架、无构建，IIFE 暴露全局 `App` 对象 |
| 状态共享 | Web Storage（localStorage） | 跨模块共享主题、用户等轻量数据 |
| 部署 | 纯静态文件 | 可托管于 GitHub Pages / Vercel / Netlify / 任意静态服务器 |

### 模块通信方式

模块之间**不直接互相引用**，保持解耦，共享数据统一走以下两种通道：

1. **跨页面共享状态** → 经 `shared/js/common.js` 读写 `localStorage`（如主题、用户名），一处写入、全站生效。
2. **页面间传参** → 通过 URL 查询参数（如 `module_memo/index.html?id=1`）传递一次性数据。

### 设计原则

- **高内聚、低耦合**：模块只依赖 `shared/` 公共层，模块之间无直接依赖。
- **自包含**：每个模块文件夹可独立复制、独立运行，不依赖其它模块。
- **相对路径优先**：所有内部链接与资源引用均使用相对路径，保证项目可整体迁移到任意子路径部署。
- **公共改动需同步**：`shared/` 与门户 `index.html` 为公共区域，修改前需与协作方确认。

## 目录结构

```
testProject/
├── index.html              # 门户导航页（列出所有模块）
├── shared/                 # 两人共用的资源，改动前互相知会一声
│   ├── styles/
│   │   └── theme.css       # 公共主题（颜色/字体/间距变量 + 暗色主题）
│   └── js/
│       └── common.js       # 共享状态工具（主题、用户，基于 localStorage）
├── modules/
│   ├── module_chatRoom/     # 聊天室 —— 负责人：cy
│   │   ├── index.html
│   │   ├── style.css
│   │   └── main.js
│   └── module_memo/        # 备忘录 —— 负责人：crr
│       ├── index.html
│       ├── style.css
│       └── main.js
└── README.md
```

## 分工约定

- **各改各的模块**：你只动 `modules/module_chatRoom/`（聊天室），crr 只动 `modules/module_memo/`（备忘录）。
- **公共区 `shared/`**：两人共用，要改先在群里说一声，避免互相覆盖。
- **导航页 `index.html`**：只负责"列卡片 + 跳转"，不塞业务逻辑。
- **Git 基本操作**：请看 [操作指南.md](./操作指南.md)。

## 如何新增一个模块

1. 在 `modules/` 下新建文件夹，例如 `modules/module_demo/`，放入：
   - `index.html`（参照 module_chatRoom 的写法，记得引用主题和 common.js）
   - `style.css`（自己的样式）
   - `main.js`（自己的逻辑）
2. 在根目录 `index.html` 的 `.grid` 里加一张卡片，链接指向新模块。
3. 在本 README 的分工表里登记负责人。

## 共享层用法

每个模块的 HTML `<head>` 里引入公共主题，`<body>` 末尾引入公共脚本：

```html
<link rel="stylesheet" href="../../shared/styles/theme.css">
<script src="../../shared/js/common.js"></script>
```

脚本里调用全局 `App` 对象：

```js
App.applyTheme();           // 应用当前主题（每个模块入口都调一下）
App.toggleTheme();          // 切换明暗主题
App.setUser('小明');        // 保存共享用户名，其它模块可读
App.getUser();              // 读取共享用户名
```

## 本地预览

直接双击根目录 `index.html` 即可在浏览器打开，无需任何构建工具。

> 建议用本地静态服务器预览（避免某些浏览器对 `file://` 的限制），例如：
> ```
> npx serve
> ```
> 或 VS Code 的 Live Server 插件。

## 部署

纯静态，把整个 `testProject/` 目录扔到任意静态托管即可：GitHub Pages、Vercel、Netlify、内网 nginx 都行。

⚠️ **注意**：所有内部链接和资源路径都用**相对路径**（如 `./xxx`、`../../shared/xxx`），这样无论部署在域名根目录还是子路径下都能正常打开。
