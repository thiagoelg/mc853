import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("user", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email");
    table.string("password");
    table.string("created_at");
    table.string("updated_at");
    table.integer("role_id").unsigned().nullable();
    table.foreign("role_id").references("id").inTable("role");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("user");
}
