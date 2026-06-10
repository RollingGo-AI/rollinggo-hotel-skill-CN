# RollingGo Hotel Skill

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

Official AI skills for the **RollingGo Hotel CLI** (`@rollinggo/hotel`). They teach agents the correct booking sequence, OAuth 2.1 PKCE login flow, and how to safely trigger end-to-end hotel transactions from the terminal. Works with the [skills CLI](https://github.com/vercel-labs/skills) (Cursor, Claude Code, Codex, Windsurf, Copilot, 40+ agents).

> **Important**: This CLI acts as a bridge to real-world bookings. AI agents are strictly instructed to **NEVER place an order without explicit price confirmation from the user**.

![Claude Skill](https://img.shields.io/badge/Claude-Skill-purple)
![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-blue)
![Copilot Ready](https://img.shields.io/badge/Copilot-Ready-green)
![Antigravity Ready](https://img.shields.io/badge/Antigravity-Ready-orange)

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

## Capabilities
| Command | Description |
|-------|-------------|
| **`rgh login`** | OAuth 2.1 PKCE Authorization |
| **`rgh search-hotels`** | Search hotels by location, dates, tags |
| **`rgh hotel-detail`** | View room types, live prices, cancellation policies |
| **`rgh price-confirm`** | Lock a price and generate a booking `referenceNo` |
| **`rgh book`** | Finalize order with guest info, returns Alipay link |
| **`rgh orders`** | View historical orders and their payment status |

## Quick reference (for AI agents)
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

## Structure
```text
RollingGo-Skills/
  ├── README.md               # Main orchestrator and SEO entry
  ├── AGENTS.md               # Directives for AI web crawlers
  ├── .github/
  │    └── copilot-instructions.md
  └── skills/
       ├── llms.txt           # AI Index for search engines
       └── hotel-core/        # Core hotel booking skill
            ├── SKILL.md
            └── references/
                 └── cli-params.md
```

## Risk level
**MODERATE** — Can trigger real-world hotel reservations. The skill enforces a strict two-step confirmation gate before making any `book` calls.

## License
MIT
