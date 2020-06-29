import { ResponseType } from 'src/app/models/responseType';
import { BaseModel } from '.';

export interface Question extends BaseModel {
  text: string;
  response_type?: ResponseType;
  response_type_id?: number;
}

export interface QuestionCreate extends BaseModel {
  text: string;
  responseTypeId: number;
}