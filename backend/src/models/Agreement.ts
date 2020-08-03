import BaseModel from "./BaseModel";

export interface AgreementData {
  name: string,
  content: string,
  isTemplate: boolean
}


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
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static async newAgreement(data: AgreementData) {
    const agreement = await Agreement.transaction(async (trx) => {
      return await Agreement.query(trx).insert(data);
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

  static async get(id: number) {
    try {
      const query = Agreement.query().findById(id)
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async delete(id: number) {
    try {
      const query = Agreement.query().deleteById(id)
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async disableTemplate(id: number) {
    try {
      const query = Agreement.query().patchAndFetchById(id, {
        isTemplate: false
      })
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async enableTemplate(id: number) {
    try {
      const query = Agreement.query().patchAndFetchById(id, {
        isTemplate: true
      })
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
