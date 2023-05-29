import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionsRepository } from "../../repositories/question-repository";

interface EditQuestionUseCaseRequest{
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase{
  constructor(private questionRepository: QuestionsRepository) {}
  
  async execute({ authorId, questionId, content, title }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>{
    const question = await this.questionRepository.findById(questionId);
    if(!question){
      throw new Error('Question not Found');
    }
    if(authorId !== question.authorId.toString()){
      throw new Error('Not allowed')
    }
    question.title = title
    question.content = content

    await this.questionRepository.save(question);
    return { question }
  }
}