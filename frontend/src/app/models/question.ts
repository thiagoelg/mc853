import { BaseModel } from '.';

export interface Question extends BaseModel {
  text: string;
  responseType: ResponseType;
}

export interface QuestionCreate extends BaseModel {
  text: string;
  responseTypeId: number;
}
