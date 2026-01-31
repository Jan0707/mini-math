<script setup lang="ts">
import { computed } from 'vue'
import type { GameSession } from '@/types/game'

const props = defineProps<{
  session: GameSession
}>()

const formattedDate = computed(() => {
  const date = new Date(props.session.completedAt)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

const difficultyLabel = computed(() => {
  return props.session.settings.difficulty === 'through10' ? '0-10' : '0-20'
})

const operationLabel = computed(() => {
  const type = props.session.settings.calculationType
  if (type === 'plus') return '+'
  if (type === 'minus') return '-'
  return '+/-'
})

const scorePercentage = computed(() => {
  return Math.round((props.session.score / props.session.totalQuestions) * 100)
})
</script>

<template>
  <div class="session-card">
    <div class="session-header">
      <span class="session-date">{{ formattedDate }}</span>
      <span class="session-tags">
        <span class="tag">{{ difficultyLabel }}</span>
        <span class="tag">{{ operationLabel }}</span>
      </span>
    </div>
    <div class="session-score">
      <span class="score-value">{{ session.score }}/{{ session.totalQuestions }}</span>
      <span class="score-percent">({{ scorePercentage }}%)</span>
    </div>
  </div>
</template>

<style scoped>
.session-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.session-date {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
}

.session-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-background-mute);
  border-radius: 6px;
  color: var(--color-text);
}

.session-score {
  text-align: right;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.score-percent {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
}
</style>
