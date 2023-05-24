import { Entity } from "../../cors/entities/entity"

interface InstructorProps{
  name: string
}

export class Instructor extends Entity<InstructorProps>{
}