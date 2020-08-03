import { Router, Request, Response } from 'express';
import User from '../models/User';
import multer from 'multer';
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router.post('/upload', async (req: Request, res: Response) => {
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


export default router;
