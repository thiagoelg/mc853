import { Request, Response, Router } from 'express';
import User, { UserQuery } from '../models/User';
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await User.newUser(req.body));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get('/me', User.validateToken, async (req: Request, res: Response) => {
  try {
    const { user } = req.body.decoded;
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(401);
    }
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get('/', User.validateToken, async (req: Request, res: Response) => {
  try {
    const users = await User.listUsers(<UserQuery><unknown>req.query);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get('/:user_id', User.validateToken, async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params["user_id"]);

    const user = await User.get(user_id);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put('/:user_id/role/:role_id', User.validateToken, async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params["user_id"]);
    const role_id = Number(req.params["role_id"]);

    const user = await User.changeRoleId({ user_id, role_id });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
