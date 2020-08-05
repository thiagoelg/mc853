import { BaseModel } from '.';
import { Permission } from './permission';

export interface Role extends BaseModel {
  id: number;
  name: string;
  level: number;
  short_name: string;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}
