import * as Knex from "knex";

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
              [
                {
                  name: "Gerenciar perfis de acesso",
                  short_name: "manage_roles",
                },
                {
                  name: "Atribuir perfis de acesso",
                  short_name: "assign_roles",
                },
                { name: "Gerenciar usuários", short_name: "manage_users" },
                { name: "Gerenciar formulários", short_name: "manage_forms" },
                {
                  name: "Gerenciar campos de formulários",
                  short_name: "manage_form_fields",
                },
                {
                  name: "Gerenciar tipos de campo de formulários",
                  short_name: "manage_form_field_types",
                },
                {
                  name: "Gerenciar solicitações",
                  short_name: "manage_solicitations",
                },
                {
                  name: "Responder solicitações",
                  short_name: "answer_solicitation",
                },
                {
                  name: "Criar solicitações",
                  short_name: "create_solicitation",
                },
                {
                  name: "Solicitar reabertura de solicitações",
                  short_name: "reopen_solicitation",
                },
                {
                  name: "Avaliar atendimento",
                  short_name: "answer_satisfaction_survey",
                },
              ],
              ["id", "short_name"]
            )
            .then((permissions: { id: number; short_name: string }[]) => {
              return Promise.all([
                knex("role")
                  .insert({ name: "Administrador", short_name: "admin" }, "id")
                  .then(([role_id]) => {
                    const role_permissions = permissions.map((perm) => {
                      return { role_id, permission_id: perm.id };
                    });

                    return knex("role_permissions").insert(role_permissions);
                  }),
                knex("role")
                  .insert({ name: "Atendente", short_name: "worker" }, "id")
                  .then(([role_id]) => {
                    const my_permissions = permissions.filter((perm) =>
                      [
                        "manage_forms",
                        "manage_form_fields",
                        "manage_solicitations",
                        "answer_solicitation",
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
                        "create_solicitation",
                        "reopen_solicitation",
                        "answer_satisfaction_survey",
                      ].includes(perm.short_name)
                    );

                    const role_permissions = my_permissions.map((perm) => {
                      return { role_id, permission_id: perm.id };
                    });

                    return knex("role_permissions").insert(role_permissions);
                  }),
              ]);
            });
        });
    });
}
