import { Model } from "objection";
import BaseModel from "./BaseModel";
import Question from "./Question";

export default class FormQuestion extends BaseModel {
  order!: number;
  required!: boolean;

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

  static async listQuestions(form_id: number) {
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
}
