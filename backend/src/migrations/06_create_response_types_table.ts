import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "response_type",
    (table: Knex.TableBuilder) => {
      table.increments("id").primary();
      table.string("name").unique();
      table.integer("min").defaultTo(0);
      table.integer("max");
      table.string("regex").defaultTo("");
      table.string("basic_type").defaultTo("text");
      table.timestamps(true, true);
      table.boolean("status").defaultTo(true);
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("response_type");
}
