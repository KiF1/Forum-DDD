import { expect, test } from 'vitest'
import { Answer } from '@/domain/entities/answer';
import { AnswersRepository } from '@/domain/repositories/answers-repositpry';
import { AnswerQuestionUseCase } from '../cases/answer-question';


const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova Resposta',
  })
  expect(answer.content).toEqual('Nova Resposta')
})