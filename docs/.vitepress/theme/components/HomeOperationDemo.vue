<script setup lang="ts">
import { computed, nextTick, onScopeDispose, reactive, ref, watch } from 'vue'
import { createCountUp } from '@yunyoujun/ak-ui/effects'
import type { CountUpController } from '@yunyoujun/ak-ui/effects'

// An original operation flow in the ak-ui language: stage briefing, squad
// confirmation, deployment and settlement. Names, codes and values are invented.
const props = defineProps<{ en?: boolean }>()
const t = (zh: string, english: string) => props.en ? english : zh

type Phase = 'stage' | 'squad' | 'deploy' | 'result'

interface Drop { name: string, english: string, tier: 'common' | 'rare' | 'elite' }
interface Stage {
  code: string
  name: string
  english: string
  cost: number
  level: string
  englishLevel: string
  hazard: number
  x: number
  y: number
  drops: Drop[]
}

const stages: Stage[] = [
  { code: 'RI-02', name: '外环哨站', english: 'Outer Post', cost: 12, level: '精英 0 · LV.40', englishLevel: 'Elite 0 · LV.40', hazard: 2, x: 19, y: 64, drops: [
    { name: '合金块', english: 'Alloy', tier: 'common' },
    { name: '线缆', english: 'Cable', tier: 'common' },
  ] },
  { code: 'RI-03', name: '冷却塔', english: 'Cooling Tower', cost: 15, level: '精英 1 · LV.10', englishLevel: 'Elite 1 · LV.10', hazard: 3, x: 46, y: 34, drops: [
    { name: '合金块', english: 'Alloy', tier: 'common' },
    { name: '电路板', english: 'Circuit', tier: 'rare' },
  ] },
  { code: 'RI-04', name: '废弃工厂', english: 'Abandoned Plant', cost: 18, level: '精英 1 · LV.30', englishLevel: 'Elite 1 · LV.30', hazard: 4, x: 74, y: 62, drops: [
    { name: '电路板', english: 'Circuit', tier: 'rare' },
    { name: '聚合凝胶', english: 'Polygel', tier: 'rare' },
    { name: '核心芯片', english: 'Core chip', tier: 'elite' },
  ] },
]

const squad = [
  { role: '先锋', english: 'Vanguard', code: 'VAN', callsign: 'Aster', level: 50, elite: 1, signal: '#22bbff' },
  { role: '近卫', english: 'Guard', code: 'GRD', callsign: 'Brass', level: 60, elite: 2, signal: '#f6540e' },
  { role: '重装', english: 'Defender', code: 'DEF', callsign: 'Cinder', level: 45, elite: 1, signal: '#ffd802' },
  { role: '狙击', english: 'Sniper', code: 'SNP', callsign: 'Dune', level: 55, elite: 2, signal: '#46c47c' },
  { role: '术师', english: 'Caster', code: 'CST', callsign: 'Ember', level: 40, elite: 1, signal: '#b18cff' },
  { role: '医疗', english: 'Medic', code: 'MED', callsign: 'Flint', level: 50, elite: 1, signal: '#f3f4ef' },
]

const maxSanity = 135
const phase = ref<Phase>('stage')
const selectedCode = ref('RI-04')
const stage = computed(() => stages.find(item => item.code === selectedCode.value)!)
const sanity = ref(118)
const cleared = reactive<Record<string, boolean>>({ 'RI-02': true, 'RI-03': true })
const agent = ref(false)
const firstClear = ref(false)
const progress = ref(0)
const announcement = ref('')
const root = ref<HTMLElement>()
// The first briefing waits for the hero terminal to land; later visits and the
// shutter between views play immediately.
const booting = ref(true)
const shutter = ref(0)
const affordable = computed(() => sanity.value >= stage.value.cost)

const rewards = computed(() => [
  { name: t('作战经验', 'Combat EXP'), value: stage.value.cost * 20 },
  { name: t('信用点', 'Credits'), value: stage.value.cost * 72 },
  ...stage.value.drops.map((drop, index) => ({ name: t(drop.name, drop.english), value: index === 0 ? 2 : 1 })),
  ...(firstClear.value ? [{ name: t('首次通关 · 晶体', 'First clear · Crystal'), value: 1 }] : []),
])
const shownRewards = ref<number[]>([])

watch(selectedCode, () => {
  if (!cleared[selectedCode.value])
    agent.value = false
})

let deployFrame = 0
let deployTimer: ReturnType<typeof setTimeout> | undefined
let counters: CountUpController[] = []

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function clearCounters() {
  counters.forEach(counter => counter.destroy())
  counters = []
}

function go(next: Phase, message: string) {
  booting.value = false
  shutter.value++
  phase.value = next
  announcement.value = message
}

