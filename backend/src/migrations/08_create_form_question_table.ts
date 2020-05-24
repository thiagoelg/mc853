import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "form_question",
    (table: Knex.TableBuilder) => {
      table.integer("form_id").references("id").inTable("form");
      table.integer("question_id").references("id").inTable("question");
      table.primary(["form_id", "question_id"]);
      table.integer("order").notNullable();
      table.boolean("required").defaultTo(true);
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("form_question");
}
