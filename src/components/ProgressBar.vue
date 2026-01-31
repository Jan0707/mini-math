<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
}>()

const percentage = computed(() => {
  return Math.round((props.current / props.total) * 100)
})
</script>

<template>
  <div class="progress-container">
    <div class="progress-text">Question {{ current }} of {{ total }}</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  max-width: 400px;
}

.progress-text {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.progress-bar {
  height: 12px;
  background: var(--color-background-mute);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 6px;
  transition: width 0.3s ease;
}
</style>
