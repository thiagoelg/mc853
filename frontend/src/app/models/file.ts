import { BaseModel } from './index';

export interface File extends BaseModel {
  id: number;
  name: string;
  mime: string;
  size: number;
}

