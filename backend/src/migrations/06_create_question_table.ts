import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("question", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("text");
    table.string("created_at");
    table.string("updated_at");
    table.integer("response_type_id").notNullable();
    table.foreign("response_type_id").references("response_type.id");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("question");
}
