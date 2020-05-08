import User, { UserQuery } from '../models/User';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  try {
    res.json(await User.newUser(req.body));
  } catch (error) {
    res.json(error.toString());
  }
});

router.get('/', async (req, res) => {
  res.json(await User.listUsers(<UserQuery> <unknown> req.query));
});

export default router;
