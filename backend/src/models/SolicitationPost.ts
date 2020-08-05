import BaseModel from "./BaseModel";
import { Model, RelationMappings } from "objection";
import User from "./User";

export interface SolicitationPostData {
  content: string;
  author_id: number;
  solicitation_id: number;
}

export default class SolicitationPost extends BaseModel {
  content!: string;
  solicitation_id!: number;
  author_id!: number;

  static get tableName() {
    return "solicitation_post";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["solicitation_id", "author_id"],

      properties: {
        id: { type: "integer" },
        content: { type: "text", minLength: 1, maxLength: 4096 },
        author_id: { type: "integer" },
        solicitation_id: { type: "integer" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      }
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "solicitation_post.author_id",
          to: "user.id"
        }
      }
    };
  }

  static async new(data: SolicitationPostData) {
    const solicitationPost = await SolicitationPost.transaction(async (trx) => {
      return await SolicitationPost.query(trx).insert(data);
    });
    return solicitationPost;
  }

  static async list(solicitation_id: number) {
    const query = SolicitationPost.query()
      .where("solicitation_id", solicitation_id)
      .orderBy("id", "asc")
      .withGraphFetched("author");
    return await query;
  }
}
