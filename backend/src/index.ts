import bodyParser from "body-parser";
import DotEnv from "dotenv-safe";
import express from "express";
import bearerToken from "express-bearer-token";
import Knex from "knex";
import { Model } from "objection";
import * as knexConfig from "./knexfile";
import routes from "./routes";

DotEnv.config();

// This is temporary, just so we can get JSON output for errors.
require("./errorToString");

// Initialize knex.
const knex =
  process.env.NODE_ENV === "production"
    ? Knex(knexConfig.production)
    : Knex(knexConfig.development);

// Bind Models to knex instance.
Model.knex(knex);

const app = express();
app.use(bodyParser());
app.use(bearerToken());

app.use("/api", routes);

const port = 9001;
app.listen(port, () => console.log(`Server ativo na porta ${port}`));
