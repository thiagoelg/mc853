import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("form_question")
    .del()
    .then(() => {
      return knex("form")
        .del()
        .then(() => {
          return knex("question")
            .del()
            .then(() => {
              return knex("response_type")
                .del()
                .then(() => {
                  // Inserts seed entries
                  return knex("response_type")
                    .insert(
                      [
                        {
                          name: "Título",
                          min: 5,
                          max: 255,
                          basic_type: "text"
                        },
                        {
                          name: "Avaliação",
                          min: 1,
                          max: 5,
                          basic_type: "number"
                        },
                        {
                          name: "Texto Médio",
                          min: 1,
                          max: 1023,
                          basic_type: "text"
                        },
                        {
                          name: "Confirmação",
                          min: 0,
                          max: 1,
                          basic_type: "number"
                        },
                        {
                          name: "Data",
                          min: 0,
                          max: 0,
                          basic_type: "date"
                        },
                      ],
                      "id"
                    )
                    .then((responseTypes: number[]) => {
                      return knex("question")
                        .insert(
                          [
                            {
                              text: "Qual o seu nome?",
                              response_type_id: responseTypes[0]
                            },
                            {
                              text: "Avalie este aplicativo",
                              response_type_id: responseTypes[1]
                            },
                            {
                              text: "Me diga o que você fez hoje",
                              response_type_id: responseTypes[2]
                            },
                            {
                              text: "Você aceita isso?",
                              response_type_id: responseTypes[3]
                            },
                            {
                              text: "Até que dia você pode esperar?",
                              response_type_id: responseTypes[4]
                            },
                          ],
                          "id"
                        )
                        .then((questions: number[]) => {
                          return knex("form")
                            .insert(
                              [
                                {
                                  name: "Formulário Grande",
                                  is_template: true
                                },
                                {
                                  name: "Formulário pequeno",
                                  is_template: true
                                },
                                {
                                  name: "Formulário de satisfação",
                                  is_template: true
                                },
                              ],
                              "id"
                            )
                            .then((form_ids: number[]) => {
                              return knex("form_question").insert([
                                {
                                  form_id: form_ids[0],
                                  question_id: questions[0],
                                  order: 1
                                },
                                {
                                  form_id: form_ids[0],
                                  question_id: questions[1],
                                  order: 2
                                },
                                {
                                  form_id: form_ids[0],
                                  question_id: questions[2],
                                  order: 3
                                },
                                {
                                  form_id: form_ids[0],
                                  question_id: questions[3],
                                  order: 4
                                },
                                {
                                  form_id: form_ids[0],
                                  question_id: questions[4],
                                  order: 5
                                },
                                {
                                  form_id: form_ids[1],
                                  question_id: questions[2],
                                  order: 1
                                },
                                {
                                  form_id: form_ids[1],
                                  question_id: questions[4],
                                  order: 2
                                },
                                {
                                  form_id: form_ids[2],
                                  question_id: questions[2],
                                  order: 1
                                },
                              ]);
                            });
                        });
                    });
                });
            });
        });
    });
}
