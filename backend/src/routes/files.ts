import { Router, Request, Response } from 'express';
import User from '../models/User';
import multer from 'multer';
import File from '../models/File';
const router = Router();

const upload = multer({ dest: './public/data/uploads/' });

router.post('/upload', [User.validateToken, upload.single('file')], async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await File.newFile(req.file));
  } catch (error) {
    return res.status(400).send(error.toString());
  }
});

router.get('/:file_id/:file_name', async (req: Request, res: Response) => {
  try {
    const file_id = Number(req.params["file_id"]);
    const file = await File.get(file_id); 
    return res.status(200).contentType(file.mime).send(file.value);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
});

export default router;
