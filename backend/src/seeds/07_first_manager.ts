import * as Knex from "knex";
import Role from "../models/Role";

export async function seed(knex: Knex): Promise<any> {
  return knex("role")
    .where({ short_name: "manager" })
    .first()
    .then((role: Role) => {
      // Inserts seed entries
      return knex("user").insert([
        {
          name: "manager",
          email: "manager",
          password:
            "$2a$10$JytuD2Mv0lwObUZlB6W82eerPeOqfJnlB.edMvd1SfOtIII/AvYPK",
          role_id: role.id
        },
      ]);
    });
}
