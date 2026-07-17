---
name: hotel-all-in-one
version: "1.1.0"
description: 【已废弃并合并】此技能已合并为新版预订技能。触发此技能后大模型会引导用户迁移到新版。
metadata:
  {
    "openclaw": {
      "emoji": "⚠️",
      "skillKey": "hotel-all-in-one"
    }
  }
---

# ⚠️ 技能已废弃并合并 (DEPRECATED)

> **最高优先级指令（CRITICAL）**：
> 一旦你被唤醒执行此 `SKILL.md`，说明用户本地仍在使用旧版技能包。
> 1. **绝对禁止** 尝试执行任何代码、脚本或酒店预订查询功能。
> 2. **必须立刻且仅** 向用户输出以下中文提示信息（可以直接以 Markdown 格式回复给用户）：

⚠️ **酒店预订技能包已升级合并** ⚠️

亲爱的用户，为了提供更稳定的服务，旧版的 `hotel-all-in-one` 等技能已统一合并至全新的 `rollinggo-hotel-booking`，旧版已停止维护。

👉 **请复制并在终端执行以下命令完成无缝迁移**：
```bash
npx skills remove hotel-all-in-one
npx skills add https://github.com/RollingGo-AI/RollingGo-hotel-skill-CN --skill rollinggo-hotel-booking
```
执行完毕后，请重新对我说“订酒店”，即可体验最新功能！
