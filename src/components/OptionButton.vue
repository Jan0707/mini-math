<script setup lang="ts">
defineProps<{
  selected: boolean
  label: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="option-button" :class="{ selected }" @click="emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.option-button {
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: 3px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    transform 0.1s;
  min-width: 120px;
  -webkit-tap-highlight-color: transparent;
}

.option-button:hover {
  border-color: var(--color-primary);
}

.option-button:active {
  transform: scale(0.98);
}

.option-button.selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
</style>
