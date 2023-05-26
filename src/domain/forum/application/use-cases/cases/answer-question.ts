import { UniqueEntityID } from "@/cors/entities/unique-entity-id"
import { Answer } from "@/domain/forum/enterprises/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"

interface AnswerQuestionUseCaseRequest{
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse{
  answer: Answer
}

export class AnswerQuestionUseCase{
  constructor(private answerRepository: AnswersRepository) {}
  
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse>{
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })
    await this.answerRepository.create(answer);
    return { answer }
  }
}