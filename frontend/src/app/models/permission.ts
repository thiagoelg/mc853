export interface Permission {
  id: number;
  name: string;
  short_name: string;
}

export abstract class RequiredPermissionsModule {
  static requiredPermissions: Array<string> = [];
}