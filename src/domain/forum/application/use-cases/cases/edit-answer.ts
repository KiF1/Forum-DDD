import { Answer } from "@/domain/forum/enterprises/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { Either, left, right } from "@/cors/either";
import { NotAllowedError } from "../errors/not-allowed-error";
import { ResourceNotFoundError } from "../errors/not-found-error";

interface EditAnswerUseCaseRequest{
  authorId: string
  answerId: string
  content: string
}


type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }> 

export class EditAnswerUseCase{
  constructor(private answerRepository: AnswersRepository) {}
  
  async execute({ authorId, answerId, content }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findById(answerId);
    if(!answer){
      return left(new ResourceNotFoundError())
    }
    if(authorId !== answer.authorId.toString()){
      return left(new NotAllowedError())
    }
    answer.content = content

    await this.answerRepository.save(answer);
    return right({ answer })
  }
}