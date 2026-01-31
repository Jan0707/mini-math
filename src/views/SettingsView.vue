<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameState } from '@/composables/useGameState'
import OptionButton from '@/components/OptionButton.vue'
import type { Difficulty, CalculationType, QuestionCount } from '@/types/game'

const router = useRouter()
const { settings, updateSettings, startGame } = useGameState()

const difficultyOptions: { value: Difficulty; label: string }[] = [
  { value: 'through10', label: '0-10' },
  { value: 'through20', label: '0-20' },
]

const calculationOptions: { value: CalculationType; label: string }[] = [
  { value: 'plus', label: 'Plus (+)' },
  { value: 'minus', label: 'Minus (-)' },
  { value: 'both', label: 'Both (+/-)' },
]

const countOptions: { value: QuestionCount; label: string }[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
]

function handleStart() {
  startGame()
  router.push('/play')
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="settings-view">
    <button class="back-button" @click="goBack">
      &#8592; Back
    </button>

    <h1 class="title">Settings</h1>

    <div class="settings-section">
      <h2 class="section-title">Numbers</h2>
      <div class="options-row">
        <OptionButton v-for="option in difficultyOptions" :key="option.value" :label="option.label"
          :selected="settings.difficulty === option.value" @click="updateSettings({ difficulty: option.value })" />
      </div>
    </div>

    <div class="settings-section">
      <h2 class="section-title">Operation</h2>
      <div class="options-row">
        <OptionButton v-for="option in calculationOptions" :key="option.value" :label="option.label"
          :selected="settings.calculationType === option.value"
          @click="updateSettings({ calculationType: option.value })" />
      </div>
    </div>

    <div class="settings-section">
      <h2 class="section-title">Questions</h2>
      <div class="options-row">
        <OptionButton v-for="option in countOptions" :key="option.value" :label="option.label"
          :selected="settings.questionCount === option.value"
          @click="updateSettings({ questionCount: option.value })" />
      </div>
    </div>

    <button class="play-button" @click="handleStart">
      Play!
    </button>
  </div>
</template>

<style scoped>
.settings-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem 2rem;
  gap: 1.5rem;
}

.back-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.7;
}

.back-button:hover {
  opacity: 1;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0;
}

.settings-section {
  width: 100%;
  max-width: 400px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: var(--color-text);
}

.options-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.play-button {
  margin-top: 1rem;
  padding: 1.25rem 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.play-button:hover {
  background: var(--color-primary-hover);
}

.play-button:active {
  transform: scale(0.95);
}
</style>
