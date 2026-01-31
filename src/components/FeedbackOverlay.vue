<script setup lang="ts">
defineProps<{
  isCorrect: boolean
  correctAnswer: number
}>()
</script>

<template>
  <div class="feedback-overlay" :class="{ correct: isCorrect, incorrect: !isCorrect }">
    <div class="feedback-content">
      <div class="feedback-icon">
        {{ isCorrect ? '&#10003;' : '&#10007;' }}
      </div>
      <div class="feedback-text">
        {{ isCorrect ? 'Correct!' : 'Not quite!' }}
      </div>
      <div v-if="!isCorrect" class="correct-answer">
        The answer is {{ correctAnswer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.feedback-overlay.correct {
  background: rgba(34, 197, 94, 0.95);
}

.feedback-overlay.incorrect {
  background: rgba(239, 68, 68, 0.95);
}

.feedback-content {
  text-align: center;
  color: white;
}

.feedback-icon {
  font-size: 6rem;
  margin-bottom: 1rem;
}

.feedback-text {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.correct-answer {
  font-size: 1.5rem;
  opacity: 0.9;
}
</style>
