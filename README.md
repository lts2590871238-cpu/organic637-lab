# 有机实验室 · 南京工业大学 637 · clean-v1

这是一版从零重写的第一垂直切片，技术结构刻意复用已经跑通的考研英语网站模式：

- GitHub Pages：只托管静态前端
- `config.js`：只保存 Worker URL，不保存任何 Secret
- Cloudflare Worker：注册、登录、云同步；以后 AI 也只放这里
- Cloudflare D1：账号、会话和云端学习状态
- 浏览器本地：localStorage 双份保存，网络暂时异常时不丢当前进度

## 前端文件

- `index.html`
- `styles.css`
- `config.js`
- `app.js`
- `data/day01.js`

没有 Vite、React、npm 构建，也不需要 GitHub Actions。GitHub Pages 直接从 `main / (root)` 发布。

## Worker

见 `worker/README.md`。第一版推荐在 Cloudflare Dashboard 手动创建 Worker，并把 `organic637-worker.js` 粘贴进去，避免把前端仓库和 Worker 构建流程混在一起。
