import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import ResponseType from "./ResponseType";

export interface QuestionData {
  text: string;
  response_type_id: number;
  description?: string;
}

export default class Question extends BaseModel {
  text!: string;
  response_type_id!: number;
  description?: string;

  static get tableName() {
    return "question";
  }

  static get relationMappings(): RelationMappings {
    return {
      response_type: {
        relation: Model.HasOneRelation,
        modelClass: ResponseType,
        join: {
          from: "question.response_type_id",
          to: "response_type.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text", "response_type_id"],

      properties: {
        id: { type: "integer" },
        text: { type: "string", minLength: 1, maxLength: 1024 },
        description: { type: "text", minLength: 1, maxLength: 4096 },
        response_type_id: { type: "number" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static async newQuestion(data: QuestionData) {
    const question = await Question.transaction(async (trx) => {
      return await Question.query(trx).insert(data);
    });
    return question;
  }

  static async list(filters: { [key: string]: any }) {
    const query = Question.query()
      .withGraphFetched("response_type")
      .orderBy("id", "asc");
    BaseModel.applyFilters(query, filters);
    return await query;
  }

  static async get(question_id: number) {
    const query = Question.query().findById(question_id).withGraphFetched("response_type");
    return await query;
  }

  static async delete(question_id: number) {
    const query = Question.query().deleteById(question_id);
    return await query;
  }

  static async setStatus(question_id: number, status: boolean) {
    const query = Question.query().patchAndFetchById(question_id, {
      status
    });
    return await query;
  }

}
