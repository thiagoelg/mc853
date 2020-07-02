import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(
        "solicitation",
        (table: Knex.TableBuilder) => {
            table.increments("id").primary();
            table.integer("submitted_by_user_id").references("id").inTable("user");
            table.integer("managed_by_user_id").references("id").inTable("user");

            table.integer("agreement_id").references("id").inTable("agreement");
            table.string("agreed_at");


            table.integer("form_id").references("id").inTable("form");

            table.integer("solution_form_id").references("id").inTable("form");
            table.string("solved_at");


            table.integer("evaluation_form_id").references("id").inTable("form");
            table.string("evaluated_at");

            table.string("created_at");
            table.string("updated_at");
        }
    );
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("solicitation");
}
