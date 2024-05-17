import { Period } from "./period";

export interface Student
{
  id: number;
  name: String;
  active: boolean;
  period: Period;
  course: number;
}
