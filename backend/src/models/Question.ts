import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import ResponseType from "./ResponseType";

export interface QuestionData {
  text: string;
  response_type_id: number;
}

export default class Question extends BaseModel {
  text!: string;
  response_type_id!: number;

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
        response_type_id: { type: "number" },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newQuestion(data: QuestionData) {
    const question = await Question.transaction(async (trx) => {
      return await Question.query(trx).insert(data);
    });
    return question;
  }

  static async list() {
    try {
      const query = Question.query()
        .withGraphFetched("response_type")
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async get(question_id: number) {
    try {
      const query = Question.query().findById(question_id).withGraphFetched("response_type");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async delete(question_id: number) {
    try {
      const query = Question.query().deleteById(question_id);
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }


}
