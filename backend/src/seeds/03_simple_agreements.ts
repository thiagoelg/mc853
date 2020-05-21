import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("agreement")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("agreement").insert([
        {
          name: "Solicitação simples",
          content: "Tempo para entrega: 1 dia",
          isTemplate: true,
        },
        {
          name: "Solicitação elaborada",
          content: "Tempo para entrega: 3 dias úteis",
          isTemplate: true,
        },
        {
          name: "Tempo indeterminado",
          content:
            "Dependerá da disponibilidade de alguma pessoa do setor de compras.",
          isTemplate: true,
        },
        {
          name: "Solicitação complicada",
          content:
            "Tempo para entrega: 1 mês\nNão é garantido que o problema será resolvido devido à atual situação global",
          isTemplate: true,
        },
        {
          name: "Pro chefe",
          content: "Tempo para entrega: pra ontem kkkkk",
          isTemplate: false,
        },
      ]);
    });
}
