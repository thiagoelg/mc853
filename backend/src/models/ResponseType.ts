import BaseModel from "./BaseModel";

export default class ResponseType extends BaseModel {
  name!: string;
  min!: number;
  max!: number;
  regex!: string;
  basic_type!: "text" | "number" | "date" | "file";

  static get tableName() {
    return "response_type";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        min: { type: "number" },
        max: { type: "number" },
        basic_type: { type: "string", minLength: 4, maxLength: 6 },
        regex: { type: "string", minLength: 0, maxLength: 1024 },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newResponseType(
    name: string,
    max: number,
    min: number = 0,
    regex: string = "",
    basic_type: "text" | "number" | "date" | "file" = "text"
  ) {
    const response_type = await ResponseType.transaction(async (trx) => {
      return await ResponseType.query(trx).insert({
        name,
        min,
        max,
        regex,
        basic_type,
      });
    });
    return response_type;
  }

  static async listByBasicType(basic_type: string) {
    try {
      const query = ResponseType.query()
        .where({ basic_type: basic_type })
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async list() {
    try {
      const query = ResponseType.query().orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}