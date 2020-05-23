import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("agreement", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").unique();
    table.string("content");
    table.boolean("isTemplate").index().defaultTo(false);
    table.string("created_at");
    table.string("updated_at");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("agreement");
}