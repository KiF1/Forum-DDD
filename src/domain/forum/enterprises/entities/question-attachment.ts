import { Entity } from "@/cors/entities/entity";
import { UniqueEntityID } from "@/cors/entities/unique-entity-id";

interface QuestionAttachmentProps{
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps>{
  get questionId(){
    return this.props.questionId
  }

  get attachmentId(){
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID){
    const attachment = new QuestionAttachment(props, id)
    return attachment
  }
}