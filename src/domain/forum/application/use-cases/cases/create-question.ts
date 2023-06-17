import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionsRepository } from "../../repositories/question-repository";
import { UniqueEntityID } from "@/cors/entities/unique-entity-id";
import { Either, right } from "@/cors/either";
import { QuestionAttachment } from "@/domain/forum/enterprises/entities/question-attachment";

interface CreateQuestionUseCaseRequest{
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase{
  constructor(private questionRepository: QuestionsRepository) {}
  
  async execute({ authorId, content, title, attachmentIds }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse>{
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title, 
      content
    })

    const questionAttachments = attachmentIds.map(attachmentId => {
      return QuestionAttachment.create({ attachmentId: new UniqueEntityID(attachmentId), questionId: question.id })
    })

    question.attachments = questionAttachments
    
    await this.questionRepository.create(question);

    return right({ question })
  }
}