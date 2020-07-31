import * as Knex from "knex";
import Role from "../models/Role";

export async function seed(knex: Knex): Promise<any> {
  return knex("role")
    .where({ short_name: "requester" })
    .first()
    .then((role: Role) => {
      // Inserts seed entries
      return knex("user").insert([
        {
          name: "requester",
          email: "requester",
          password:
            "$2a$10$p0zq7fC382tDIIUBVNNkse55KtO5SD60xY.rTWYDviWwUWkbm3xBi",
          role_id: role.id
        },
      ]);
    });
}
