import { BaseModel } from '.';
import { Answer, AnswerForm } from './answer';
import { Form } from './form';
import { User } from './user';
import { Question } from './question';

export interface SolicitationForm {
  form_id: number;
  answers: AnswerForm[];
}

export interface Solicitation extends BaseModel {
  form_id: number;
  form: Form;
  questions: Question[];
  answers: Answer[];
  agreed_at: string;
  solution_form_id: number;
  solution_form: Form;
  solved_at: string;
  evaluated_at: string;
  evaluation_form_id: number;
  evaluation_form: Form;
  managed_by_user_id: number;
  managed_by_user: User;
  submitted_by_user_id: number;
  submitted_by_user: User;
}
