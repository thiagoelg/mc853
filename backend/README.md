# Dicas

## Executar backend

Na pasta **/backend**, faça:

`docker-compose up -d`

## Banco de dados

### Acessar usando o pgAdmin

Para acessar o banco externamente, utilize o pgAdmin:

- Acesse [http://localhost:16543/] (espere o servidor inicializar)
- Para login, utilize: usuário `pgadmin` e senha `pgadmin`
- Adicione um conexão de servidor com: host `db`, porta `5432`, usuario `pgadmin`, senha `pgadmin`
- Para visualizar os dados, vá na conexão criada e em: Databases -> responsive -> Schemas -> public -> Tables
- Para inspecionar as tabelas você pode fazer: Botão direito -> View/edit data -> All Rows

### Adicionar dados iniciais ao banco

É interessante notar que inicialmente o banco de dados fica vazio e para inicializá-lo você precisa aplicar os seeds do knex.

Para isso, primeiro é necessário executar alguns comandos no terminal do container. Para isso, faça:

`docker exec -ti RESPONSIVE_BACKEND sh`

Aplique os dados iniciais, com: `npm run knex:seed:run`

### Knex

Ao fazer a modificação de algum modelo, faça `npm run knex:migrate:make NOME_DA_MIGRATION` e preencha o arquivo criado.

Para aplicar as mudanças, execute `npm run knex:migrate:latest`

Para criar uma nova seed, faça: `npm run knex:seed:make NUMERO_E_NOME_DA_SEED` e preencha o arquivo criado.

Uma ordem boa pra limpar e testar o que você fez é

```bash
    npm run knex:migrate:rollback
    npm run knex:migrate:latest
    npm run knex:seed:run
```

Links para referência:

https://devhints.io/knex

http://knexjs.org

https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

### Objection

https://vincit.github.io/objection.js/guide/relations.html#examples

## Monitorando logs

Para acompanhar os logs da api, execute:

`docker-compose logs --follow server` .
