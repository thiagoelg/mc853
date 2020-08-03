import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(
    "role_permissions",
    (table: Knex.TableBuilder) => {
      table.integer("role_id").references("id").inTable("role").onUpdate('CASCADE').onDelete('CASCADE');
      table.integer("permission_id").references("id").inTable("permission").onUpdate('CASCADE').onDelete('CASCADE');
      table.primary(["role_id", "permission_id"]);
      table.boolean("status").defaultTo(true);
    }
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("role_permissions");
}
