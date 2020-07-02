import { Model, RelationMappings } from "objection";
import Agreement from './Agreement';
import Answer from './Answer';
import BaseModel from "./BaseModel";
import Form from "./Form";
import User from './User';


export interface SolicitationData {
    form_id: number;
    submitted_by_user_id: number;
}

export default class Solicitation extends BaseModel {
    submitted_by_user_id!: number;
    managed_by_user_id!: number;

    agreement_id!: number;
    agreed_at!: string;

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
                    to: "user.id",
                },
            },
            managed_by_user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: "solicitation.managed_by_user_id",
                    to: "user.id",
                },
            },
            agreement: {
                relation: Model.HasOneRelation,
                modelClass: Agreement,
                join: {
                    from: "solicitation.agreement_id",
                    to: "agreement.id",
                },
            },
            form: {
                relation: Model.HasOneRelation,
                modelClass: Form,
                join: {
                    from: "solicitation.form_id",
                    to: "form.id",
                },
            },
            solution_form: {
                relation: Model.HasOneRelation,
                modelClass: Form,
                join: {
                    from: "solicitation.solution_form_id",
                    to: "form.id",
                },
            },
            evaluation_form: {
                relation: Model.HasOneRelation,
                modelClass: Form,
                join: {
                    from: "solicitation.evaluation_form_id",
                    to: "form.id",
                },
            },

            answers: {
                relation: Model.HasManyRelation,
                modelClass: Answer,
                join: {
                    from: "solicitation.id",
                    to: "answer.solicitation_id",
                },
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
                agreement_id: { type: "integer" },
                agreed_at: { type: "string", minLength: 1, maxLength: 255 },
                form_id: { type: "integer" },
                solution_form_id: { type: "integer" },
                solved_at: { type: "string", minLength: 1, maxLength: 255 },
                evaluation_form_id: { type: "integer" },
                evaluated_at: { type: "string", minLength: 1, maxLength: 255 },
                created_at: { type: "string", minLength: 1, maxLength: 255 },
                updated_at: { type: "string", minLength: 1, maxLength: 255 }
            },
        };
    }

    static async newSolicitation(data: SolicitationData) {
        const solicitation = await Solicitation.transaction(async (trx) => {
            return await Solicitation.query(trx).insert(data);
        });
        return solicitation;
    }

    static async listAll() {
        try {
            const query = Solicitation.query().orderBy("id", "asc");
            return await query;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }

    static async listSubmittedByUser(user_id: number) {
        try {
            const query = Solicitation.query()
                .where("submitted_by_user_id", user_id)
                .withGraphFetched("[managed_by_user, answers]")
                .orderBy("id", "asc");
            return await query;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }

    static async listManagedByUser(user_id: number) {
        try {
            const query = Solicitation.query()
                .where("managed_by_user_id", user_id)
                .withGraphFetched("[submitted_by_user, answers]")
                .orderBy("id", "asc");
            return await query;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }

    static async get(solicitation_id: number) {
        try {
            const query = Solicitation.query()
                .where("id", solicitation_id)
                .withGraphFetched("[submitted_by_user, managed_by_user, answers]")
                .orderBy("id", "asc");
            return await query;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }

}