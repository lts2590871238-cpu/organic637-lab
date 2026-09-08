# 最终版部署

这次不需要重建 Cloudflare Worker 或 D1。

1. 解压最终 ZIP。
2. 将压缩包中 `organic637-final20` 文件夹里的全部内容上传 / 覆盖到 GitHub 仓库 `organic637-lab` 根目录。
3. 必须一起上传新增的 `assets/` 文件夹。
4. GitHub Pages 继续保持 `main / (root)`。
5. 等 GitHub Pages 更新后打开网站并按一次 `Ctrl + F5`。

现有 `config.js` 仍指向：

`https://organic637-lab-api.lts2590871238.workers.dev`

本轮没有修改 Worker API、D1 schema、AUTH_PEPPER 或 ALLOWED_ORIGIN。
