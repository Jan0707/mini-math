import { ref, onMounted } from 'vue'
import type { GameSession } from '@/types/game'

const STORAGE_KEY = 'mini-math-sessions'

const sessions = ref<GameSession[]>([])

export function useSessionHistory() {
  function loadSessions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        sessions.value = JSON.parse(stored)
      }
    } catch {
      sessions.value = []
    }
  }

  function saveSessions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.value))
  }

  function saveSession(session: GameSession) {
    sessions.value.unshift(session)
    saveSessions()
  }

  function clearHistory() {
    sessions.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  function getLatestSession(): GameSession | null {
    return sessions.value[0] ?? null
  }

  onMounted(() => {
    loadSessions()
  })

  return {
    sessions,
    loadSessions,
    saveSession,
    clearHistory,
    getLatestSession,
  }
}
