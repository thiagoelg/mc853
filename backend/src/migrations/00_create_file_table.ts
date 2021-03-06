import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("file", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name");
    table.string("mime");
    table.bigInteger("size");
    table.binary("value");
    table.timestamps(true, true);
    table.boolean("status").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("file");
}
