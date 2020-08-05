import { BaseModel } from './index';
import { User } from './user';

export interface SolicitationPost extends BaseModel {
  id: number;
  content: string;
  solicitation_id: number;
  author_id: number;
  author: User;
  created_at: Date;
  updated_at: Date;
  authorProfileImageUrl?: string;
}
