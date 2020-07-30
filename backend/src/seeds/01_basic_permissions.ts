import * as Knex from "knex";
import Permission from "../models/Permission";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("role_permissions")
    .del()
    .then(() => {
      return knex("permission")
        .del()
        .then(() => {
          // Inserts seed entries
          return knex("permission")
            .insert(
              Object.keys(Permission.shortNames).map(key => (
                { "name": Permission.names[key], "short_name": Permission.shortNames[key] }
              )),
              ["id", "short_name"]
            )
            .then((permissions: { id: number; short_name: string }[]) => {
              knex("role")
                .del()
                .then(() => Promise.all([
                  knex("role")
                    .insert({ name: "Administrador", short_name: "admin" }, "id")
                    .then(([role_id]) => {
                      const role_permissions = permissions.map((perm) => {
                        return { role_id, permission_id: perm.id };
                      });

                      return knex("role_permissions").insert(role_permissions);
                    }),
                  knex("role")
                    .insert({ name: "Gerente", short_name: "manager" }, "id")
                    .then(([role_id]) => {
                      const my_permissions = permissions.filter((perm) =>
                        [
                          Permission.shortNames.ASSIGN_ROLES,
                          Permission.shortNames.MANAGE_USERS,
                          Permission.shortNames.MANAGE_FORMS,
                          Permission.shortNames.MANAGE_FORM_FIELDS,
                          Permission.shortNames.MANAGE_SOLICITATIONS,
                          Permission.shortNames.ANSWER_SOLICITATION,
                        ].includes(perm.short_name)
                      );

                      const role_permissions = my_permissions.map((perm) => {
                        return { role_id, permission_id: perm.id };
                      });

                      return knex("role_permissions").insert(role_permissions);
                    }),
                  knex("role")
                    .insert({ name: "Atendente", short_name: "worker" }, "id")
                    .then(([role_id]) => {
                      const my_permissions = permissions.filter((perm) =>
                        [
                          Permission.shortNames.MANAGE_FORMS,
                          Permission.shortNames.MANAGE_FORM_FIELDS,
                          Permission.shortNames.MANAGE_SOLICITATIONS,
                          Permission.shortNames.ANSWER_SOLICITATION,
                        ].includes(perm.short_name)
                      );

                      const role_permissions = my_permissions.map((perm) => {
                        return { role_id, permission_id: perm.id };
                      });

                      return knex("role_permissions").insert(role_permissions);
                    }),
                  knex("role")
                    .insert(
                      { name: "Solicitante", short_name: "requester" },
                      "id"
                    )
                    .then(([role_id]) => {
                      const my_permissions = permissions.filter((perm) =>
                        [
                          Permission.shortNames.CREATE_SOLICITATION,
                          Permission.shortNames.ANSWER_SOLICITATION,
                          Permission.shortNames.REOPEN_SOLICITATION,
                          Permission.shortNames.ANSWER_SATISFACTION_SURVEY,
                        ].includes(perm.short_name)
                      );

                      const role_permissions = my_permissions.map((perm) => {
                        return { role_id, permission_id: perm.id };
                      });

                      return knex("role_permissions").insert(role_permissions);
                    }),
                  ]))
          });
        });
    });
}
