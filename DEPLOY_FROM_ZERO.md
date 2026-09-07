# 从零部署：只按这一套走

## A. GitHub：先让纯静态前端上线

1. 新建 GitHub 仓库，例如 `organic637-lab`。
2. 把本压缩包内部所有文件上传到仓库根目录。
3. GitHub -> Settings -> Pages。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/(root)`，Save。
6. 等待 GitHub Pages 生成网站。

注意：这里不使用 GitHub Actions，不使用 Vite，不使用 Cloudflare Pages。

## B. Cloudflare：创建 D1

1. Storage & databases -> D1 -> Create database。
2. 数据库名：`organic637-lab`。
3. 进入 Console，把 `worker/schema.sql` 全部复制执行。
4. 确认出现 `users`、`sessions`、`progress_chunks`、`auth_rate` 四张业务表。

## C. Cloudflare：手动创建 Worker

1. Compute -> Workers & Pages -> Create。
2. 选择 `Start with Hello World`，Worker 名称固定：`organic637-lab-api`。
3. 部署一次 Hello World。
4. 进入 Worker -> Edit code。
5. 把 `worker/organic637-worker.js` 全部复制进去覆盖默认代码，Deploy。

第一版不要把 Worker 连接 GitHub，不设置 Root directory，不运行 npm/wrangler build。

## D. Worker 绑定与变量

进入 `organic637-lab-api`：

1. Bindings -> Add -> D1 database
   - Variable name：`DB`
   - Database：`organic637-lab`
2. Settings -> Variables and secrets -> Add variable
   - Type：Text
   - Name：`ALLOWED_ORIGIN`
   - Value：`https://lts2590871238-cpu.github.io`
3. Add variable / Secret
   - Name：`AUTH_PEPPER`
   - Value：自己生成一段至少 32 位随机字符串
4. 保存后重新 Deploy Worker。

注意：`ALLOWED_ORIGIN` 只有 GitHub Pages 的 origin，不包含仓库路径，不带末尾 `/`。

## E. Worker 健康检查

打开：

`https://organic637-lab-api.lts2590871238.workers.dev/health`

应看到：

- `ok: true`
- `database: true`
- `auth_configured: true`
- `allowed_origin_configured: true`

四项都通过以后再测试注册。

## F. 前端 Worker URL

本包 `config.js` 已经按当前 Cloudflare 子域预填：

`https://organic637-lab-api.lts2590871238.workers.dev`

如果你实际 Worker 地址不同，只改 `config.js` 这一行。不要在 GitHub 前端写 D1 ID、AUTH_PEPPER 或任何 AI Key。

## G. 最终验收

1. GitHub Pages 首页可打开。
2. 注册账号 `111` + 6 位以上密码。
3. 登录后进入 Day 1 首页。
4. 做一道题后刷新，进度仍在。
5. 完成若干题后退出，再登录，进度恢复。
6. 换另一个浏览器登录同一账号，云端进度恢复。
7. Worker `/health` 四项仍为 true。
