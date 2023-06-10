import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from '../cases/comment-on-question';
import { DeleteQuestionCommentUseCase } from '../cases/delete-question-comment';
import { makeQuestionComment } from 'tests/factories/make-question-comment';
import { UniqueEntityID } from '@/cors/entities/unique-entity-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({ 
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(), 
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await expect(() => {
      return sut.execute({ 
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(), 
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
 
