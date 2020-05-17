import User, { UserQuery } from '../models/User';
import { Router, Request, Response } from 'express';
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await User.newUser(req.body));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get('/', User.validateToken, async (req: Request, res: Response) => {
  try {
    const users = await User.listUsers(<UserQuery> <unknown> req.query);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
