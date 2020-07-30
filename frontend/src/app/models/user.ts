import { BaseModel } from './index';
import { Role } from './role';
import { Permission } from './permission';

export interface User extends BaseModel {
  id: number;
  name: string;
  email: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserWithRole extends User {
  role: Role;
  permissions: Array<Permission>;
}
