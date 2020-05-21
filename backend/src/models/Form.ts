import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import { default as FormQuestion } from "./FormQuestion";
import Question from "./Question";

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
      },
      questions: {
        relation: Model.ManyToManyRelation,
        modelClass: Question,
        join: {
          from: "form.id",
          through: {
            modelClass: FormQuestion,
            from: "form_question.form_id",
            to: "form_question.question_id",
          },
          to: "question.id",
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
        is_template: { type: "boolean" },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newForm(name: string, is_template: boolean = false) {
    const form = await Form.transaction(async (trx) => {
      return await Form.query(trx).insert({ name, is_template });
    });
    return form;
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
