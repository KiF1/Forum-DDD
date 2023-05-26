import { Answer } from './../../enterprises/entities/answer';

export interface AnswersRepository{
  create(answer: Answer): Promise<void>
}