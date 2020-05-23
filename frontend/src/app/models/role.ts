import { BaseModel } from '.';
import { Permission } from './permission';

export interface Role extends BaseModel {
  id: number;
  name: string;
  short_name: string;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}
