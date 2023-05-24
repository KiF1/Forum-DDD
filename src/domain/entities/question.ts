import { Slug } from "./value-objects/slug"
import { Entity } from "../../cors/entities/entity"

interface QuestionProps{
  title: string
  content: string
  slug: Slug
  authorId: string 
}

export class Question extends Entity<QuestionProps>{
  
}