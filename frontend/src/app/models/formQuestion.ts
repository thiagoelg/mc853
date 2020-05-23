import { Question } from './question';

export interface FormQuestion {
  form_id: number;
  question: Question;
  order: number;
  required: boolean;
}
