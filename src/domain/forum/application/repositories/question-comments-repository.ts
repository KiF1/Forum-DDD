import { QuestionComment } from "../../enterprises/entities/question-comment";

export interface QuestionCommentsRepository{
  create(questionComment: QuestionComment): Promise<void>
}