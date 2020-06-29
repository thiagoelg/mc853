import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import { default as FormQuestion } from "./FormQuestion";

export interface FormData {
  name: string;
  is_template?: boolean;
}

export default class Form extends BaseModel {
  name!: string;
  is_template!: boolean;

  static get tableName() {
    return "form";
  }

  static get relationMappings(): RelationMappings {
    return {
      form_questions: {
        relation: Model.HasManyRelation,
        modelClass: FormQuestion,
        join: {
          from: "form.id",
          to: "form_question.form_id",
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        is_template: { type: "boolean" },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newForm(data: FormData) {
    const { name, is_template = false } = data;

    const form = await Form.transaction(async (trx) => {

      return await Form.query(trx).insert({ name, is_template });
    });
    return form;
  }

  static async get(form_id: number) {
    try {
      const query = Form.query().findById(form_id).withGraphFetched("form_questions.question.response_type");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async list() {
    try {
      const query = Form.query().orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
