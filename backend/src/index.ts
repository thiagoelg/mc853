import express from 'express';
import Knex, { Config } from 'knex';
import knexConfig from './knexfile';
import { Model } from 'objection';
import bodyParser from 'body-parser';
import routes from './routes';

// This is temporary, just so we can get JSON output for errors.
require('./errorToString');

// Initialize knex.
const knex = Knex(knexConfig[process.env.NODE_ENV as 'production' | 'development'] as Config);

// Bind Models to knex instance.
Model.knex(knex);

const app = express();
app.use(bodyParser());

app.use('/api', routes);

const port = 9001;
app.listen(port, () => console.log(`Server ativo na porta ${port}`));
