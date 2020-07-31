import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "form_question",
    (table: Knex.TableBuilder) => {
      table.increments("id").primary();
      table.integer("form_id").references("id").inTable("form").onUpdate('CASCADE').onDelete('CASCADE');
      table.integer("question_id").references("id").inTable("question").onUpdate('CASCADE').onDelete('CASCADE');
      table.integer("order").notNullable();
      table.boolean("required").defaultTo(true);

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("form_question");
}
