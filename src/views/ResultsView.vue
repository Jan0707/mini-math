<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionHistory } from '@/composables/useSessionHistory'
import SessionCard from '@/components/SessionCard.vue'

const router = useRouter()
const { sessions, loadSessions, getLatestSession } = useSessionHistory()

const latestSession = computed(() => getLatestSession())

const scoreMessage = computed(() => {
  if (!latestSession.value) return ''
  const percent = (latestSession.value.score / latestSession.value.totalQuestions) * 100
  if (percent === 100) return 'Perfect!'
  if (percent >= 80) return 'Great job!'
  if (percent >= 60) return 'Good work!'
  return 'Keep practicing!'
})

const hasHistory = computed(() => sessions.value.length > 0)

const pastSessions = computed(() => {
  return sessions.value.slice(1)
})

onMounted(() => {
  loadSessions()
})

function playAgain() {
  router.push('/settings')
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="results-view">
    <template v-if="hasHistory">
      <h1 class="title">{{ scoreMessage }}</h1>

      <div v-if="latestSession" class="score-display">
        <span class="score">{{ latestSession.score }}</span>
        <span class="divider">/</span>
        <span class="total">{{ latestSession.totalQuestions }}</span>
      </div>

      <div class="actions">
        <button class="action-btn primary" @click="playAgain">
          Play Again
        </button>
        <button class="action-btn secondary" @click="goHome">
          Home
        </button>
      </div>

      <div v-if="pastSessions.length > 0" class="history-section">
        <h2 class="history-title">Past Games</h2>
        <div class="history-list">
          <SessionCard v-for="session in pastSessions" :key="session.id" :session="session" />
        </div>
      </div>
    </template>

    <template v-else>
      <h1 class="title">History</h1>
      <p class="empty-message">No games played yet!</p>
      <div class="actions">
        <button class="action-btn primary" @click="playAgain">
          Play Now
        </button>
        <button class="action-btn secondary" @click="goHome">
          Home
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.results-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0;
  text-align: center;
}

.empty-message {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.7;
  margin: 1rem 0;
}

.score-display {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.score {
  font-size: 5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.divider {
  font-size: 3rem;
  color: var(--color-text);
  opacity: 0.5;
}

.total {
  font-size: 3rem;
  color: var(--color-text);
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-btn {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn.primary {
  background: var(--color-primary);
  color: white;
}

.action-btn.primary:hover {
  background: var(--color-primary-hover);
}

.action-btn.secondary {
  background: var(--color-background-mute);
  color: var(--color-text);
}

.action-btn.secondary:hover {
  background: var(--color-border);
}

.history-section {
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;
}

.history-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--color-text);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
