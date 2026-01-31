import { ref, computed } from 'vue'
import type { GameSettings, Question, AnsweredQuestion, GameSession } from '@/types/game'
import { useQuestionGenerator } from './useQuestionGenerator'
import { useSessionHistory } from './useSessionHistory'

const settings = ref<GameSettings>({
  difficulty: 'through10',
  calculationType: 'plus',
  questionCount: 10,
})

const questions = ref<Question[]>([])
const answeredQuestions = ref<AnsweredQuestion[]>([])
const currentQuestionIndex = ref(0)
const gameStartedAt = ref<number | null>(null)
const isGameActive = ref(false)

export function useGameState() {
  const { generateQuestions } = useQuestionGenerator()
  const { saveSession } = useSessionHistory()

  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value] ?? null
  })

  const progress = computed(() => ({
    current: currentQuestionIndex.value + 1,
    total: questions.value.length,
  }))

  const score = computed(() => {
    return answeredQuestions.value.filter((q) => q.isCorrect).length
  })

  const isGameComplete = computed(() => {
    return (
      isGameActive.value &&
      questions.value.length > 0 &&
      currentQuestionIndex.value >= questions.value.length
    )
  })

  function updateSettings(newSettings: Partial<GameSettings>) {
    settings.value = { ...settings.value, ...newSettings }
  }

  function startGame() {
    questions.value = generateQuestions(settings.value)
    answeredQuestions.value = []
    currentQuestionIndex.value = 0
    gameStartedAt.value = Date.now()
    isGameActive.value = true
  }

  function submitAnswer(userAnswer: number): boolean {
    const question = currentQuestion.value
    if (!question) return false

    const isCorrect = userAnswer === question.correctAnswer

    const answered: AnsweredQuestion = {
      ...question,
      userAnswer,
      isCorrect,
      answeredAt: Date.now(),
    }

    answeredQuestions.value.push(answered)
    return isCorrect
  }

  function nextQuestion() {
    currentQuestionIndex.value++
  }

  function completeGame(): GameSession {
    const session: GameSession = {
      id: crypto.randomUUID(),
      settings: { ...settings.value },
      questions: [...answeredQuestions.value],
      startedAt: gameStartedAt.value!,
      completedAt: Date.now(),
      score: score.value,
      totalQuestions: questions.value.length,
    }

    saveSession(session)
    isGameActive.value = false
    return session
  }

  function resetGame() {
    questions.value = []
    answeredQuestions.value = []
    currentQuestionIndex.value = 0
    gameStartedAt.value = null
    isGameActive.value = false
  }

  return {
    settings,
    currentQuestion,
    progress,
    score,
    isGameActive,
    isGameComplete,
    answeredQuestions,
    updateSettings,
    startGame,
    submitAnswer,
    nextQuestion,
    completeGame,
    resetGame,
  }
}
