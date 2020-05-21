import * as Knex from "knex";
import Role from "../models/Role";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(() => {
      return knex("role")
        .where({ short_name: "admin" })
        .first()
        .then((role: Role) => {
          // Inserts seed entries
          return knex("user").insert([
            {
              name: "admin",
              email: "admin",
              password:
                "$2y$10$.mADKr979TNBWOrdhOHODuceBTe9A8frbgeg8l1iVSvDtWCLn0gUi",
              role_id: role.id,
            },
          ]);
        });
    });
}
