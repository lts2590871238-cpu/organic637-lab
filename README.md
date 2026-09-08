# 南京工业大学 637 · 20天有机实验室

这是当前不含 3D 的完整 20 天版本。

## 页面流程

登录 / 注册 → 欢迎页 → “20天有机化学大作战！” → 三角入口：

- 今日学习
- 今日复习
- 首页总览

首页再提供错题回看、能力地图和 20 天地图。

结构推断、路线设计、排序、电子箭头等不作为独立导航主入口，而是按 Day 1–20 教学节奏融入学习主线。

## 学习体验

- 一屏一个概念或判断
- 生活类比 → 化学语言 → 结构式 / 反应式 → 带做 → 半扶手 → 独立
- 60–90 分钟 / 日
- 可随时退出，回来继续当前位置
- 单题允许重复练习；重复不会伪装成跨日稳定掌握
- 错题与遗忘曲线复习分开
- Day19 Exam Mode 无提示、无即时解析
- Day20 根据 Top 3 漏洞自适应修复

## 目录

- `index.html` / `styles.css` / `app.js`：静态前端
- `data/day01.js` ... `data/day20.js`：20 天课程
- `data/learning-scaffolds.js`：化学式、类比、视觉扶手
- `js/learning-engine.js`：能力 / 遗忘 / 复习模型
- `js/interactions.js`：排序、分支、结构选择、电子箭头
- `js/detective.js`：结构证据链
- `js/synthesis.js`：多步路线训练
- `assets/mascots/`：用户提供的页面插图
- `worker/`：现有 Cloudflare Worker 后端源码快照
- `scripts/validate-full20.mjs`：最终全站数据检查

## 当前边界

3D 尚未加入。未来只在 R/S、Newman、chair、SN2 backside、E2 anti-periplanar、Diels–Alder endo/exo 等真正需要空间直觉的地方加入。
