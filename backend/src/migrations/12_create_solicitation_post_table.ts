import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("solicitation_post", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").unique();
    table.text("content");
    table.integer("author_id").unsigned().nullable();
    table.foreign("author_id").references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE");
    table.integer("solicitation_id").unsigned().nullable();
    table.foreign("solicitation_id").references("id").inTable("solicitation").onUpdate("CASCADE").onDelete("CASCADE");
    table.timestamps(true, true);
    table.boolean("status").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("solicitation_post");
}
