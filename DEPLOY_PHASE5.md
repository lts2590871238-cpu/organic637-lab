# Phase 5 部署

本轮只更新 GitHub Pages 静态前端。

## GitHub

把本目录中的正式文件覆盖上传到现有仓库 `organic637-lab` 根目录。

新增重点文件：

- `js/synthesis.js`
- `data/synthesis-cases.js`
- `data/phase5-augment.js`
- `data/learning-scaffolds.js`
- `scripts/validate-phase5.mjs`

同时覆盖：

- `index.html`
- `app.js`
- `styles.css`
- `config.js`
- `data/day01.js`
- `data/skills.js`

GitHub Pages 保持：`main / (root)`。

## Cloudflare

本轮不要修改：

- Worker
- D1
- DB binding
- AUTH_PEPPER
- ALLOWED_ORIGIN

Phase 5 状态继续进入现有 core JSON，并由原来的 `progress_chunks` 同步。

## 更新后

等待 GitHub Pages 部署完成，浏览器执行 `Ctrl + F5`。

顶部应出现：

- 今日
- 复习
- 错题
- 能力
- 侦探
- 迷宫
