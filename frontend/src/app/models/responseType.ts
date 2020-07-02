import { BaseModel } from '.';

export interface ResponseType extends BaseModel {
  name: string;
  min: number;
  max: number;
  regex: string;
  basic_type: string;
}

export interface ResponseTypeCreate extends ResponseType {
  basic_type: 'text' | 'number' | 'file' | 'date';
}
