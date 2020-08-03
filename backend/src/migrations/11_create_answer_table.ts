import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "answer",
    (table: Knex.TableBuilder) => {
      table.increments("id").primary();
      table.integer("solicitation_id").references("id").inTable("solicitation").onUpdate('CASCADE').onDelete('CASCADE');
      table.integer("form_question_id").references("id").inTable("form_question").onUpdate('CASCADE').onDelete('CASCADE');
      table.string("value");
      table.boolean("status").defaultTo(true);
      table.integer("answered_by_user_id").references("id").inTable("user").onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamps(true, true);
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("answer");
}
