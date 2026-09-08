# BUILD STATUS · organic637 Phase 4

- Phase 1 学习闭环：PASS（继承 clean-v1 / phase3.1）
- Phase 2 能力模型：PASS
- Phase 3 核心互动：PASS
- Phase 3.1 连续做题指针修复：PASS
- Phase 4 结构侦探：PASS（本轮新增）
- Phase 5 合成迷宫：NOT STARTED
- Day 01–04 主线：ACTIVE
- Day 13–14 结构侦探引擎：以独立“侦探”入口预先开放验收；尚未并入顺序解锁主线
- Day 05–12 / 15–20：NOT YET BUILT
- 3D：NOT INCLUDED BY DESIGN
- Cloudflare Worker / D1：本轮无需修改

## Phase 4 已实现

1. DBE 独立作答
2. IR 静态 SVG 谱图 + 解释判断
3. ¹H NMR 静态 SVG 谱图 + 积分/裂分/位移判断
4. 候选结构“保留 / 排除 / 不确定”三态判断
5. 证据矩阵揭晓
6. 最终候选结构
7. 分项得分：DBE / IR / NMR / 候选排除 / 最终结构
8. 最终结构选错不会把前面正确证据清零
9. 分项结果写入 Phase 2 skill mastery
10. 结构侦探进度进入本地状态并随 core 云同步

## Validation

- `node --check app.js` PASS
- `node --check js/detective.js` PASS
- `node --check data/detective-cases.js` PASS
- `node scripts/validate-phase4.mjs` PASS