// Move focus to the new view once it is in the DOM, so keyboard and screen
// reader users follow the flow instead of staying on a removed button.
function focusPhase() {
  void nextTick(() => root.value?.querySelector<HTMLElement>('[data-phase-focus]')?.focus({ preventScroll: true }))
}

function openSquad() {
  if (!affordable.value)
    return
  go('squad', t(`${stage.value.code} 编队确认`, `${stage.value.code} squad confirmation`))
}

function deploy() {
  if (!affordable.value)
    return
  sanity.value -= stage.value.cost
  firstClear.value = !cleared[stage.value.code]
  progress.value = 0
  go('deploy', t(`作战开始，消耗 ${stage.value.cost} 理智`, `Operation started, ${stage.value.cost} sanity spent`))

  const duration = reducedMotion() ? 300 : agent.value ? 1200 : 1800
  const started = performance.now()
  const tick = (now: number) => {
    progress.value = Math.min(1, (now - started) / duration)
    if (progress.value < 1)
      deployFrame = requestAnimationFrame(tick)
    else
      deployTimer = setTimeout(settle, reducedMotion() ? 0 : 260)
  }
  deployFrame = requestAnimationFrame(tick)
}

function settle() {
  cleared[stage.value.code] = true
  shownRewards.value = rewards.value.map(() => 0)
  go('result', t(`行动结束，三星通关 ${stage.value.code}`, `Mission complete, ${stage.value.code} cleared with three stars`))
}

function countRewards() {
  clearCounters()
  rewards.value.forEach((reward, index) => {
    const counter = createCountUp((value) => { shownRewards.value[index] = Math.round(value) }, {
      value: reward.value,
      duration: 700,
      delay: 520 + index * 90,
    })
    counters.push(counter)
    counter.play()
  })
}

function afterEnter() {
  focusPhase()
  if (phase.value === 'result')
    countRewards()
}

function backToStage() {
  clearCounters()
  go('stage', t('返回关卡详情', 'Back to the stage briefing'))
}

function restore() {
  sanity.value = maxSanity
  announcement.value = t('理智已恢复至上限', 'Sanity restored to maximum')
}

function stars(count: number) {
  return Array.from({ length: count }, (_, index) => index)
}

onScopeDispose(() => {
  cancelAnimationFrame(deployFrame)
  clearTimeout(deployTimer)
  clearCounters()
})
</script>

