<h1 align="center">uumax</h1>

<p align="center">
  <strong>AI Agent 配置的 Marketplace</strong><br>
  瀏覽、複製、分享最佳 AI Agent 配置 — CLAUDE.md、.cursorrules、MCP config，一站搞定
</p>

<p align="center">
  <a href="https://uumax.pages.dev">🌐 Live Demo</a> ·
  <a href="#快速開始">快速開始</a> ·
  <a href="#上架配置">上架你的配置</a> ·
  <a href="#貢獻指南">貢獻</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Deploy-Cloudflare_Pages-orange?logo=cloudflare" />
  <img src="https://img.shields.io/github/license/lalawgwg99/uumax" />
</p>

---

## 這是什麼？

**uumax** 是一個專為 AI 開發者打造的配置共享平台，就像 ThemeForest 之於網頁模板，uumax 之於 AI Agent 配置。

你可以在這裡：
- 🔍 **搜尋 & 篩選** 各框架的最佳 agent 配置
- 📋 **一鍵複製** 直接貼進你的專案
- 🤖 **即時試用** 用 OpenRouter 免費模型驗證配置效果
- ✨ **AI 生成** 透過問答自動生成專屬配置
- 📤 **上架分享** 把你的配置貢獻給社群（免費或付費）

---

## 支援框架

| 框架 | 配置類型 |
|------|---------|
| **Claude Code** | `CLAUDE.md` |
| **Cursor** | `.cursorrules` |
| **OpenClaw** | `identity.md` / `soul.md` |
| **Windsurf** | `.windsurfrules` |
| **Generic** | System Prompt / MCP Config |

> **OpenClaw** 是什麼？→ 一個開源 AI 訊息閘道，支援 Discord、Telegram、Slack 等頻道串接多 Agent。[了解更多](https://github.com/lalawgwg99/openclaw)

---

## 功能一覽

- ✅ 搜尋 + 框架 / 使用場景多維篩選，URL query 可分享
- ✅ 語法高亮（shiki）+ 一鍵複製 + 直接下載
- ✅ OpenRouter 即時對話試用（串流，免費模型）
- ✅ AI 配置產生器（問答式 → 輸出 config）
- ✅ Dark mode + 繁體中文 / English i18n
- ✅ giscus 評論（GitHub Discussions 驅動）
- ✅ 完整 SEO：sitemap.xml / robots.txt / OG 圖片
- ✅ 靜態導出 → Cloudflare Pages，零冷啟動

---

## 快速開始

### 線上使用（推薦）

直接前往 **[uumax.pages.dev](https://uumax.pages.dev)** — 不需要安裝任何東西。

### 本地開發

```bash
git clone https://github.com/lalawgwg99/uumax.git
cd uumax
npm install
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000)

**環境需求：** Node.js 20+

---

## 上架配置

在 `content/configs/<framework>/` 新增一個 `.md` 檔即可，build 時自動讀取，不需改程式碼。

```yaml
---
title: "Full-Stack TypeScript Expert"
description: "針對 Next.js + tRPC 全端開發優化的 CLAUDE.md"
author: "你的名字"
authorGithub: "your-github"
framework: "claude-code"
useCases: ["fullstack", "backend"]
tags: ["typescript", "nextjs", "trpc"]
pricing: "free"
configType: "claude-md"
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: false
---

你的配置內容寫在這裡...
```

送出 PR 即可。詳細說明見 [投稿指南](https://uumax.pages.dev/submit)。

---

## 貢獻指南

歡迎任何形式的貢獻：

- 📝 **新增配置** — 把你用過效果最好的 agent config 分享出來
- 🐛 **回報問題** — 開 [Issue](https://github.com/lalawgwg99/uumax/issues)
- 💡 **功能建議** — 開 [Discussion](https://github.com/lalawgwg99/uumax/discussions)
- 🔧 **程式碼貢獻** — Fork → Branch → PR

Commit 格式：`feat|fix|refactor|docs|chore: 說明`

---

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Next.js 16（App Router, Static Export） |
| 語言 | TypeScript strict |
| 樣式 | Tailwind CSS v4 |
| 語法高亮 | shiki |
| 評論 | giscus（GitHub Discussions） |
| 部署 | Cloudflare Pages |

---

## License

MIT © [lalawgwg99](https://github.com/lalawgwg99)

---

<p align="center">如果這個專案對你有幫助，給個 ⭐ 讓更多人發現它！</p>
