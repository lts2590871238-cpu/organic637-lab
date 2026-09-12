# 南京工业大学 637 · Organic637 V16 Test Build

这是 **V16 测试版**，不是正式发布版。

核心目标保持不变：真正的有机化学知识 + 637 真题能力是骨架；漫画、案件、互动和3D只负责降低理解成本、改变学习节奏，并让学生愿意继续学。

V16 主线已经改为：

`漫画提出问题 → 学一小块真正的化学 → 立即操作 → 回到案件应用 → 再补必要知识 → 角色/任务切换 → 637正式出口 → 悬念推进`

部署架构仍保持：GitHub Pages 静态前端 + 现有 Cloudflare Worker + D1。`config.js` 只放 Worker URL，不放秘密；Worker/D1/auth 不需要重建。

## 当前测试版状态

- Day1–Day20 已进入 V16 Director，旧线性流程仍保留 fallback。
- schemaVersion/version = 3，旧用户学习证据迁移保留。
- `LAB-20：零号样品` 使用单一故事真源和防剧透门禁。
- Mandatory Day 全部 <=60 分钟的元数据预算；Day15=59、Day19=58。
- Day4/5 required 3D 有可达的 2D fallback。
- Day13–14 detective、Day17–18 synthesis 跨日保存。
- Day19 20天主线使用核心审核；原始150分整卷独立保留。
- 漫画采用本地资源优先、当前+下一幕预加载和文字/色块fallback。
- 自动验证命令：`node scripts/run-v16-validation.js`。

当前自动化 Test Build 验收已通过；**正式版仍需在 GitHub Pages 上完成真实浏览器/手机计时和交互验收**。部署后按 `GITHUB_PAGES_TEST_CHECKLIST.md` 执行。

直接把本目录内容上传/覆盖到测试用 `organic637-lab` GitHub Pages 仓库即可。建议先用测试分支或测试仓库，不要覆盖你仍在使用的正式站点。
