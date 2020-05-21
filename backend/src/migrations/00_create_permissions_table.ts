import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("permission", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.string("short_name").unique();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("permission");
}
