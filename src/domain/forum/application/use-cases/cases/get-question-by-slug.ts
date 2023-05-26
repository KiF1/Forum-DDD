import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionsRepository } from "../../repositories/question-repository";
import { UniqueEntityID } from "@/cors/entities/unique-entity-id";

interface GetQuestionBySlugUseCaseRequest{
  slug: string
}

interface GetQuestionBySlugUseCaseResponse{
  question: Question
}

export class GetQuestionBySlugUseCase{
  constructor(private questionRepository: QuestionsRepository) {}
  
  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse>{
    const question = await this.questionRepository.findBySlug(slug)
    if(!question){
      throw new Error('Question not found')
    }

    return { question }
  }
}