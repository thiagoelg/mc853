import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import { default as FormQuestion, FormQuestionData } from "./FormQuestion";

export interface FormData {
  name: string;
  is_template?: boolean;
  description: string,
  form_questions?: Omit<FormQuestionData, 'form_id'>[];
}

export default class Form extends BaseModel {
  name!: string;
  description?: string;
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
        description: { type: "text", minLength: 1, maxLength: 4096 },
        is_template: { type: "boolean" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static async newForm(data: FormData) {
    const { name, is_template = false } = data;

    const form = await Form.transaction(async (trx) => {
      const created_form = await Form.query(trx).insert({ name, is_template });

      const form_questions = data.form_questions?.map(fq => {
        return {
          ...fq,
          form_id: created_form.id
        } as FormQuestionData;
      })

      await FormQuestion.query(trx).insert(form_questions ?? []);

      return await Form.query(trx).findById(created_form.id).withGraphFetched("form_questions.question.response_type");
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
      const query = Form.query().withGraphFetched("form_questions.question.response_type").orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async setStatus(form_id: number, status: boolean) {
    const query = Form.query().patchAndFetchById(form_id, {
      status
    });
    return await query;
  }
}
