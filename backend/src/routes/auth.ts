import { Router, Request, Response } from 'express';
import User from '../models/User';
const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const token = await User.authenticate(req.body.email, req.body.password);
    if (token) {
      return res.status(200).json(token);
    }
    return res.status(401).send('Incorrect password');
  } catch (error) {
    return res.status(401).send(error.toString());
  }
});

router.post('/reauth', async (req: Request, res: Response) => {
  return res.json();
});

router.post('/logout', async (req: Request, res: Response) => {
  return res.status(200).send({ token: false });
});

export default router;
