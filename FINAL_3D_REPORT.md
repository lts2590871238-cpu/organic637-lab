# FINAL 3D REPORT

## 完成内容

完成七类必要空间桥：四面体碳与楔线/虚线、CIP、R/S、SN2 背面进攻、E2 anti-periplanar、Newman 投影、环己烷椅式，以及 Diels–Alder endo/exo。统一由 `Chem3D` 渲染，包含拖动、标准视角、标签、分步动画、确定性小题、二维投影和资源释放。

## 嵌入主线

- Day 3：Diels–Alder endo/exo 简化预览。
- Day 4：SN2 背面进攻、错误同侧路径和翻面。
- Day 5：E2 二面角旋转、约 180° 高亮和三箭同步。
- Day 15：四面体/楔线、CIP、R/S、Newman、chair 集中收口；总时长保持约 85 分钟。
- Day 16：按已有 mastery 自动渐隐 SN2/E2 扶手，默认可退回二维，必要时再打开 3D。
- Day 19：正式考试过程不显示 3D。
- Day 20：Top 3 命中立体技能时，动态重开相应 3D 修复卡。

## 手机与性能

手机采用单列布局，模型宽度 100%，高度约 300–320px；控制按钮至少 44px。`touch-action: none` 只作用于 3D 画布，页面仍可正常滚动。像素比封顶 1.5；没有持续 60fps 空转；页面切换会释放 scene、geometry、material、renderer、事件、观察器与动画帧。

## Fallback

Three.js 正式运行文件与其核心依赖均在 `vendor/` 本地加载，无运行时 CDN。Three.js 或 WebGL 不可用时，课程仍显示二维 SVG 分解、步骤与练习，不会阻断学习。减少动态效果偏好会把连续动画改为分步跳转。

## 旧用户兼容

继续使用原状态 JSON，并仅增加 `threeDProgress` 和一次性提示标记，不改 D1 schema。旧进度不会清零；完成 Day 15 的用户只会看到一次轻提示，`currentDay` 不会被改回 15。3D 仅保存教学步骤、完成状态、练习答案与必要交互，不保存相机角度。

## 验证结果

语法、Phase 3–5、20 天数据、beginner closure、术语泄漏、V13 布局和 3D 专项校验全部通过。浏览器定点确认欢迎页、三角入口、Day 4、Day 5、Day 15、390px 手机、1440px 桌面、二维降级、Day 19 与 Day 20；模型拖动、退出恢复和渐隐重开均通过。

## 有意不包含

不做自由 3D 分子编辑器、任意 SMILES 转 3D、量子计算、分子动力学、在线 PubChem 依赖、服务器 3D、复杂 WebGL 特效。环氧开环 3D 与 meso 镜像扩展属于可选项，本次没有为它们另建系统，避免增加非必要复杂度。
