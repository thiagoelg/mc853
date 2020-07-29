export interface Permission {
  id: number;
  name: string;
  short_name: string;
}

export abstract class RequiredPermissions {
  static requiredPermissions: Array<string> = [];
}