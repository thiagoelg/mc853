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

Rode as migrações (??) com: `npx knex migrate:latest`

Aplique os dados iniciais, com: `npx knex seed:run`


## Monitorando logs

Para acompanhar os logs da api, execute: 

`docker-compose logs --follow  server` .
