import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import Permission from "./Permission";
import RolePermissions from "./RolePermissions";

export default class Role extends BaseModel {
  name!: string;
  short_name!: string;
  is_default!: boolean;
  level!: number;

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
        level: { type: "integer" },
        is_default: { type: "boolean" },
        status: { type: 'boolean' },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      },
    };
  }

  static async newRole(name: string, short_name: string) {
    const role = await Role.transaction(async (trx) => {
      return await Role.query(trx).insert({ name, short_name });
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

  static async get(role_id: number) {
    try {
      const query = Role.query().findById(role_id).withGraphFetched("permissions")
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async getByShortName(short_name: string) {
    try {
      const query = Role.query()
        .where('short_name', short_name)
        .first()
        .withGraphFetched("permissions");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async getDefaultRole() {
    try {
      const query = Role.query()
        .where('is_default', true)
        .first()
        .withGraphFetched("permissions");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
