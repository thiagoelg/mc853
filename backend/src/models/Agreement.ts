import BaseModel from "./BaseModel";

export default class Agreement extends BaseModel {
  name!: string;
  content!: string;
  isTemplate!: boolean;

  static get tableName() {
    return "agreement";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        content: { type: "string", minLength: 1, maxLength: 1024 },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newAgreement(
    name: string,
    content: string,
    isTemplate: boolean = false
  ) {
    const agreement = await Agreement.transaction(async (trx) => {
      return await Agreement.query(trx).insert({ name, content, isTemplate });
    });
    return agreement;
  }

  static async listTemplates() {
    try {
      const query = Agreement.query()
        .where({ isTemplate: true })
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async list() {
    try {
      const query = Agreement.query().orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
