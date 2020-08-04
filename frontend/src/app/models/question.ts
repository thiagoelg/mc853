import { ResponseType } from 'src/app/models/responseType';
import { BaseModel } from '.';

export interface Question extends BaseModel {
  text: string;
  description: string;
  response_type?: ResponseType;
  response_type_id?: number;
}

export interface QuestionData extends BaseModel {
  text: string;
  description: string;
  response_type_id: number;
}
