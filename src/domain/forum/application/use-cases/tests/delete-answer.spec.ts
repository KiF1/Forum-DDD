import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { makeAnswer } from 'tests/factories/make-answer';
import { DeleteAnswerUseCase } from '../cases/delete-answer';
import { UniqueEntityID } from '@/cors/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ 
      authorId: 'author-1',
      answerId: 'answer-1' 
    })
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
  it('should be not able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));
    await inMemoryAnswersRepository.create(newAnswer);

    await expect(() => sut.execute({ 
      authorId: 'author-2',
      answerId: 'answer-1' 
    })).rejects.toBeInstanceOf(Error)
  })
})

