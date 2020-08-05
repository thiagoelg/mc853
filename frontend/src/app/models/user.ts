import { BaseModel } from './index';
import { Role } from './role';
import { Permission } from './permission';
import { File } from './file';

export interface User extends BaseModel {
  id: number;
  name: string;
  email: string;
  origin: string;
  role?: Role;
  permissions?: Array<Permission>;
  profile_image?: File;
  profile_image_id?: number;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  origin: string;
}
