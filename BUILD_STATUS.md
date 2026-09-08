# BUILD STATUS · organic637 Phase 5

- Phase 1 学习闭环：PASS
- Phase 2 能力模型：PASS
- Phase 3 核心互动：PASS
- Phase 3.1 连续做题指针修复：PASS
- Phase 4 结构侦探：PASS
- Phase 5 合成迷宫：PASS（本轮新增）
- 新手化学式扶手：PASS（本轮新增）
- Day 01 深度重做：PASS（6 个教学节点 + 15 个主任务，预计约 70 分钟）
- Day 02：12 个主任务 + 4 个教学节点
- Day 03：13 个主任务 + 4 个教学节点
- Day 04：12 个主任务 + 4 个教学节点
- Day 05–12 / 15–20：NOT YET BUILT
- Day 13–14：结构侦探引擎已独立开放，尚未并入顺序主线
- Day 17–18：合成迷宫引擎已独立开放，尚未并入顺序主线
- 3D：NOT INCLUDED BY DESIGN
- Cloudflare Worker / D1：本轮无需修改

## 本轮重点修正

之前 Day 1 只有少量题，实际几分钟即可完成，与“80–100 分钟学习日”目标不匹配。本轮不是只改 estimatedMinutes，而是实质增加教学与训练：

1. 先讲 C=C = σ + π，而不是直接抛题。
2. 讲“加成 = 消耗 π 键并形成新 σ 键”的原子守恒。
3. 普通 HBr 用碳正离子稳定性解释 Markovnikov。
4. Br₂ 与 Br₂/H₂O 分开讲产物类型和条件差异。
5. Day 1 从 5 个主判断扩展为 15 个主任务、6 个教学节点。
6. Day 2–4 各增加一个概念教学节点和 3 个训练任务。
7. 新增化学式/结构式扶手：新技能完整展示，掌握后自动缩短，跨日稳定后默认收起但可手动查看。

## Phase 5 已实现

1. 起点/终点差异判断
2. 碳数审计
3. 正向路线
4. 逆向路线
5. 分叉与回退
6. green / yellow / orange / red 路径语义
7. 非主路线但化学可行时不判错
8. 三层提示：官能团 → 最后一步 → 试剂
9. 路线评分：化学可行 50% / 效率 20% / 选择性 15% / 兼容性 15%
10. 路线结果写入 synthesis.target_difference / carbon_count / last_step / disconnection / compatibility / route_evaluation 能力证据
11. 6 座完整合成迷宫

## Validation

- `node --check app.js` PASS
- `node --check js/synthesis.js` PASS
- `node --check data/day01.js` PASS
- `node --check data/phase5-augment.js` PASS
- `node --check data/learning-scaffolds.js` PASS
- `node --check data/synthesis-cases.js` PASS
- `node scripts/validate-phase3.mjs` PASS
- `node scripts/validate-phase4.mjs` PASS
- `node scripts/validate-phase5.mjs` PASS

Phase 5 validator result：

- Day1 = 15 questions / 6 lessons
- Day2 = 12 questions
- Day3 = 13 questions
- Day4 = 12 questions
- synthesis mazes = 6
- Day2–4 formula/scaffold coverage = 33/37

注意：当前项目仍不能宣称“完整20天已实现”或“能保证120分”。120/150 是课程设计目标线，不是个人成绩保证。要对这个目标有可信度，后续必须继续完成 Day 5–20 的内容量、Boss 卷和真题映射。
