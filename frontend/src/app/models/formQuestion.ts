import { BaseModel } from '.';
import { Question } from './question';

export interface FormQuestion extends BaseModel {
  form_id?: number;
  question: Question;
  order: number;
  required: boolean;
}
