# organic637 Cloudflare Worker

这个目录只保存后端源码快照。第一版推荐直接在 Cloudflare Dashboard 新建 Worker 后，把 `organic637-worker.js` 全部粘贴到 Edit code 中部署，不把 Worker 和 GitHub 构建绑定在一起。

必须配置：

- D1 binding：变量名 `DB`，数据库 `organic637-lab`
- Text variable：`ALLOWED_ORIGIN=https://lts2590871238-cpu.github.io`
- Secret：`AUTH_PEPPER`，建议使用随机长字符串

D1 首次创建后，在 D1 Console 中执行 `schema.sql`。

部署后先访问：

`https://organic637-lab-api.lts2590871238.workers.dev/health`

应看到 `ok:true`、`database:true`、`auth_configured:true`。
