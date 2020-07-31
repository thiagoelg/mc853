import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("form", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.boolean("is_template");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("form");
}
