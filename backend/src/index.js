const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// Adicionando arquivo de rota no endpoint /carros
const carros = require('./routes/carro');

app.use('/api/carros', carros);

mongoose
  .connect('mongodb://db:27017/responsive', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(9001, () => console.log('Server ativo na porta 9000'));