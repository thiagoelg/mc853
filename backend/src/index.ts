import bodyParser from "body-parser";
import cors from "cors";
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

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

const app = express();
app.use(bodyParser());
app.use(bearerToken());
app.use(cors(options));

app.use("/api", routes);

app.options("*", cors(options));

const port = 9001;
app.listen(port, () => console.log(`Server ativo na porta ${port}`));
