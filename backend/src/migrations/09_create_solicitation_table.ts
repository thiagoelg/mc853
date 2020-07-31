import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "solicitation",
    (table: Knex.TableBuilder) => {
      table.increments("id").primary();
      table.integer("submitted_by_user_id").references("id").inTable("user").onUpdate('CASCADE').onDelete('CASCADE');
      table.integer("managed_by_user_id").references("id").inTable("user").onUpdate('CASCADE').onDelete('CASCADE');

      table.integer("agreement_id").references("id").inTable("agreement").onUpdate('CASCADE').onDelete('CASCADE');
      table.string("agreed_at");


      table.integer("form_id").references("id").inTable("form").onUpdate('CASCADE').onDelete('CASCADE');

      table.integer("solution_form_id").references("id").inTable("form").onUpdate('CASCADE').onDelete('CASCADE');
      table.string("solved_at");


      table.integer("evaluation_form_id").references("id").inTable("form").onUpdate('CASCADE').onDelete('CASCADE');
      table.string("evaluated_at");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("solicitation");
}
