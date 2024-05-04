import { Course } from "./course";

export interface Student
{
  id: number;
  name: String;
  active: boolean;
  period: String;
  course: Course;
}
