export type Difficulty = 'through10' | 'through20'
export type CalculationType = 'plus' | 'minus' | 'both'
export type QuestionCount = 5 | 10 | 20

export interface GameSettings {
  difficulty: Difficulty
  calculationType: CalculationType
  questionCount: QuestionCount
}

export interface Question {
  id: number
  operand1: number
  operand2: number
  operator: '+' | '-'
  correctAnswer: number
}

export interface AnsweredQuestion extends Question {
  userAnswer: number
  isCorrect: boolean
  answeredAt: number
}

export interface GameSession {
  id: string
  settings: GameSettings
  questions: AnsweredQuestion[]
  startedAt: number
  completedAt: number
  score: number
  totalQuestions: number
}
