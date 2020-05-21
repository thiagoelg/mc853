import { Model } from "objection";

export default class Permission extends Model {
  id!: number;
  name!: string;
  short_name!: string;

  static get tableName() {
    return "permission";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "short_name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        short_name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newPermission(name: string, shortName: string) {
    const permission = await Permission.transaction(async (trx) => {
      return await Permission.query(trx).insert({
        name,
        short_name: shortName,
      });
    });
    return permission;
  }

  static async listPermissions() {
    try {
      const query = Permission.query().orderBy("id", "asc");
      return await query;
    } catch (error) {
      return error;
    }
  }
}
