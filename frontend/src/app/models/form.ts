import { BaseModel } from '.';
import { FormQuestion } from './formQuestion';

export interface Form extends BaseModel {
  name: string;
  is_template: boolean;
}

export interface FormFull extends Form {
  questions: FormQuestion[];
}
