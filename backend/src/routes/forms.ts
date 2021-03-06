import { Request, Response, Router } from "express";
import Form from "../models/Form";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const forms = await Form.list(req.query);
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/:form_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id = Number(req.params["form_id"]);
    const form = await Form.get(form_id);
    return res.status(200).send(form);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.post('/', User.validateToken, async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await Form.newForm(req.body));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put("/:form_id/status", User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id = Number(req.params["form_id"]);
    const status = Boolean(req.body["status"]);
    return res.status(200).send(await Form.setStatus(form_id, status));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
