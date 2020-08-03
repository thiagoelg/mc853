import BaseModel from "./BaseModel";

export default class File extends BaseModel {
  name!: string;
  path!: string;

  static get tableName() {
    return "file";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["path"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        path: { type: "string", minLength: 1, maxLength: 1024 },
        size: { type: "bigInteger" },
        status: { type: "boolean" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      },
    };
  }
}
