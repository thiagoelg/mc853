import * as Knex from "knex";
import Role from "../models/Role";

export async function seed(knex: Knex): Promise<any> {
  return knex("role")
    .where({ short_name: "worker" })
    .first()
    .then((role: Role) => {
      // Inserts seed entries
      return knex("user").insert([
        {
          name: "Atendente",
          email: "worker",
          password:
            "$2a$10$Ai.IijhHOwgr5vcK7KoXMevC0S6vRX5auKicVJz9nO3FxNEj0v1ry",
          role_id: role.id,
          origin: "UNICAMP"
        },
      ]);
    });
}
