<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — uumax 開發指南

## 專案概述

uumax 是 AI Agent 配置的 Marketplace（類似 ThemeForest for AI Agents）。
使用者可以瀏覽、複製、下載各框架的 agent 配置（CLAUDE.md、.cursorrules、MCP config 等），
也可以上架自己的配置（免費或付費）。

- **Repo:** https://github.com/lalawgwg99/uumax
- **部署:** Cloudflare Pages（靜態導出）

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Next.js 16（App Router, `output: 'export'`） |
| 語言 | TypeScript strict |
| 樣式 | Tailwind CSS v4（CSS-first config） |
| 主題 | next-themes（dark/light） |
| 圖標 | lucide-react |
| 內容 | Markdown + gray-matter frontmatter |
| 部署 | Cloudflare Pages（build → `out/`） |

## 目錄結構

```
uumax/
├── content/configs/          # 配置內容（按框架分目錄）
│   ├── claude-code/
│   ├── cursor/
│   ├── openclaw/
│   └── windsurf/
├── src/
│   ├── app/                  # Next.js 頁面
│   │   ├── page.tsx          # 首頁
│   │   ├── layout.tsx        # 根佈局
│   │   ├── configs/
│   │   │   ├── page.tsx      # 瀏覽頁（server）
│   │   │   ├── ConfigsClient.tsx  # 篩選（client）
│   │   │   └── [slug]/page.tsx    # 詳情頁
│   │   ├── submit/page.tsx   # 投稿指南
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/           # Header, Footer, ThemeToggle
│   │   ├── configs/          # ConfigCard, ConfigGrid, ConfigContent, FilterBar
│   │   └── ui/               # Badge, CopyButton
│   └── lib/
│       ├── types.ts          # 型別定義
│       └── configs.ts        # 資料層
└── next.config.ts            # output: 'export'
```

## 資料模型

每個配置是 `content/configs/<framework>/<name>.md`，用 frontmatter 定義 metadata：

```yaml
title: "Full-Stack Developer"
description: "One-line description"
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"           # claude-code | cursor | openclaw | windsurf | generic
useCases: ["fullstack", "frontend"] # frontend | backend | fullstack | devops | data | writing | security | mobile
tags: ["typescript", "nextjs"]
pricing: "free"                     # free | premium
price: 19                           # 僅 premium
purchaseUrl: "https://..."          # 僅 premium
configType: "claude-md"             # claude-md | cursor-rules | mcp-config | hooks | system-prompt | bundle
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: true
```

新增配置 = 新增 `.md` 檔，build 自動讀取，不改程式碼。

## 當前狀態（MVP v0.1）已完成

- 首頁（Hero, How it works, Featured, Frameworks, CTA）
- 瀏覽頁（搜尋 + 框架篩選 + 場景篩選）
- 詳情頁（Markdown 渲染 + 一鍵複製 + 下載）
- 投稿指南頁
- Dark mode
- 7 個種子配置
- SEO metadata
- 靜態導出

## 待開發（按優先級）

### P0 — 立即需要

1. **i18n** — 繁體中文 + 英文
   - `next-intl` v4，路由 `/zh-TW/...` `/en/...`
   - UI 翻譯：`messages/zh-TW.json`、`messages/en.json`
   - 配置內容：`.zh-TW.md` 後綴

2. **更多種子配置** — 目標 20+
   - Claude Code: API 開發、測試工程師、技術寫作
   - Cursor: Vue/Svelte、Go、Rust
   - OpenClaw: 單代理聊天、客服
   - Windsurf: ML、前端
   - Generic: Git 規範、Code review

3. **配置預覽截圖** — `public/previews/<slug>.png`

### P1 — 短期

4. **shiki 語法高亮**（build-time）
5. **URL query params** 讓篩選可分享
6. **Related Configs** 詳情頁推薦相關配置
7. **貢獻者頁面** `/contributors`
8. **sitemap.xml** 自動生成

### P2 — 中期

9. **付費整合** LemonSqueezy / Gumroad
10. **配置版本歷史**
11. **評分系統**（GitHub Discussions）
12. **配置產生器**（問答 → 自動生成配置）
13. **GitHub OAuth 登入**

## 開發規範

- TypeScript strict，不用 `any`
- 元件 named export，檔名 PascalCase
- CSS 用 Tailwind + CSS 變數（`var(--fg)`、`var(--bg)`）
- 靜態導出限制：不能用 `cookies()`、`headers()`、server-side `searchParams`、API routes
- 動態路由必須有 `generateStaticParams`
- Conventional commits: `feat|fix|refactor|docs|chore`

## 指令

```bash
npm run dev      # 開發 http://localhost:3000
npm run build    # 靜態導出（必須零錯誤）
npm run lint     # ESLint
npx serve out    # 預覽靜態輸出
```
