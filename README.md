# MC853 - Responsive

O RESPONSIVE é a nossa implementação de um canal de comunicação institucional para o Desburocratize, uma iniciativa da Coordenadoria Geral da Universidade (CGU-UNICAMP) que busca “levantar, investigar, integrar e propor soluções criativas para as disfunções burocráticas que geram a ineficiência” na administração da universidade. O sistema foi concebido como uma central flexível e reaproveitável de submissão, gerenciamento e acompanhamento de solicitações, muito similar aos mecanismos de abertura e acompanhamento de tickets encontrado em ferramentas como JIRA e Zendesk.
O funcionamento básico do sistema consiste na abertura de solicitações usando formulários que podem ser criados arbitrariamente usando o criador embutido no RESPONSIVE. Estas solicitações são então atribuídas a atendentes que passam a usar o sistema como um canal de comunicação com o solicitante. Solicitações podem ser respondidas, re-atribuídas a novos atendentes, e idealmente fechadas ou marcadas como solucionadas.

A interação entre atendentes e solicitantes é mediada por gerentes e administradores que, além de distribuir solicitações entre os atendentes, também atuam na criação e manutenção dos diversos formulários que podem servir como template para diferentes tipos de solicitação. Juntos, atendentes, solicitantes, gerentes e administradores foram o conjunto básico de perfis de acesso da ferramenta. Este conceito fundamental norteou toda a arquitetura da implementação, pois toda feature, ação e possibilidade oferecida pelo RESPONSIVE precisa antes ser filtrada com base no perfil de acesso do usuário que acessa a ferramenta em determinado momento.

# Autores:

- Thiago Lugli (@thiagoelg)
- Fellipe Caetano (@fellipecaetano)
- Carlos Vieira (@carlosavieira)

# Desenvolvendo

- ## Backend

  Para facilitar o desenvolvimento do projeto em grupo utilizamos imagens conteinerizadas das dependências. Para isso utilizamos o Docker e o Docker-Compose, criando uma "receita" para subir o servidor. Essa receita sobe 3 containers diferentes, atrelando-os a mesma network.

  Esses containers são:

  - RESPONSIVE_BACKEND:
    - Imagem: Dockerfile local (com NodeJS 12, instala dependências npm, aguarda o banco estar disponível e roda migrações)
    - Portas: 9001:9001 (Externa:Interna)
  - RESPONSIVE_DB:
    - Imagem: PostgreSQL
    - Portas: 15432:5432 (Externa:Interna)
  - RESPONSIVE_PGADMIN:
    - Imagem: PgAdmin4
    - Portas: 16543:80 (Externa:Interna)

  Caso não tenha instalado, instale o NodeJS, Docker e o Docker-Compose localmente:

  - https://nodejs.org/en/download/
  - https://docs.docker.com/engine/install/
  - https://docs.docker.com/compose/install/

  Para subir um ambiente local, basta executar os seguintes comandos na pasta "backend":

  - `npm install`
  - `npm run docker:build` (somente na primeira vez que executar o projeto)
  - `npm run docker:start`
    Pronto, a aplicação backend estará de pé na porta 9001 (http://localhost:9001/api).

  Para parar o servidor basta executar:

  - `npm run docker:stop`

  Para destruir os containers e volumes, zerando toda a aplicação, execute:

  - `npm run docker:down`

  Para rodar as migrações (não obrigatório, elas são executadas toda vez que o servidor sobe):

  - `npm run docker:knex:migrations:run`

  Para rodar as importações de dados iniciais (seeds), execute:

  - `npm run docker:knex:seed:run`

- ## Frontend

  Para desenvolver no frontend bastar ter NodeJS e Npm instalado localmente, e, então instalar as dependências e iniciar o servidor local, através dos comandos a seguir na pasta "frontend":

  - `npm install`
  - `npm start`

  O app poderá ser acessado via http://localhost:4200.

# Arquitetura

- ## Backend

  Optamos por programar o backend em NodeJS, já que é uma ferramenta que todos os integrantes conhecem, e, para ajudar, utilizamos TypeScript, que permite uma escrita de código mais descritiva e contida.

  Nosso backend opera como um serviço e fornece uma API para os clientes, podendo ser inicializado em qualquer máquina rodando PostgreSQL e NodeJS, porém, para facilitar o desenvolvimento e deploys, desenvolvemos uma imagem para o Docker com todos os pré-requisitos.

  O código foi organizado separando as diferentes entidades do sistema, para isso adotamos a seguinte estrutura:

  - **migrations**: Arquivos que definem as tabelas do banco de dados, executados ao criar uma nova instância do backend.
  - **models**: Classes que representam as respectivas tabelas do banco. Esses models são responsáveis por executar as validações e aplicar as regras de negócio ao incluir, atualizar ou remover uma linha da tabela.
  - **routes**: Definições das rotas da API. Também separados por model, implementando os modelos de requisição (POST, GET, UPDATE) para cada entidade da aplicação, além de validar a autenticação do usuário e repassar o payload para tratativa nos models.
  - **seeds**: Conteúdo inicial de cada tabela, por exemplo, as permissões e o usuário admin.
  - **index.ts**: Arquivo de entrada da aplicação, que invoca todos os outros conforme necessário.

- ## Frontend

  A aplicação web foi desenvolvida em Angular 10, também utilizando Typescript, e, para acelerar o desenvolvimento, utilizamos uma biblioteca de UI e estilização chamada Material UI, desenvolvida pelo Google. Essa biblioteca forneceu uma grande quantidade de componentes prontos, garantindo a agilidade do desenvolvimento e um design padronizado e elegante.

  Dividimos a aplicação em módulos, sendo cada módulo responsável por uma "entidade" do projeto, por exemplo, temos um módulo responsável pelos formulários, que cuida tanto do serviço de consumo da API para obter os formulários existentes no backend, quanto das telas atreladas a eles (listagem, criação/edição, etc).
