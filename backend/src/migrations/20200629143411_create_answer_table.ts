import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(
        "answer",
        (table: Knex.TableBuilder) => {
            table.increments("id").primary();
            table.integer("solicitation_id").references("id").inTable("solicitation");
            table.integer("form_question_id").references("id").inTable("form_question");

            table.string("value");

            table.integer("answered_by_user_id").references("id").inTable("user");
            table.string("created_at");
            table.string("updated_at");
        }
    );
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("answer");
}