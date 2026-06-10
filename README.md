# RollingGo Hotel Skills

[English](#english) | [简体中文](#简体中文)

```text
  ██████╗  ██████╗ ██╗     ██╗     ██╗███╗   ██╗ ██████╗  ██████╗  ██████╗ 
  ██╔══██╗██╔═══██╗██║     ██║     ██║████╗  ██║██╔════╝ ██╔════╝ ██╔═══██╗
  ██████╔╝██║   ██║██║     ██║     ██║██╔██╗ ██║██║  ███╗██║  ███╗██║   ██║
  ██╔══██╗██║   ██║██║     ██║     ██║██║╚██╗██║██║   ██║██║   ██║██║   ██║
  ██║  ██║╚██████╔╝███████╗███████╗██║██║ ╚████║╚██████╔╝╚██████╔╝╚██████╔╝
  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝  ╚═════╝ 
            ██╗  ██╗ ██████╗ ████████╗███████╗██╗     
            ██║  ██║██╔═══██╗╚══██╔══╝██╔════╝██║     
            ███████║██║   ██║   ██║   █████╗  ██║     
            ██╔══██║██║   ██║   ██║   ██╔══╝  ██║     
            ██║  ██║╚██████╔╝   ██║   ███████╗███████╗
            ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
            
  ──●────●────●────●────●────●──
   AI Skills for Claude • Cursor • Copilot
```

Search → Detail → Price Confirm → Book → Orders

![Claude Skill](https://img.shields.io/badge/Claude-Skill-purple)
![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-blue)
![Copilot Ready](https://img.shields.io/badge/Copilot-Ready-green)
![Antigravity Ready](https://img.shields.io/badge/Antigravity-Ready-orange)

---

## English

Official AI skills for the **RollingGo Hotel CLI** (`@rollinggo/hotel`). They teach agents the correct booking sequence, OAuth 2.1 PKCE login flow, and how to safely trigger end-to-end hotel transactions from the terminal. Works with the [skills CLI](https://github.com/vercel-labs/skills) (Cursor, Claude Code, Codex, Windsurf, Copilot, 40+ agents).

> **Important**: This CLI acts as a bridge to real-world bookings. AI agents are strictly instructed to **NEVER place an order without explicit price confirmation from the user**.

**For AI agents:** When the user asks to **book a hotel**, **search for rooms**, or **check their orders**, use the `rgh` CLI commands sequentially. Never leak `hotelId` or `referenceNo` directly to the user; format results into user-friendly Markdown.

### npx skills (recommended)
Works with Cursor, Claude Code, Codex, Windsurf, Copilot, Google Antigravity, and 40+ agents:

```bash
# Install the core hotel booking skill
npx skills add https://github.com/RollingGo-AI/hotel-skill --skill hotel-core
```

The CLI auto-detects the installed agent. To target one explicitly, pass `--agent`:

```bash
npx skills add https://github.com/RollingGo-AI/hotel-skill --skill hotel-core --agent cursor
```

### Clone / copy

Clone this repo and copy the `skills/hotel-core/` folder into the appropriate directory for your agent:

| Agent | Skill Directory |
|-------|-----------------|
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Windsurf | `~/.windsurf/skills/` |
| Google Antigravity | `~/.gemini/antigravity/skills/` |

### Capabilities
| Command | Description |
|-------|-------------|
| **`rgh login`** | OAuth 2.1 PKCE Authorization |
| **`rgh search-hotels`** | Search hotels by location, dates, tags |
| **`rgh hotel-detail`** | View room types, live prices, cancellation policies |
| **`rgh price-confirm`** | Lock a price and generate a booking `referenceNo` |
| **`rgh book`** | Finalize order with guest info, returns Alipay link |
| **`rgh orders`** | View historical orders and their payment status |

### Quick reference (for AI agents)
Canonical order sequence to suggest or generate:

```bash
# 1. Start with checking login status
rgh whoami
# -> If not logged in, prompt user to run `rgh login`

# 2. Search for hotels (e.g. Shanghai next week)
rgh search-hotels --place "Shanghai" --check-in-date 2026-06-20

# 3. Present options to user and get their choice. Then fetch details:
rgh hotel-detail --hotel-id 12345 --check-in-date 2026-06-20

# 4. Once user picks a room and rate plan, lock the price (Requires user confirmation!)
rgh price-confirm --hotel-id 12345 --rate-plan-id "RP01" --rooms 1 --check-in-date 2026-06-20 --check-out-date 2026-06-21 --adults 2

# 5. After the user approves the locked price and provides their Name/Email:
rgh book --reference-no "REF9999" --first-name "San" --last-name "Zhang" --email "zhangsan@example.com"
```

### Risk level
**MODERATE** — Can trigger real-world hotel reservations. The skill enforces a strict two-step confirmation gate before making any `book` calls.

---

## 简体中文

为 **RollingGo 酒店命令行工具** (`@rollinggo/hotel`) 量身定制的官方 AI 技能库。它能够教会各类 AI 代理正确的酒店预订流程、OAuth 2.1 PKCE 登录流，以及如何安全地在终端内触发真实的酒店交易。兼容 [skills CLI](https://github.com/vercel-labs/skills) 规范，支持 Cursor、Claude Code、Codex、Windsurf、Copilot 等 40 多种主流大模型代理。

> **安全警告**：本工具直接连接真实交易系统。技能库已向 AI 代理下达严格的“死命令”：**在未经用户明确确认价格和支付意愿前，绝不允许私自发起任何订单**。

**给 AI 代理的提示：** 当用户要求**预订酒店**、**查询空房**或**查看订单**时，请按顺序使用 `rgh` 命令。绝对不要向用户泄露原始的 `hotelId` 或 `referenceNo` 等系统内部 ID，请将结果格式化为美观的 Markdown 卡片。

### 通过 npx skills 安装 (推荐)
自动兼容 Cursor, Claude Code, Windsurf 等 40+ 种代理：

```bash
# 安装核心酒店预订技能
npx skills add https://github.com/RollingGo-AI/hotel-skill --skill hotel-core
```

CLI 会自动检测您系统上安装的 Agent。您也可以通过 `--agent` 强制指定目标环境：

```bash
npx skills add https://github.com/RollingGo-AI/hotel-skill --skill hotel-core --agent cursor
```

### 手动克隆/复制

克隆本仓库，将 `skills/hotel-core/` 文件夹直接放入您 Agent 对应的技能目录即可：

| 代理工具 | 本地技能存放目录 |
|-------|-----------------|
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Windsurf | `~/.windsurf/skills/` |
| Google Antigravity | `~/.gemini/antigravity/skills/` |

### 核心能力清单
| 指令 | 业务描述 |
|-------|-------------|
| **`rgh login`** | OAuth 2.1 PKCE 免密安全授权 |
| **`rgh search-hotels`** | 支持按地标、日期、标签多维度检索酒店 |
| **`rgh hotel-detail`** | 实时拉取酒店房型、最新报价与退改政策 |
| **`rgh price-confirm`** | 锁定房间价格并生成交易参考号 `referenceNo` |
| **`rgh book`** | 提交预订入住人信息，返回真实的支付宝付款链接 |
| **`rgh orders`** | 查阅历史订单及最新支付状态 |

### 大模型操作 SOP (标准作业程序)
要求 AI 建议或自动执行的规范代码流：

```bash
# 1. 首先检查用户登录状态
rgh whoami
# -> 如果未登录，引导用户先执行 `rgh login`

# 2. 检索意向酒店（例如：下周的上海酒店）
rgh search-hotels --place "Shanghai" --check-in-date 2026-06-20

# 3. 将搜索结果用 Markdown 呈现给用户。待用户挑选后，获取详情：
rgh hotel-detail --hotel-id 12345 --check-in-date 2026-06-20

# 4. 用户确定房型后，进行锁价预订 (此步为高风险，必须要求用户确认！)
rgh price-confirm --hotel-id 12345 --rate-plan-id "RP01" --rooms 1 --check-in-date 2026-06-20 --check-out-date 2026-06-21 --adults 2

# 5. 在用户同意上述锁定的价格并提供姓名邮箱后，正式下单：
rgh book --reference-no "REF9999" --first-name "San" --last-name "Zhang" --email "zhangsan@example.com"
```

### 风险等级
**中等风险 (MODERATE)** — 此技能可触发真实的现实世界酒店客房交易。已通过严格的两步确认机制拦截未经授权的 `book` 调用。

---

## Structure / 代码架构
```text
RollingGo-Skills/
  ├── README.md               # Main orchestrator and SEO entry / 主入口与 SEO 文案
  ├── AGENTS.md               # Directives for AI web crawlers / 针对 AI 爬虫的全局指令
  ├── .github/
  │    └── copilot-instructions.md
  └── skills/
       ├── llms.txt           # AI Index for search engines / 大模型全局搜索索引
       └── hotel-core/        # Core hotel booking skill / 核心酒店预订功能包
            ├── SKILL.md
            └── references/
                 └── cli-params.md
```

## License
MIT
