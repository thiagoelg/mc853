import { Model } from "objection";
import Permission from "./Permission";

export default class RolePermissions extends Model {
  static get tableName() {
    return "role_permissions";
  }

  static get relationMappings() {
    return {
      permission: {
        relation: Model.HasOneRelation,
        modelClass: Permission,
        join: {
          from: "role_permissions.permission_id",
          to: "permission.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["role_id", "permission_id"],

      properties: {
        role_id: { type: "integer" },
        permission_id: { type: "integer" },
      },
    };
  }

  static async listAll() {
    try {
      return await this.query();
    } catch (error) {
      return error;
    }
  }
}
