import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("question", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("text");
    table.text("description");
    table.timestamps(true, true);
    table.integer("response_type_id").notNullable();
    table.foreign("response_type_id").references("response_type.id").onUpdate('CASCADE').onDelete('CASCADE');
    table.boolean("status").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("question");
}
