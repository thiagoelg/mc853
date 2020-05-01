import User from '../models/User';
import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser.save().then(user => res.json(user));
});

router.get('/', (_, res) => {
  User.find().then(users => res.json(users));
});
