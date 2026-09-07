# clean-v1 QA

本版发布前自动检查目标：

- 无 npm / Vite / TypeScript 构建依赖
- `app.js` JavaScript 语法通过
- `data/day01.js` JavaScript 语法通过
- Worker ESM 语法通过
- Worker `/health` 可在 Node Web API 环境模拟
- CORS 使用与已成功英语站相同的 `ALLOWED_ORIGIN` 精确 origin 模式
- 前端密码不直接发送，浏览器先 PBKDF2 派生 verifier
- Worker 再以 `AUTH_PEPPER` 做 HMAC 后写入 D1
- 会话使用 Bearer token，不依赖跨站 Cookie
- 学习状态本地优先，登录后同步 D1 `progress_chunks`
