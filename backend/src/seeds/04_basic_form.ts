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
                          name: "Texto Curto",
                          min: 1,
                          max: 255,
                          basic_type: "text"
                        },
                        {
                          name: "Texto Médio",
                          min: 1,
                          max: 1000,
                          basic_type: "text"
                        },
                        {
                          name: "Texto Grande",
                          min: 1,
                          max: 2000,
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
                        {
                          name: "Avaliação",
                          min: 1,
                          max: 10,
                          basic_type: "number"
                        },
                      ],
                      "id"
                    )
                    .then((responseTypes: number[]) => {
                      return knex("question")
                        .insert(
                          [
                            {
                              text: "Sobre qual assunto você quer falar?",
                              response_type_id: responseTypes[1]
                            },
                            {
                              text: "Fale aqui",
                              description: "Descreva abaixo o conteúdo de sua sugestão. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da sugestão.",
                              response_type_id: responseTypes[3]
                            },
                            {
                              text: "Proposta de melhoria",
                              response_type_id: responseTypes[3]
                            },
                            {
                              text: "Regulamentação",
                              description: "Informe as legislações internas ou externas à Unicamp que regem o escopo da sugestão.",
                              response_type_id: responseTypes[2]
                            },
                            {
                              text: "Avalie seu atendimento",
                              description: "De 1 a 10, o que achou do nosso atendimento?",
                              response_type_id: responseTypes[6]
                            },
                            {
                              text: "Comentários ou sugestões",
                              description: "Deixe aqui algum comentário ou sugestão sobre nosso atendimento e como podemos melhorar.",
                              response_type_id: responseTypes[2]
                            }
                          ],
                          "id"
                        )
                        .then((questions: number[]) => {
                          return knex("form")
                            .insert(
                              [
                                {
                                  name: "Formulário Simplifica",
                                  description: "Ao utilizar algum serviço da universidade, podemos nos deparar com exigências que acabam por complicar o que esperávamos ser simples e rápido. A partir de agora, sempre que você se deparar com esta situação, basta enviar sua sugestão para desburocratizar este serviço por meio do Simplifica.",
                                  is_template: true
                                },
                                {
                                  name: "Pesquisa de satisfação",
                                  description: "Nos ajude a melhorar respondendo as perguntas abaixo, é rapidinho!",
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
                                  form_id: form_ids[1],
                                  question_id: questions[4],
                                  order: 1
                                },
                                {
                                  form_id: form_ids[1],
                                  question_id: questions[5],
                                  order: 2
                                }
                              ]);
                            });
                        });
                    });
                });
            });
        });
    });
}