<template>
  <div class="op-shell">
    <div ref="root" class="op" :class="{ 'is-booting': booting }" :data-phase="phase">
      <span v-if="shutter" :key="shutter" class="op__shutter" aria-hidden="true"></span>
      <header class="op__bar">
        <button v-if="phase === 'squad'" type="button" class="op__back" @click="backToStage">
          <span aria-hidden="true">‹</span> {{ t('返回', 'Back') }}
        </button>
        <p v-else class="op__crumb">
          <span aria-hidden="true">‹</span> {{ t('作战', 'Operation') }}
          <i aria-hidden="true">/</i> <b>{{ t('第四章 · 废弃工业区', 'CH.04 · Industrial Ruins') }}</b>
        </p>
        <div class="op__sanity" :class="{ 'is-low': !affordable }">
          <span class="op__sanity-label">{{ t('理智', 'Sanity') }}</span>
          <strong>{{ sanity }}</strong><span>/{{ maxSanity }}</span>
          <button
            v-if="sanity < maxSanity && phase === 'stage'"
            type="button"
            class="op__restore"
            :aria-label="t('恢复理智', 'Restore sanity')"
            @click="restore"
          >
            +
          </button>
        </div>
      </header>

      <p class="op__live" aria-live="polite">{{ announcement }}</p>

      <Transition name="op-swap" mode="out-in" @after-enter="afterEnter">
        <section v-if="phase === 'stage'" key="stage" class="op-stage" :aria-label="t('关卡详情', 'Stage briefing')">
          <div class="op-map">
            <span class="op-map__chapter" aria-hidden="true">04</span>
            <svg class="op-map__route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline :points="stages.map(item => `${item.x},${item.y}`).join(' ')" />
            </svg>
            <div class="op-map__nodes" role="group" :aria-label="t('选择关卡', 'Choose a stage')">
              <button
                v-for="(item, index) in stages"
                :key="item.code"
                type="button"
                class="op-node"
                :class="{ 'is-cleared': cleared[item.code] }"
                :style="{ 'left': `${item.x}%`, 'top': `${item.y}%`, '--node-index': index }"
                :aria-pressed="item.code === selectedCode"
                @click="selectedCode = item.code"
              >
                <span class="op-node__label" aria-hidden="true">OPERATION</span>
                <span class="op-node__code">{{ item.code }}</span>
                <span v-if="cleared[item.code]" class="op-node__stars">
                  <span class="sr-only">{{ t('已三星通关', 'cleared with three stars') }}</span>
                  <i v-for="star in stars(3)" :key="star" aria-hidden="true"></i>
                </span>
              </button>
            </div>
          </div>

          <div class="op-brief">
            <p class="op-brief__eyebrow">OPERATION · {{ stage.code.slice(-2) }}</p>
            <h3 class="op-brief__title" tabindex="-1" data-phase-focus>
              <span class="op-brief__code">{{ stage.code }}</span>
              <span class="op-brief__name">{{ t(stage.name, stage.english) }}</span>
            </h3>
            <dl class="op-brief__meta">
              <div><dt>{{ t('推荐等级', 'Recommended') }}</dt><dd>{{ t(stage.level, stage.englishLevel) }}</dd></div>
              <div>
                <dt>{{ t('危险等级', 'Hazard') }}</dt>
                <dd class="op-brief__hazard" :aria-label="`${stage.hazard}/5`">
                  <i v-for="level in 5" :key="level" :class="{ on: level <= stage.hazard }" aria-hidden="true"></i>
                </dd>
              </div>
            </dl>
            <div class="op-brief__drops">
              <span>{{ t('常规掉落', 'Drops') }}</span>
              <ul>
                <li v-for="drop in stage.drops" :key="drop.name" :class="`is-${drop.tier}`" :title="t(drop.name, drop.english)">
                  <i aria-hidden="true"></i><span class="sr-only">{{ t(drop.name, drop.english) }}</span>
                </li>
              </ul>
            </div>
            <label class="op-agent" :class="{ 'is-locked': !cleared[stage.code] }">
              <input v-model="agent" type="checkbox" :disabled="!cleared[stage.code]">
              <span class="op-agent__box" aria-hidden="true"></span>
              <span>{{ t('代理指挥', 'Auto deploy') }}</span>
              <small v-if="!cleared[stage.code]">{{ t('三星通关后解锁', 'Clear with 3★ to unlock') }}</small>
            </label>
            <button type="button" class="op-start" :disabled="!affordable" @click="openSquad">
              <span class="op-start__label">
                <strong>{{ affordable ? t('开始行动', 'Start') : t('理智不足', 'Low sanity') }}</strong>
                <small>OPERATION START</small>
              </span>
              <span class="op-start__cost">-{{ stage.cost }}</span>
            </button>
          </div>
        </section>

        <section v-else-if="phase === 'squad'" key="squad" class="op-squad" :aria-label="t('编队确认', 'Squad confirmation')">
          <div class="op-squad__roster">
            <h3 class="op-squad__title" tabindex="-1" data-phase-focus>
              {{ t('第一小队', 'Squad 01') }} <small>{{ stage.code }} · 6/12</small>
            </h3>
            <ol class="op-squad__slots">
              <li v-for="(member, index) in squad" :key="member.code" :style="{ '--slot-signal': member.signal, '--slot-index': index }">
                <span class="op-slot__code" aria-hidden="true">{{ member.code }}</span>
                <span class="op-slot__elite" :aria-label="t(`精英 ${member.elite}`, `Elite ${member.elite}`)">
                  <i v-for="pip in member.elite" :key="pip" aria-hidden="true"></i>
                </span>
                <strong>{{ member.callsign }}</strong>
                <span class="op-slot__meta">{{ t(member.role, member.english) }} · LV.{{ member.level }}</span>
              </li>
            </ol>
          </div>
          <div class="op-squad__launch">
            <button type="button" class="op-launch" :aria-label="t('开始行动', 'Start operation')" @click="deploy">
              <span><strong>{{ t('开始', 'START') }}</strong><strong>{{ t('行动', 'OP') }}</strong></span>
            </button>
            <p class="op-squad__cost">
              {{ t('理智', 'Sanity') }} <b>{{ sanity }}</b> <span aria-hidden="true">→</span><span class="sr-only">{{ t('变为', 'becomes') }}</span> <b>{{ sanity - stage.cost }}</b>
            </p>
          </div>
        </section>

        <section v-else-if="phase === 'deploy'" key="deploy" class="op-deploy" :aria-label="t('作战开始', 'Operation start')">
          <div class="op-deploy__hazard" aria-hidden="true"></div>
          <h3 class="op-deploy__title" tabindex="-1" data-phase-focus>
            <span>{{ t('作战开始', 'Operation start') }}</span>
            <small>{{ agent ? 'AUTO DEPLOY' : 'OPERATION START' }} · {{ stage.code }}</small>
          </h3>
          <div class="op-deploy__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(progress * 100)" :aria-label="t('部署进度', 'Deployment progress')">
            <span class="op-deploy__fill" :style="{ width: `${progress * 100}%` }"></span>
            <span class="op-deploy__runner" :style="{ left: `${progress * 100}%` }" aria-hidden="true"></span>
          </div>
          <p class="op-deploy__tip">
            <span>{{ t('提示', 'TIP') }}</span>
            {{ agent ? t('代理指挥将复现上次三星通关的部署。', 'Auto deploy replays your last three-star run.') : t('重装干员可以阻挡多个敌人，优先部署在路口。', 'Defenders block several enemies; deploy them at junctions first.') }}
          </p>
        </section>

        <section v-else key="result" class="op-result" :aria-label="t('行动结束', 'Mission complete')">
          <div class="op-result__banner">
            <h3 class="op-result__title" tabindex="-1" data-phase-focus>
              {{ t('行动结束', 'Mission complete') }}
              <small>MISSION ACCOMPLISHED · {{ stage.code }}</small>
            </h3>
            <p class="op-result__stars" :aria-label="t('三星', 'Three stars')">
              <i v-for="star in stars(3)" :key="star" :style="{ '--star-index': star }" aria-hidden="true"></i>
            </p>
            <p v-if="agent" class="op-result__note">{{ t('代理指挥 · 全员信赖提升', 'Auto deploy · trust increased') }}</p>
          </div>
          <div class="op-result__rewards">
            <p class="op-result__heading">{{ t('获得物资', 'Rewards') }}</p>
            <ul>
              <li v-for="(reward, index) in rewards" :key="reward.name" :style="{ '--row-index': index }">
                <span>{{ reward.name }}</span>
                <b aria-hidden="true">+{{ shownRewards[index] ?? 0 }}</b>
                <span class="sr-only">+{{ reward.value }}</span>
              </li>
            </ul>
            <div class="op-result__actions">
              <button type="button" class="op-result__back" @click="backToStage">{{ t('返回', 'Back') }}</button>
              <button type="button" class="op-result__again" :disabled="!affordable" @click="deploy">
                {{ affordable ? t('再次行动', 'Again') : t('理智不足', 'Low sanity') }} <span>-{{ stage.cost }}</span>
              </button>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.op {
  --op-ink: #0d0f11;
  --op-panel: rgba(18, 21, 24, 0.94);
  --op-paper: #f3f4ef;
  --op-muted: #8d959b;
  --op-line: rgba(243, 244, 239, 0.16);
  --op-blue: #22bbff;
  --op-yellow: #ffd802;
  --op-orange: #f6540e;
  --op-ease: cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  display: flex;
  min-height: 336px;
  overflow: hidden;
  color: var(--op-paper);
  background:
    linear-gradient(112deg, rgba(5, 9, 11, 0.82) 0 30%, transparent 30% 66%, rgba(5, 9, 11, 0.72) 66%),
    repeating-linear-gradient(0deg, rgba(34, 187, 255, 0.07) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, rgba(255, 216, 2, 0.05) 0 1px, transparent 1px 24px),
    linear-gradient(135deg, #34424a, #0f1417);
  flex-direction: column;
  font-family: var(--ak-font-sans);
  line-height: 1.4;
}

.op-shell { container-type: inline-size; }

.op { --boot: 0ms; }
.op.is-booting { --boot: 640ms; }
.op button { font: inherit; }
.op h3 { line-height: 1.15; }
.op li { margin: 0; }
.op h3 small { line-height: 1.4; }

/* A fixed stage keeps the hero from jumping between phases; stacked narrow
   layouts grow with their content instead. */
@container (min-width: 521px) {
  .op { height: 348px; }
}
.op button:focus-visible,
.op [data-phase-focus]:focus-visible,
.op-agent input:focus-visible + .op-agent__box {
  outline: 2px solid var(--op-yellow);
  outline-offset: 2px;
}
.op [data-phase-focus]:focus { outline: none; }
.op [data-phase-focus]:focus-visible { outline: 2px solid var(--op-yellow); }
.sr-only,
.op__live {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Top bar */
.op__bar {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 40px;
  padding: 0 12px;
  border-bottom: 1px solid var(--op-line);
  background: rgba(10, 12, 14, 0.72);
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.op__crumb,
.op__back {
  margin: 0;
  color: var(--op-muted);
  font-size: 12px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.op__crumb i { margin: 0 6px; color: var(--op-blue); font-style: normal; }
.op__crumb b { color: var(--op-paper); font-weight: 700; }
.op__back {
  display: inline-flex;
  min-height: 32px;
  padding: 0 12px 0 8px;
  border: 1px solid var(--op-line);
  color: var(--op-paper);
  background: transparent;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.op__back:hover { color: var(--op-ink); background: var(--op-paper); }
.op__sanity {
  display: flex;
  min-height: 28px;
  padding: 0 4px 0 10px;
  border-left: 3px solid var(--op-blue);
  background: rgba(243, 244, 239, 0.06);
  align-items: center;
  gap: 2px;
  font-family: var(--ak-font-mono);
  font-size: 11px;
  white-space: nowrap;
  transition: border-color 200ms ease;
}
.op__sanity-label { margin-right: 6px; color: var(--op-muted); font-family: var(--ak-font-sans); }
.op__sanity strong { color: var(--op-paper); font-size: 16px; }
.op__sanity > span:not(.op__sanity-label) { color: var(--op-muted); }
.op__sanity.is-low { border-color: var(--op-orange); }
.op__sanity.is-low strong { color: var(--op-orange); }
.op .op__restore {
  display: grid;
  width: 24px;
  height: 24px;
  margin-left: 6px;
  padding: 0;
  border: 0;
  color: var(--op-ink);
  background: var(--op-blue);
  place-items: center;
  font-size: 16px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
}

/* Stage briefing */
.op-stage {
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: minmax(0, 1.05fr) minmax(220px, 0.95fr);
}
.op-map { position: relative; min-height: 200px; overflow: hidden; }
.op-map__chapter {
  position: absolute;
  bottom: 0;
  left: 10px;
  color: rgba(243, 244, 239, 0.06);
  font: 700 112px/1 Syncopate, var(--ak-font-sans);
  letter-spacing: -0.08em;
  pointer-events: none;
  animation: op-chapter-in 720ms var(--op-ease) var(--boot) both;
}
.op-map__route {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: op-wipe 640ms var(--op-ease) calc(var(--boot) + 120ms) both;
}
.op-map__route polyline {
  fill: none;
  stroke: rgba(243, 244, 239, 0.35);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
}
.op-map__nodes { position: absolute; inset: 0; }
.op-node {
  position: absolute;
  display: grid;
  width: 88px;
  padding: 0;
  border: 0;
  color: var(--op-ink);
  background: transparent;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.55);
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: transform 160ms var(--op-ease), box-shadow 160ms ease;
  animation: op-node-in 420ms cubic-bezier(0.3, 1.5, 0.5, 1) both;
  animation-delay: calc(var(--boot) + 200ms + var(--node-index) * 110ms);
}
.op-node__label {
  display: block;
  padding: 2px 0;
  color: var(--op-paper);
  background: var(--op-ink);
  font: 700 7px/1 var(--ak-font-mono);
  letter-spacing: 0.24em;
}
.op-node__code {
  display: block;
  padding: 5px 0 6px;
  background: var(--op-paper);
  font: 900 15px/1 var(--ak-font-sans);
  letter-spacing: 0.02em;
}
.op-node__stars {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  display: flex;
  gap: 3px;
  transform: translateX(-50%);
}
.op-node__stars i,
.op-result__stars i {
  display: block;
  width: 9px;
  height: 9px;
  background: var(--op-yellow);
  clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
.op-node:hover { transform: translate(-50%, calc(-50% - 2px)); }
.op-node[aria-pressed="true"] {
  box-shadow: 0 0 0 2px var(--op-yellow), 0 0 22px rgba(255, 216, 2, 0.35);
}
.op-node[aria-pressed="true"] .op-node__label { color: var(--op-ink); background: var(--op-yellow); }
.op-node[aria-pressed="true"]::after {
  position: absolute;
  inset: -9px;
  content: '';
  border: 1px solid rgba(255, 216, 2, 0.7);
  pointer-events: none;
  animation: op-lock 520ms var(--op-ease) both;
}
.op.is-booting .op-node[aria-pressed="true"]::after { animation-delay: calc(var(--boot) + 560ms); }

/* Phase shutter: a skewed graphite blade with a signal edge crosses the view
   while the old screen leaves, like a terminal changing pages. */
.op__shutter {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  width: 46%;
  border-right: 3px solid var(--op-yellow);
  background: linear-gradient(90deg, rgba(13, 15, 17, 0), rgba(13, 15, 17, 0.96) 30%);
  pointer-events: none;
  transform: skewX(-18deg);
  animation: op-shutter 520ms cubic-bezier(0.7, 0, 0.3, 1) both;
}

.op-brief {
  display: flex;
  padding: 14px 16px 16px;
  border-left: 1px solid var(--op-line);
  background: var(--op-panel);
  flex-direction: column;
  gap: 8px;
  animation: op-slide-in 420ms var(--op-ease) var(--boot) both;
}
.op-brief__eyebrow { margin: 0; color: var(--op-blue); font: 700 9px/1 var(--ak-font-mono); letter-spacing: 0.18em; }
.op-brief__title { display: grid; margin: 0; gap: 4px; }
.op-brief__code { font: 700 28px/1 Syncopate, var(--ak-font-sans); letter-spacing: -0.06em; }
.op-brief__name { font-size: 15px; font-weight: 900; letter-spacing: 0.04em; }
.op-brief__meta { display: grid; margin: 0; gap: 4px; }
.op-brief__meta div { display: flex; justify-content: space-between; gap: 8px; font-size: 11px; }
.op-brief__meta dt { color: var(--op-muted); }
.op-brief__meta dd { margin: 0; font-weight: 700; }
.op-brief__hazard { display: flex; gap: 3px; align-items: center; }
.op-brief__hazard i { width: 10px; height: 6px; background: rgba(243, 244, 239, 0.18); transform: skewX(-20deg); }
.op-brief__hazard i.on { background: var(--op-orange); }
.op-brief__drops { display: flex; align-items: center; justify-content: space-between; color: var(--op-muted); font-size: 11px; }
.op-brief__drops ul { display: flex; margin: 0; padding: 0; gap: 6px; list-style: none; }
.op-brief__drops li {
  --tier: #9c9c9c;
  display: grid;
  width: 30px;
  height: 30px;
  border-bottom: 3px solid var(--tier);
  background: rgba(243, 244, 239, 0.08);
  place-items: center;
}
.op-brief__drops li i { width: 12px; height: 12px; background: var(--tier); transform: rotate(45deg); }
.op-brief__drops li.is-rare { --tier: #22bbff; }
.op-brief__drops li.is-elite { --tier: #ffd802; }

.op-agent {
  position: relative;
  display: flex;
  margin-top: auto;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.op-agent input { position: absolute; opacity: 0; pointer-events: none; }
.op-agent__box {
  display: grid;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(243, 244, 239, 0.6);
  place-items: center;
}
.op-agent input:checked + .op-agent__box { border-color: var(--op-blue); background: var(--op-blue); }
.op-agent input:checked + .op-agent__box::after { width: 8px; height: 8px; content: ''; background: var(--op-ink); }
.op-agent small { margin-left: auto; color: var(--op-muted); font-size: 10px; font-weight: 400; }
.op-agent.is-locked { color: var(--op-muted); cursor: not-allowed; }

.op-start {
  display: flex;
  min-height: 48px;
  padding: 0;
  border: 0;
  color: #fff;
  background-color: #0098dc;
  background-image: linear-gradient(105deg, transparent 42%, rgba(255, 255, 255, 0.28) 50%, transparent 58%);
  background-position: 150% 0;
  background-repeat: no-repeat;
  background-size: 250% 100%;
  align-items: stretch;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  transition: filter 160ms ease, transform 120ms ease, background-position 0s linear 200ms;
}
.op-start:hover:not(:disabled) {
  filter: brightness(1.08);
  background-position: -50% 0;
  transition: filter 160ms ease, transform 120ms ease, background-position 420ms var(--op-ease);
}
.op-start:active:not(:disabled) { transform: scale(0.98); }
.op-start__label { display: grid; padding: 0 14px; flex: 1; align-content: center; justify-items: start; }
.op-start__label strong { font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }
.op-start__label small { font: 700 8px/1.4 var(--ak-font-mono); letter-spacing: 0.2em; opacity: 0.75; }
.op-start__cost {
  display: grid;
  min-width: 56px;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.55);
  place-items: center;
  font: 700 18px/1 var(--ak-font-mono);
}
.op-start:disabled { background-color: #4b5257; background-image: none; cursor: not-allowed; }
.op-start:disabled .op-start__cost { color: var(--op-orange); }

/* Squad confirmation */
.op-squad {
  display: grid;
  flex: 1;
  padding: 14px 16px 16px;
  grid-template-columns: minmax(0, 1fr) 150px;
  gap: 16px;
}
.op-squad__title { display: flex; margin: 0 0 10px; align-items: baseline; gap: 10px; font-size: 16px; font-weight: 900; }
.op-squad__title small { color: var(--op-muted); font: 700 10px/1 var(--ak-font-mono); letter-spacing: 0.12em; }
.op-squad__slots { display: grid; margin: 0; padding: 0; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; list-style: none; }
.op-squad__slots li {
  position: relative;
  display: grid;
  min-height: 92px;
  padding: 8px 9px 10px;
  overflow: hidden;
  border: 1px solid var(--op-line);
  border-bottom: 3px solid var(--slot-signal);
  background: linear-gradient(160deg, rgba(243, 244, 239, 0.1), rgba(243, 244, 239, 0.02) 60%), rgba(10, 12, 14, 0.7);
  align-content: end;
  animation: op-slot-in 460ms var(--op-ease) both;
  animation-delay: calc(var(--slot-index) * 60ms);
}
.op-slot__code {
  position: absolute;
  top: 2px;
  right: 6px;
  color: rgba(243, 244, 239, 0.12);
  font: 700 26px/1 Syncopate, var(--ak-font-sans);
  letter-spacing: -0.08em;
}
.op-slot__elite { position: absolute; top: 9px; left: 9px; display: flex; gap: 3px; }
.op-slot__elite i { width: 6px; height: 6px; background: var(--slot-signal); transform: rotate(45deg); }
.op-squad__slots strong { font-size: 14px; font-weight: 900; }
.op-slot__meta { color: var(--op-muted); font-size: 10px; }
.op-squad__launch { display: grid; align-content: center; justify-items: center; gap: 18px; }
.op-launch {
  position: relative;
  width: 92px;
  height: 92px;
  margin: 12px;
  padding: 0;
  border: 0;
  color: #fff;
  background: var(--op-orange);
  box-shadow: 0 0 0 6px rgba(246, 84, 14, 0.18), 0 12px 28px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transform: rotate(45deg);
  transition: transform 160ms var(--op-ease), filter 160ms ease, box-shadow 200ms ease;
  animation: op-launch-in 520ms var(--op-ease) 200ms both;
}
.op-launch::after {
  position: absolute;
  inset: -6px;
  content: '';
  border: 2px solid var(--op-orange);
  opacity: 0;
  pointer-events: none;
}
.op-launch:hover { filter: brightness(1.1); box-shadow: 0 0 0 8px rgba(246, 84, 14, 0.28), 0 12px 28px rgba(0, 0, 0, 0.5); }
.op-launch:hover::after { animation: op-pulse 900ms ease-out infinite; }
.op-launch:active { transform: rotate(45deg) scale(0.95); }
.op-launch > span { display: grid; transform: rotate(-45deg); }
.op-launch strong { font-size: 20px; font-weight: 900; line-height: 1.1; letter-spacing: 0.12em; }
.op-squad__cost { margin: 0; color: var(--op-muted); font-size: 11px; }
.op-squad__cost b { color: var(--op-paper); font-family: var(--ak-font-mono); font-size: 14px; }
.op-squad__cost b:last-child { color: var(--op-orange); }

/* Deployment */
.op-deploy {
  position: absolute;
  z-index: 3;
  inset: 0;
  display: grid;
  padding: 28px;
  background: var(--op-ink);
  align-content: center;
  gap: 22px;
}
.op-deploy__hazard {
  position: absolute;
  top: 18px;
  right: -10%;
  left: -10%;
  height: 14px;
  background: repeating-linear-gradient(-45deg, var(--op-yellow) 0 8px, var(--op-ink) 8px 16px);
  transform: rotate(-4deg);
  animation: op-hazard 700ms var(--op-ease) both;
}
.op-deploy__title { display: grid; margin: 0; gap: 8px; }
.op-deploy__title span {
  font-size: clamp(30px, 8cqw, 46px);
  font-style: italic;
  font-weight: 900;
  letter-spacing: 0.06em;
  animation: op-title-in 520ms var(--op-ease) 120ms both;
}
.op-deploy__title small { color: var(--op-blue); font: 700 10px/1.4 var(--ak-font-mono); letter-spacing: 0.24em; }
.op-deploy__track { position: relative; height: 2px; background: rgba(243, 244, 239, 0.18); }
.op-deploy__fill { position: absolute; inset: 0 auto 0 0; background: var(--op-paper); }
.op-deploy__runner {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  background: var(--op-paper);
  transform: translate(-50%, -50%) rotate(45deg);
}
.op-deploy__tip { max-width: 34em; margin: 0; color: var(--op-muted); font-size: 12px; line-height: 1.6; }
.op-deploy__tip span { margin-right: 8px; padding: 1px 6px; color: var(--op-ink); background: var(--op-blue); font: 700 9px/1.6 var(--ak-font-mono); letter-spacing: 0.12em; }

/* Settlement */
.op-result {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 0.9fr);
}
.op-result__banner { display: grid; padding: 20px 16px; align-content: center; gap: 14px; }
.op-result__title {
  display: grid;
  width: fit-content;
  margin: 0;
  padding: 10px 26px 10px 16px;
  color: var(--op-ink);
  background: var(--op-paper);
  font-size: clamp(24px, 6cqw, 34px);
  font-weight: 900;
  letter-spacing: 0.08em;
  clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
  animation: op-banner-in 560ms var(--op-ease) both;
}
.op-result__title small { margin-top: 4px; color: #596167; font: 700 8px/1.4 var(--ak-font-mono); letter-spacing: 0.22em; }
.op-result__stars { display: flex; margin: 0; gap: 10px; }
.op-result__stars i {
  width: 30px;
  height: 30px;
  filter: drop-shadow(0 0 10px rgba(255, 216, 2, 0.45));
  animation: op-star 420ms cubic-bezier(0.3, 1.6, 0.5, 1) both;
  animation-delay: calc(300ms + var(--star-index) * 140ms);
}
.op-result__note { margin: 0; color: var(--op-blue); font-size: 11px; font-weight: 700; }
.op-result__rewards {
  display: flex;
  padding: 14px 16px 16px;
  border-left: 1px solid var(--op-line);
  background: var(--op-panel);
  flex-direction: column;
  gap: 10px;
  animation: op-slide-in 420ms var(--op-ease) 160ms both;
}
.op-result__heading { margin: 0; color: var(--op-muted); font: 700 10px/1 var(--ak-font-mono); letter-spacing: 0.16em; }
.op-result__rewards ul { display: grid; margin: 0; padding: 0; gap: 2px; list-style: none; }
.op-result__rewards li {
  display: flex;
  padding: 3px 0;
  border-bottom: 1px solid var(--op-line);
  justify-content: space-between;
  font-size: 12px;
  animation: op-row-in 380ms var(--op-ease) both;
  animation-delay: calc(420ms + var(--row-index) * 70ms);
}
.op-result__rewards li b { font-family: var(--ak-font-mono); }
.op-result__actions { display: grid; margin-top: auto; grid-template-columns: auto 1fr; gap: 8px; }
.op-result__actions button {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--op-line);
  color: var(--op-paper);
  background: transparent;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease, filter 120ms ease;
}
.op-result__back:hover { color: var(--op-ink); background: var(--op-paper); }
.op-result__actions .op-result__again { border-color: transparent; background: #0098dc; }
.op-result__again span { margin-left: 6px; font-family: var(--ak-font-mono); opacity: 0.8; }
.op-result__again:hover:not(:disabled) { filter: brightness(1.1); }
.op-result__actions .op-result__again:disabled { background: #4b5257; cursor: not-allowed; }

/* View swap */
.op-swap-enter-active { transition: opacity 220ms ease, translate 320ms var(--op-ease); }
.op-swap-leave-active { transition: opacity 140ms ease, translate 140ms ease; }
.op-swap-enter-from { opacity: 0; translate: 24px 0; }
.op-swap-leave-to { opacity: 0; translate: -16px 0; }

@keyframes op-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes op-chapter-in { from { opacity: 0; translate: -40px 0; } to { opacity: 1; translate: 0 0; } }
@keyframes op-node-in { from { opacity: 0; scale: 0.6; } to { opacity: 1; scale: 1; } }
@keyframes op-shutter { from { translate: -140% 0; } to { translate: 260% 0; } }
@keyframes op-slide-in { from { opacity: 0; translate: 32px 0; } to { opacity: 1; translate: 0 0; } }
@keyframes op-lock { from { opacity: 0; transform: scale(1.3); } to { opacity: 1; transform: scale(1); } }
@keyframes op-slot-in { from { opacity: 0; translate: 0 18px; } to { opacity: 1; translate: 0 0; } }
@keyframes op-launch-in { from { opacity: 0; transform: rotate(-45deg) scale(0.4); } to { opacity: 1; transform: rotate(45deg) scale(1); } }
@keyframes op-pulse { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(1.3); } }
@keyframes op-hazard { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes op-title-in { from { opacity: 0; translate: -40px 0; } to { opacity: 1; translate: 0 0; } }
@keyframes op-banner-in { from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); } to { clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%); } }
@keyframes op-star { from { opacity: 0; transform: scale(2.4) rotate(-30deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
@keyframes op-row-in { from { opacity: 0; translate: 16px 0; } to { opacity: 1; translate: 0 0; } }

@container (max-width: 520px) {
  .op { min-height: 492px; }
  .op-stage,
  .op-result { grid-template-columns: 1fr; }
  .op-map { min-height: 168px; }
  .op-brief,
  .op-result__rewards { border-top: 1px solid var(--op-line); border-left: 0; }
  .op-squad { grid-template-columns: 1fr; align-content: start; }
  .op-squad__launch { grid-template-columns: 1fr auto; justify-items: end; }
  .op-squad__cost { order: -1; justify-self: start; }
  .op-launch { width: 76px; height: 76px; }
  .op-launch strong { font-size: 17px; }
  .op-slot__code { font-size: 20px; }
  .op__crumb b,
  .op__crumb i { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .op *,
  .op *::after { animation: none !important; transition: none !important; }
  .op-swap-enter-active,
  .op-swap-leave-active { transition: none; }
  .op__shutter { display: none; }
}
</style>
