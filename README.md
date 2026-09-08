# 有机实验室 · Phase 3 continuation

本包接在已经成功运行的 clean-v1 后面，不改登录架构，不重建 D1，不改 Cloudflare CORS。

## 本轮做了什么

1. 把 Codex 已写但尚未接入页面的 `learning-engine.js`、`review-engine.js`、`interactions.js` 真正接入 `index.html/app.js`。
2. 修复 clean-v1 -> schema v2 的 Day1 迁移缺口，保留旧用户 Day1 进度、技能和 attempts。
3. 首页加入独立的“今日复习 / 今日错题 / 能力地图”。
4. Day1-Day4 使用统一学习流，记录 first attempt、hints、confidence、partial score、error type、response time。
5. Phase 3 可实际运行：排序、路线分支、结构选择、电子箭头。
6. 修复两类数据兼容：Day2 的简单 synthesis 不是 graph；Day3 的 early detective 先以 detective-lite 运行，避免学习流卡死。
7. 修复电子箭头热点对不同 SVG viewBox 的坐标适配。

## 部署

这是前端阶段更新。现有 Worker 与 D1 不需要重建。

把本包内容覆盖上传到现有 GitHub 仓库 `organic637-lab` 根目录即可。`worker/` 只是保持后端源码快照，本轮没有要求重新粘贴 Worker。

## 当前开放

Day1-Day4。

Day5-Day20 在本轮界面中不会伪装成已完成；下一阶段先做 Phase4 结构侦探，再做 Phase5 合成迷宫，然后继续扩充20天数据。
