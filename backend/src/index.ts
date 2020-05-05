import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json(error);
});

import users from './routes/users'
app.use('/api/users', users);

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
