import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionsRepository } from "../../repositories/question-repository";
import { Either, left, right } from "@/cors/either";
import { ResourceNotFoundError } from "../errors/not-found-error";
import { NotAllowedError } from "../errors/not-allowed-error";

interface EditQuestionUseCaseRequest{
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class EditQuestionUseCase{
  constructor(private questionRepository: QuestionsRepository) {}
  
  async execute({ authorId, questionId, content, title }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>{
    const question = await this.questionRepository.findById(questionId);
    if(!question){
      return left(new ResourceNotFoundError())
    }
    if(authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }
    question.title = title
    question.content = content

    await this.questionRepository.save(question);
    return right({ question })
  }
}