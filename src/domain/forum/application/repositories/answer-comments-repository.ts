import { AnswerComment } from "../../enterprises/entities/answer-comment";

export interface AnswerCommentsRepository{
  create(answerComment: AnswerComment): Promise<void>
}