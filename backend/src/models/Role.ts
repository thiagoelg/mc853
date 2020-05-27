import { Model, RelationMappings } from "objection";
import Permission from "./Permission";
import RolePermissions from "./RolePermissions";
import BaseModel from "./BaseModel";

export default class Role extends BaseModel {
  name!: string;
  short_name!: string;

  static get tableName() {
    return "role";
  }

  static get relationMappings(): RelationMappings {
    return {
      role_permissions: {
        relation: Model.HasManyRelation,
        modelClass: RolePermissions,
        join: {
          from: "role.id",
          to: "role_permissions.role_id",
        },
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: "role.id",
          through: {
            modelClass: RolePermissions,
            from: "role_permissions.role_id",
            to: "role_permissions.permission_id",
          },
          to: "permission.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        short_name: { type: "string", minLength: 1, maxLength: 255 },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 }
      },
    };
  }

  static async newRole(name: string) {
    const role = await Role.transaction(async (trx) => {
      return await Role.query(trx).insert({ name });
    });
    return role;
  }

  static async list() {
    try {
      const query = Role.query()
        .withGraphFetched("permissions")
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
