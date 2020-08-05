import { Model, RelationMappings } from "objection";
import BaseModel from "./BaseModel";
import FormQuestion from "./FormQuestion";
import User from "./User";

export interface AnswerData {
  value: string;
  solicitation_id: number;
  form_question_id: number;
  answered_by_user_id: number;
}

export default class Answer extends BaseModel {
  solicitation_id!: number;
  form_question_id!: number;
  value!: string;
  answered_by_user_id!: number;

  static get tableName() {
    return "answer";
  }

  static get relationMappings(): RelationMappings {
    return {
      form_question: {
        relation: Model.HasOneRelation,
        modelClass: FormQuestion,
        join: {
          from: "answer.form_question_id",
          to: "form_question.id"
        }
      },
      solicitation: {
        relation: Model.HasOneRelation,
        modelClass: FormQuestion,
        join: {
          from: "answer.solicitation_id",
          to: "form_question.id"
        }
      },
      answered_by_user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "answer.answered_by_user_id",
          to: "user.id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["value", "solicitation_id", "form_question_id"],

      properties: {
        id: { type: "integer" },
        solicitation_id: { type: "number" },
        form_question_id: { type: "number" },
        value: { type: "text" },
        answered_by_user_id: { type: "number" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      }
    };
  }

  static async newAnswer(data: AnswerData) {
    const answer = await Answer.transaction(async (trx) => {
      return await Answer.query(trx).insert(data);
    });
    return answer;
  }

  static async newAnswers(data: AnswerData[]) {
    const answers = await Answer.transaction(async (trx) => {
      return await Answer.query(trx).insert(data);
    });
    return answers;
  }

  static async list(solicitation_id: number): Promise<Answer[]> {
    try {
      const query = Answer.query()
        .where("solicitation_id", solicitation_id)
        .withGraphFetched("[form_question.question.response_type, answered_by_user]")
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async forFormQuestion(data: { solicitation_id: number; form_question_id: number }) {
    try {
      const query = Answer.query()
        .where("form_question_id", data.form_question_id)
        .findOne("solicitation_id", data.solicitation_id)
        .withGraphFetched("[form_question.question.response_type, answered_by_user]")
        .orderBy("id", "asc");
      return await query;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
