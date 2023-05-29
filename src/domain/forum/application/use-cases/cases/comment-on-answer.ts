import { UniqueEntityID } from "@/cors/entities/unique-entity-id";
import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { AnswersRepository } from "../../repositories/answers-repository";

interface CommentOnAnswerUseCaseRequest{
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse{
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase{
  constructor(private answerRepository: AnswersRepository, private answerCommentsRepository: AnswerCommentsRepository) {}
  
  async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findById(answerId);
    if(!answer){
      throw new Error('Answer not found')
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)
    
    return { answerComment }
  }
}