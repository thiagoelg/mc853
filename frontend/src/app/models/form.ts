import { BaseModel } from '.';
import { FormQuestion } from './formQuestion';

export interface Form extends BaseModel {
  name: string;
  description: string;
  is_template: boolean;
}

export interface FormFull extends Form {
  form_questions: FormQuestion[];
}

export interface FormData {
  name: string;
  description: string;
  is_template: boolean;
  form_questions: {
    question_id: number;
    required: boolean;
    order: number;
  }[];
}
