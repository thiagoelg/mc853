import { Model, RelationMappings } from "objection";
import Answer from "./Answer";
import BaseModel from "./BaseModel";
import Form from "./Form";
import User from "./User";
import FormQuestion from "./FormQuestion";
import Question from "./Question";
import SolicitationPost from "./SolicitationPost";

export interface SolicitationData {
  form_id: number;
  submitted_by_user_id: number;
}

export default class Solicitation extends BaseModel {
  submitted_by_user_id!: number;
  managed_by_user_id!: number;

  form_id!: number;

  solution_form_id!: number;
  solved_at!: string;

  evaluation_form_id!: number;
  evaluated_at!: string;

  static get tableName() {
    return "solicitation";
  }

  static get relationMappings(): RelationMappings {
    return {
      submitted_by_user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "solicitation.submitted_by_user_id",
          to: "user.id"
        }
      },
      managed_by_user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "solicitation.managed_by_user_id",
          to: "user.id"
        }
      },
      solicitation_posts: {
        relation: Model.HasManyRelation,
        modelClass: SolicitationPost,
        join: {
          from: "solicitation.id",
          to: "solicitation_post.solicitation_id"
        }
      },
      form: {
        relation: Model.HasOneRelation,
        modelClass: Form,
        join: {
          from: "solicitation.form_id",
          to: "form.id"
        }
      },
      solution_form: {
        relation: Model.HasOneRelation,
        modelClass: Form,
        join: {
          from: "solicitation.solution_form_id",
          to: "form.id"
        }
      },
      evaluation_form: {
        relation: Model.HasOneRelation,
        modelClass: Form,
        join: {
          from: "solicitation.evaluation_form_id",
          to: "form.id"
        }
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: "solicitation.id",
          to: "answer.solicitation_id"
        }
      },
      questions: {
        relation: Model.ManyToManyRelation,
        modelClass: Question,
        join: {
          from: "solicitation.form_id",
          through: {
            modelClass: FormQuestion,
            from: "form_question.form_id",
            to: "form_question.question_id"
          },
          to: "question.id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["form_id", "submitted_by_user_id"],

      properties: {
        id: { type: "integer" },
        submitted_by_user_id: { type: "integer" },
        managed_by_user_id: { type: "integer" },
        form_id: { type: "integer" },
        solution_form_id: { type: "integer" },
        solved_at: { type: "string", minLength: 1, maxLength: 255 },
        evaluation_form_id: { type: "integer" },
        evaluated_at: { type: "string", minLength: 1, maxLength: 255 },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      }
    };
  }

  static async newSolicitation(data: SolicitationData) {
    const solicitation = await Solicitation.transaction(async (trx) => {
      return await Solicitation.query(trx).insert(data);
    });
    return solicitation;
  }

  static async setSolved(data: { solicitation_id: number }) {
    const query = Solicitation.query().patchAndFetchById(data.solicitation_id, {
      solved_at: new Date().toISOString()
    });
    return await query;
  }

  static async setNotSolved(data: { solicitation_id: number }) {
    const query = Solicitation.query().patchAndFetchById(data.solicitation_id, {
      solved_at: "Not solved"
    });
    return await query;
  }

  static async listAll() {
    const query = Solicitation.query()
      .withGraphFetched("[submitted_by_user, managed_by_user, form, solution_form, evaluation_form, questions]")
      .orderBy("id", "asc");
    return await query;
  }

  static async listSubmittedByUser(user_id: number) {
    const query = Solicitation.query()
      .where("submitted_by_user_id", user_id)
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      )
      .orderBy("id", "asc");
    return await query;
  }

  static async listManagedByUser(user_id: number) {
    const query = Solicitation.query()
      .where("managed_by_user_id", user_id)
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      )
      .orderBy("id", "asc");
    return await query;
  }

  static async listNotManaged() {
    const query = Solicitation.query()
      .where("managed_by_user_id", null)
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      )
      .orderBy("id", "asc");
    return await query;
  }

  static async changeManaged(data: { solicitation_id: number; user_id: number }) {
    const query = Solicitation.query()
      .patchAndFetchById(data.solicitation_id, {
        managed_by_user_id: data.user_id
      })
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      );
    return await query;
  }

  static async changeSolutionForm(data: { solicitation_id: number; form_id: number }) {
    const query = Solicitation.query()
      .patchAndFetchById(data.solicitation_id, {
        solution_form_id: data.form_id
      })
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      );
    return await query;
  }

  static async get(solicitation_id: number) {
    const query = Solicitation.query()
      .findById(solicitation_id)
      .withGraphFetched(
        "[submitted_by_user, managed_by_user, answers, form, solution_form, evaluation_form, questions]"
      )
      .orderBy("id", "asc");
    return await query;
  }

  static async delete(solicitation_id: number) {
    const query = Solicitation.transaction(async (trx) => {
      await Answer.query(trx).where("solicitation_id", solicitation_id).delete();

      return await Solicitation.query(trx).deleteById(solicitation_id);
    });

    return await query;
  }
}
