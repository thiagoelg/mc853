import BaseModel from "./BaseModel";

export interface ResponseTypeData {
  name: string,
  max: number,
  min: number,
  regex: string,
  basic_type: "text" | "number" | "date" | "file"
}

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
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static async newResponseType(data: ResponseTypeData) {
    const response_type = await ResponseType.transaction(async (trx) => {
      return await ResponseType.query(trx).insert(data);
    });
    return response_type;
  }

  static async listByBasicType(basic_type: string) {
    const query = ResponseType.query()
      .where({ basic_type: basic_type })
      .orderBy("id", "asc");
    return await query;
  }

  static async list(filters: { [key: string]: any }) {
    const query = ResponseType.query().orderBy("id", "asc");
    BaseModel.applyFilters(query, filters);
    return await query;
  }

  static async setStatus(response_type_id: number, status: boolean) {
    const query = ResponseType.query().patchAndFetchById(response_type_id, {
      status
    });
    return await query;
  }
}
