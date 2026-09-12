# 南京工业大学 637 · Organic637 V16 Formal Release

这是 **V16 正式源码版**。

课程骨架仍然是真正的有机化学知识与 637 题目能力；**54章《LAB-20：零号样品》正式小说主线**、人物/证物插图、3D与互动负责把“为什么现在要学这块知识”变成真实动机，而不是课前装饰。

主线：

`案件产生疑问 → 学一小块真正需要的化学 → 立即操作 → 回到证据 → 再推进案件 → 637出口 → 新悬念`

正式版以小说为主叙事：20天共 **54章**，每个故事节点都有章号、章名、前情提要和当前悬念。章节目录只显示已经读到的部分，不提前暴露未来章名。人物立绘、场景与证物图负责增强现场感，即使图片失效，正文和学习流程仍可完整继续。

## 正式版状态

- Day1–Day20 正常按进度解锁；测试版全日解锁已关闭。
- V16 Director + legacy fallback 保留。
- schemaVersion/version = 3，旧用户学习证据无损迁移。
- LAB-20 单一故事真源、防剧透门禁、54章正式小说（约3.36万汉字正文，不含题目与教学文本）。
- Day4/5 required 3D 有2D fallback。
- Day13–14 detective、Day17–18 synthesis 跨日保存。
- Day19 主线核心审核 + 独立原始150分整卷。
- 358条最终运行时 main/repair/adaptive 题库记录通过结构与语义审计。
- 选择题展示采用稳定洗牌，避免“正确答案总在A”的模式泄漏。
- 自动验证命令：`node scripts/run-v16-validation.js`。

完整审计见 `FORMAL_RELEASE_AUDIT.md`。

部署仍保持：GitHub Pages 静态前端 + 现有 Cloudflare Worker + D1。`config.js` 只存 Worker URL，不存秘密。
