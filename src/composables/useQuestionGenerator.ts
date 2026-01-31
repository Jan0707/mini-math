import type { Question, GameSettings } from '@/types/game'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateAdditionQuestion(id: number, maxSum: number): Question {
  const operand1 = getRandomInt(0, maxSum)
  const operand2 = getRandomInt(0, maxSum - operand1)
  return {
    id,
    operand1,
    operand2,
    operator: '+',
    correctAnswer: operand1 + operand2,
  }
}

function generateSubtractionQuestion(id: number, maxSum: number): Question {
  const operand1 = getRandomInt(0, maxSum)
  const operand2 = getRandomInt(0, operand1)
  return {
    id,
    operand1,
    operand2,
    operator: '-',
    correctAnswer: operand1 - operand2,
  }
}

export function useQuestionGenerator() {
  function generateQuestions(settings: GameSettings): Question[] {
    const maxSum = settings.difficulty === 'through10' ? 10 : 20
    const questions: Question[] = []

    for (let i = 0; i < settings.questionCount; i++) {
      let question: Question

      if (settings.calculationType === 'plus') {
        question = generateAdditionQuestion(i, maxSum)
      } else if (settings.calculationType === 'minus') {
        question = generateSubtractionQuestion(i, maxSum)
      } else {
        // 'both' - alternate between addition and subtraction
        if (Math.random() < 0.5) {
          question = generateAdditionQuestion(i, maxSum)
        } else {
          question = generateSubtractionQuestion(i, maxSum)
        }
      }

      questions.push(question)
    }

    return questions
  }

  return {
    generateQuestions,
  }
}
