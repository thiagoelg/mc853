import { BaseModel } from '.';

export interface Form extends BaseModel {
  name: string;
  is_template: boolean;
}
