<script setup lang="ts">
import type { Question } from '@/types/game'

defineProps<{
  question: Question
}>()
</script>

<template>
  <div class="question-display">
    <span class="operand">{{ question.operand1 }}</span>
    <span class="operator">{{ question.operator }}</span>
    <span class="operand">{{ question.operand2 }}</span>
    <span class="equals">=</span>
    <span class="answer-box">?</span>
  </div>
</template>

<style scoped>
.question-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--color-text);
}

.operand {
  min-width: 60px;
  text-align: center;
}

.operator {
  color: var(--color-primary);
}

.equals {
  color: var(--color-text);
}

.answer-box {
  min-width: 80px;
  text-align: center;
  padding: 0.25rem 0.5rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  color: var(--color-secondary);
}

@media (max-width: 400px) {
  .question-display {
    font-size: 2.5rem;
    gap: 0.5rem;
  }

  .operand {
    min-width: 40px;
  }

  .answer-box {
    min-width: 60px;
  }
}
</style>
