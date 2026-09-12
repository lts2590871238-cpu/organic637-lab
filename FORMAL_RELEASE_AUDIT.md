# Organic637 V16 正式版总审计

Date: 2026-09-12
Scope: V16 formal source release

## 1. 本轮为什么重新审计

正式版不是把测试版标签去掉就结束。本轮重新从“学生真实会看到什么”出发，审计了四层：

1. **知识闭环**：新术语不能在教学前偷偷进入题干/选项/解析；Director prerequisite 和旧 glossary/first-use 两套门禁都必须通过。
2. **题目语义**：题干问什么，选项必须处在同一证据层级；不能把“结构式能看见什么”和“谁改了记录”混成同一道多选。
3. **题目数据结构**：单选/多选/排序/机理箭头/路线/侦探题的答案必须在运行时真实可作答。
4. **正式版体验**：54章小说主叙事、正常逐日解锁、沉浸欢迎页、插图失败fallback、云状态和旧用户迁移都不能回退。

## 2. 发现并修复的实际问题

### A. Day1 案件结构题证据层级混乱

原题要求“只从 L20-0 结构式直接确认”，却混入：

> 许临川修改了记录

这是教学语义 bug：不是“错误干扰项设计得巧”，而是把**结构观察**和**责任判断**两个证据层级混到同一道题。

正式版改为：

- 苄位 –OH
- 芳环上的 Br
- “图里已经明确画出 –OH 朝向你还是背向你”

前两项可以直接读出，第三项不能从当前二维连接式读出。这样错误项仍然能检验“事实与推测分开”，但不会突然把人物责任塞进结构题。

### B. Day1 修正后曾出现术语提前泄漏

第一次修正曾使用“R/S、实楔/虚线楔”，但这些概念要到后续立体化学才正式学习。术语闭环检查将其拦下。

正式版全部换成零基础人话：

> “朝向你还是背向你”“三维朝向”

`audit-term-leaks.mjs` 当前输出 `[]`。

### C. Day3 mandatory 主线重复使用同一道题

Director 的 Day3 在普通练习和 637 exit 中重复调用 `d03-alkylation-01`。学生会在同一天第二次遇到完全相同的问题。

正式版新增独立迁移题 `d03-transfer-build-reduce-01`：

> 1-丁炔 → NaNH₂ → CH₃CH₂Br → H₂/Lindlar

要求同时调用“端炔增碳 + Lindlar还原”，不再重复原题。

### D. Day13 一个旧 detective 题运行时不可正确作答

`d13-case-acetone` 的目标是：当前 IR 证据不足以区分丙酮/丙醛，应同时保留两者。

旧运行时却把它转换成了单选 `detective`，答案字段却保存 `[a,b]`，交互引擎只能提交一个候选。这是一个真实功能 bug。

正式版将其修成真正的 `multi-choice`，可同时选择丙酮与丙醛。

### E. 选择题答案位置存在严重模式泄漏

原始题库的普通单选中，绝大多数正确答案位于第一项。学生长期使用后可以通过“总选A”获得虚假正确率。

正式版不重写350条题库文本，而是在渲染层按 `day + question.id` 做**确定性洗牌**：

- 同一道题每次打开顺序稳定，不会在提交前跳动；
- 答案仍按 option id 判断，不改变知识逻辑；
- 当前194道最终运行时普通单选的正确显示位置分布为 `73 / 59 / 61 / 1`（四选题极少），最大占比低于45%。

## 3. 54章正式小说主线

正式版不再把故事当作“漫画后的补叙事”。小说现在是主叙事层：

- Day1–Day20 共 **54章**，落在用户冻结的40–60章中长篇范围内；
- 正文章节总量约 **33,612 个汉字**（不含题目与教学文字），最短章节也保持完整场景而不是两段摘要；
- 每章具有唯一章号、章名、所属Day和scene id；
- 阅读页显示 `第 X 章 / 54`；
- 小说目录只显示已经读到的章节，未来章名不提前暴露；
- Day19只保留一章“考场外过渡”，正式核心审核和150分整卷内部仍完全退出剧情提示；
- 小说正文负责人物、生活感、悬念、证据推进；人物立绘、场景图、证物图只作视觉增强；
- 图片失效时仍能完整阅读正文并继续课程。

小说与课程的绑定规则仍然是：

`案件提出真实问题 → 学当天必须的化学能力 → 立刻回到证据应用 → 得到一个小胜利/修正旧判断 → 出现下一层悬念 → 637迁移题验证脱离剧情后仍会做`

自动门禁：`scripts/tests/test-v16-novel-chapters.js`、`test-v16-novel-longform.js`、`test-v16-novel-primary.js`、`test-v16-unified-voice.js`。

## 4. 题库总审计范围

`node scripts/audit-v16-question-quality.js`

正式运行时审计：

- main questions: **268**
- repair questions: **48**
- adaptive questions: **42**
- total: **358**

审计项目包括：

- 全局 question id 唯一；
- prompt 非空；
- primarySkill 存在；
- option id / label 唯一；
- answer 真正存在于 options；
- multi-choice answer 非空且无重复；
- ranking correctOrder 完整；
- electron-arrow source/target 均存在；
- detective answer 与 candidate 一致；
- route graph start/target/edge/acceptedPath 引用有效；
- Director mandatory question ref 存在；
- 同一 Day mandatory sequence 不重复同一道题；
- “直接从结构观察”的题目禁止混入人物责任/门禁/记录等跨层证据。

结果：`V16_QUESTION_QUALITY_PASS`。

## 5. 知识闭环

正式版同时通过：

- `V16_PREREQUISITE_PASS`
- `audit-term-leaks.mjs` → `[]`
- `CLOSURE V5 PASS`
- `CLOSURE V10 BASE PASS`
- `CLOSURE V11 PASS`

V5 当前检查 358 条 main/repair/adaptive question records，无计划内术语前置泄漏。

## 6. 正式版与测试版差异

正式版配置：`data/v16-release-config.js`

- `mode: formal`
- `allDaysUnlocked: false`
- `showTestBadge: false`

因此 Day1–Day20 恢复正常顺序解锁。

但正式版**保留测试版已经验证过的沉浸式 LAB-20 欢迎页和案件入口**，不会因为关闭测试开关又退回旧的“20天大作战”首页。

## 7. 自动化总门禁

统一命令：

```bash
node scripts/run-v16-validation.js
```

必须看到：

`V16_FORMAL_AUTOMATED_ALL_PASS`

仍建议部署 GitHub Pages 后做真实浏览器 smoke：Day1/5/7/15/19、退出续学、故事梳理弹层、3D/fallback和150分整卷入口。
