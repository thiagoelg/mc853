import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

// Adicionando arquivo de rota no endpoint /carros
import carros from './routes/carro';

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

const port = 9001;
app.listen(port, () => console.log(`Server ativo na porta ${port}`));
