import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("response_type")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("response_type").insert([
        { name: "Título", min: 5, max: 255, basic_type: "text" },
        { name: "Avaliação", min: 1, max: 5, basic_type: "number" },
        { name: "Texto Médio", min: 1, max: 1023, basic_type: "text" },
        { name: "Confirmação", min: 0, max: 1, basic_type: "number" },
        { name: "Data", min: 0, max: 0, basic_type: "date" },
      ]);
    });
}
