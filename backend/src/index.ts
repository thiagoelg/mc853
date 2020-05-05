import express from 'express';
import Knex from 'knex';
import knexConfig from './knexfile';
import { Model } from 'objection';
import routes from './routes';

// Initialize knex.
const knex = Knex(knexConfig.production);

// Bind Models to knex instance.
Model.knex(knex);

const app = express();

app.use('/api', routes);

const port = 9001;
app.listen(port, () => console.log(`Server ativo na porta ${port}`));
