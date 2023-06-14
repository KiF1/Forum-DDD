import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { makeAnswer } from 'tests/factories/make-answer';
import { EditAnswerUseCase } from '../cases/edit-answer';
import { UniqueEntityID } from '@/cors/entities/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ 
      authorId: 'author-1',
      answerId: newAnswer.id.toValue() ,
      content: 'Conteudo teste',
    })
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
  })
  it('should be not able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));
    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({ 
      authorId: 'author-2',
      answerId: newAnswer.id.toValue() ,
      content: 'Conteudo teste',
    })
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

