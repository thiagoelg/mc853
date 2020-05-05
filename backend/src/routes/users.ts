import User from '../models/User';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await User.transaction(async trx => {
      return await User.query(trx).insert(req.body);
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const query = User.query();
    if (req.body.orderBy) {
      const [field, direction] = req.body.orderBy.split(' ');
      query.orderBy(field, direction);
    } else {
      query.orderBy(req.body.orderBy || 'createdAt', 'desc');
    }
    query.debug();
    res.json(await query);
  } catch (error) {
    res.json(error);
  }
});

export default router;
