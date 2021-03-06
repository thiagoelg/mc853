import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("form", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
    table.boolean("is_template");
    table.timestamps(true, true);
    table.boolean("status").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("form");
}
