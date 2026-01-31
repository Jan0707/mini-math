<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame() {
  router.push('/settings')
}
</script>

<template>
  <div class="splash-view">
    <div class="brand">
      <h1 class="title">Mini Math</h1>
      <p class="tagline">Fun math practice for kids!</p>
    </div>
    <button class="start-button" @click="startGame">
      Start
    </button>
  </div>
</template>

<style scoped>
.splash-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  text-align: center;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 4rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0;
  text-shadow: 2px 2px 0 var(--color-secondary);
}

.tagline {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.8;
  margin: 0;
}

.start-button {
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

.start-button:hover {
  background: var(--color-primary-hover);
}

.start-button:active {
  transform: scale(0.95);
}

@media (max-width: 400px) {
  .title {
    font-size: 3rem;
  }
}
</style>
