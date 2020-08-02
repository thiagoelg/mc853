import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("role", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.string("short_name").unique();
    table.integer("level");
    table.timestamps(true, true);
    table.boolean("is_default");
    table.boolean("status").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("role");
}
