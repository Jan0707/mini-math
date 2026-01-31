<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '@/composables/useGameState'
import NumberPad from '@/components/NumberPad.vue'
import QuestionDisplay from '@/components/QuestionDisplay.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import FeedbackOverlay from '@/components/FeedbackOverlay.vue'

const router = useRouter()
const { currentQuestion, progress, isGameActive, isGameComplete, submitAnswer, nextQuestion, completeGame, resetGame } =
  useGameState()

const showFeedback = ref(false)
const lastAnswerCorrect = ref(false)
const lastCorrectAnswer = ref(0)
const showQuitDialog = ref(false)

const numberPadRef = ref<InstanceType<typeof NumberPad> | null>(null)

onMounted(() => {
  if (!isGameActive.value || !currentQuestion.value) {
    router.replace('/settings')
    return
  }

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(event: KeyboardEvent) {
  if (showFeedback.value || showQuitDialog.value) return
  numberPadRef.value?.handleKeydown(event)
}

function handleAnswer(answer: number) {
  if (!currentQuestion.value) return

  lastCorrectAnswer.value = currentQuestion.value.correctAnswer
  lastAnswerCorrect.value = submitAnswer(answer)
  showFeedback.value = true

  const delay = lastAnswerCorrect.value ? 800 : 1500
  setTimeout(() => {
    showFeedback.value = false
    nextQuestion()
  }, delay)
}

watch(isGameComplete, (complete) => {
  if (complete) {
    completeGame()
    router.push('/results')
  }
})

function handleQuit() {
  showQuitDialog.value = true
}

function confirmQuit() {
  resetGame()
  router.push('/')
}

function cancelQuit() {
  showQuitDialog.value = false
}
</script>

<template>
  <div class="play-view">
    <button class="quit-button" @click="handleQuit">
      &#10005;
    </button>

    <ProgressBar :current="progress.current" :total="progress.total" />

    <div class="question-area">
      <QuestionDisplay v-if="currentQuestion" :question="currentQuestion" />
    </div>

    <NumberPad ref="numberPadRef" @submit="handleAnswer" />

    <FeedbackOverlay v-if="showFeedback" :is-correct="lastAnswerCorrect" :correct-answer="lastCorrectAnswer" />

    <Teleport to="body">
      <div v-if="showQuitDialog" class="dialog-overlay" @click.self="cancelQuit">
        <div class="dialog">
          <h2>Quit Game?</h2>
          <p>Your progress will be lost.</p>
          <div class="dialog-buttons">
            <button class="dialog-btn cancel" @click="cancelQuit">Cancel</button>
            <button class="dialog-btn confirm" @click="confirmQuit">Quit</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.play-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem 2rem;
  gap: 2rem;
}

.quit-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.quit-button:hover {
  opacity: 1;
}

.question-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.dialog {
  background: var(--color-background);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  max-width: 300px;
  width: 90%;
}

.dialog h2 {
  margin: 0 0 0.5rem;
  color: var(--color-text);
}

.dialog p {
  margin: 0 0 1.5rem;
  color: var(--color-text);
  opacity: 0.7;
}

.dialog-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.dialog-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.dialog-btn.cancel {
  background: var(--color-background-mute);
  color: var(--color-text);
}

.dialog-btn.confirm {
  background: var(--color-danger);
  color: white;
}
</style>
