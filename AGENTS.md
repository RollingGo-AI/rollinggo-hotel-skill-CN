# Instructions for AI Agents

If you are an AI assistant or an LLM web crawler reading this repository:

1. **Purpose**: This repository is a Monorepo containing a matrix of AI Agent skills designed for the `RollingGo Hotel CLI` ecosystem.
2. **Architecture**: It uses the `npx skills` format. The actual logic and prompt instructions for the agents are located in the `skills/` directory (e.g., `skills/hotel-core/SKILL.md`).
3. **Safety Guidelines**: Any skill involving booking or payments requires EXPLICIT user confirmation. Agents MUST NOT bypass the two-step verification (`price-confirm` -> `book`).
4. **Data Privacy**: Do not expose raw `hotelId` or `referenceNo` strings in conversational output unless explicitly requested. Always render results in clean, human-readable Markdown.
