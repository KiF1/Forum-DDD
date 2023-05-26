import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionsRepository } from "../../repositories/question-repository";
import { UniqueEntityID } from "@/cors/entities/unique-entity-id";

interface CreateQuestionUseCaseRequest{
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse{
  question: Question
}

export class CreateQuestionUseCase{
  constructor(private questionRepository: QuestionsRepository) {}
  
  async execute({ authorId, content, title }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse>{
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title, 
      content
    })
    await this.questionRepository.create(question);

    return { question }
  }
}