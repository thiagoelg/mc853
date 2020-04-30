import { Router } from 'express';
const router = Router();

import Carro, {
  find,
  findOneAndUpdate,
  findOneAndDelete
} from '../models/Carro';

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
  find()
    .then(carros => {
      res.json(carros);
    })
    .catch(error => res.status(500).json(error));
});

// Cria um novo documento e salva no banco
router.post('/novo', (req, res) => {
  const novoCarro = new Carro({
    marca: req.body.marca,
    modelo: req.body.modelo
  });

  novoCarro
    .save()
    .then(carro => {
      res.json(carro);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Atualizando dados de um carro já existente
router.put('/editar/:id', (req, res) => {
  const novosDados = { marca: req.body.marca, modelo: req.body.modelo };

  findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(carro => {
      res.json(carro);
    })
    .catch(error => res.status(500).json(error));
});

// Deletando um carro do banco de dados
router.delete('/delete/:id', (req, res) => {
  findOneAndDelete({ _id: req.params.id })
    .then(carro => {
      res.json(carro);
    })
    .catch(error => res.status(500).json(error));
});

export default router;
