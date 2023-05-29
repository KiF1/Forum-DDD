import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { FetchQuestionsAnswersUseCase } from '../cases/fetch-questions-answers';
import { makeAnswer } from 'tests/factories/make-answer';
import { UniqueEntityID } from '@/cors/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch questions answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question aswers', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(answers).toHaveLength(2)
  })
})

