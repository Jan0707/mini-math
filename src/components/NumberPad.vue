<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  submit: [value: number]
}>()

const input = ref('')

const displayValue = computed(() => input.value || '_')

function handleDigit(digit: string) {
  if (input.value.length < 2) {
    input.value += digit
  }
}

function handleBackspace() {
  input.value = input.value.slice(0, -1)
}

function handleSubmit() {
  if (input.value) {
    emit('submit', parseInt(input.value, 10))
    input.value = ''
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key >= '0' && event.key <= '9') {
    handleDigit(event.key)
  } else if (event.key === 'Backspace') {
    handleBackspace()
  } else if (event.key === 'Enter') {
    handleSubmit()
  }
}

defineExpose({ handleKeydown })
</script>

<template>
  <div class="number-pad">
    <div class="display">{{ displayValue }}</div>
    <div class="pad-grid">
      <button v-for="digit in ['1', '2', '3', '4', '5', '6', '7', '8', '9']" :key="digit" class="pad-button digit"
        @click="handleDigit(digit)">
        {{ digit }}
      </button>
      <button class="pad-button action backspace" @click="handleBackspace">
        <span aria-label="Backspace">&#8592;</span>
      </button>
      <button class="pad-button digit" @click="handleDigit('0')">0</button>
      <button class="pad-button action enter" :disabled="!input" @click="handleSubmit">
        <span aria-label="Enter">&#10003;</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.number-pad {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.display {
  font-size: 3rem;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
  padding: 0.5rem 1rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  color: var(--color-text);
}

.pad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  max-width: 280px;
}

.pad-button {
  width: 80px;
  height: 80px;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition:
    transform 0.1s,
    background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.pad-button:active {
  transform: scale(0.95);
}

.pad-button.digit {
  background: var(--color-primary);
  color: white;
}

.pad-button.digit:hover {
  background: var(--color-primary-hover);
}

.pad-button.action {
  background: var(--color-secondary);
  color: white;
}

.pad-button.action:hover {
  background: var(--color-secondary-hover);
}

.pad-button.enter:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
