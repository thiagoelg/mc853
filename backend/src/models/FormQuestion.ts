import { Model } from "objection";
import BaseModel from "./BaseModel";
import Question from "./Question";

export interface FormQuestionData {
  form_id: number;
  question_id: number;
  required: boolean;
  order: number;
}

export default class FormQuestion extends BaseModel {
  form_id!: number;
  question_id!: number;
  required!: boolean;
  order!: number;

  static get tableName() {
    return "form_question";
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.HasOneRelation,
        modelClass: Question,
        join: {
          from: "form_question.question_id",
          to: "question.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["form_id", "question_id", "order"],

      properties: {
        form_id: { type: "integer" },
        question_id: { type: "integer" },
        order: { type: "integer" },
        required: { type: "boolean" },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 }
      },
    };
  }

  static async listAll() {
    try {
      return await this.query();
    } catch (error) {
      return error;
    }
  }

  static async listQuestions(form_id: number): Promise<FormQuestion[]> {
    try {
      const query = FormQuestion.query()
        .where({ form_id })
        .withGraphFetched("question")
        .orderBy("order", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async getQuestion(form_id: number, question_id: number) {
    try {
      const query = FormQuestion.query()
        .where({ form_id, question_id })
        .withGraphFetched("question")
        .orderBy("order", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async setFormQuestions(form_id: number, questions: FormQuestion[]) {
    const created_at = new Date().toString();

    const form = await FormQuestion.transaction(async (trx) => {
      return await FormQuestion.query(trx).insert(questions.map(q => {
        return { ...q, form_id, created_at };
      }));
    });
    return form;
  }
}
