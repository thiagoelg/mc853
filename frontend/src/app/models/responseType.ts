import { BaseModel } from '.';

export interface ResponseType extends BaseModel {
  name: string;
  min: number;
  max: number;
  regex: string;
  basicType: string;
}

export interface ResponseTypeCreate extends ResponseType {
  basicType: 'text' | 'number' | 'file' | 'date';
}
