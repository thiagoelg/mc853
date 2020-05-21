import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import ResponseType from "./ResponseType";

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
      required: ["name"],

      properties: {
        id: { type: "integer" },
        text: { type: "string", minLength: 1, maxLength: 1024 },
        response_type_id: { type: "number" },
        created_at: { type: "string", minLength: 1, maxLength: 255 },
        updated_at: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newQuestion(text: string, response_type_id: number) {
    const question = await Question.transaction(async (trx) => {
      return await Question.query(trx).insert({ text, response_type_id });
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
}
