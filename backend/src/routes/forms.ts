import { Request, Response, Router } from "express";
import Form from "../models/Form";
import FormQuestion from "./../models/FormQuestion";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const forms = await Form.list();
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get(
  "/:id/questions",
  User.validateToken,
  async (req: Request, res: Response) => {
    try {
      const form_id = Number(req.params["id"]);
      const forms = await FormQuestion.listQuestions(form_id);
      return res.status(200).send(forms);
    } catch (error) {
      return res.status(500).send(error.toString());
    }
  }
);

router.get(
  "/:form_id/questions/:question_id",
  User.validateToken,
  async (req: Request, res: Response) => {
    try {
      const form_id = Number(req.params["form_id"]);
      const question_id = Number(req.params["question_id"]);
      const forms = await FormQuestion.getQuestion(form_id, question_id);
      return res.status(200).send(forms);
    } catch (error) {
      return res.status(500).send(error.toString());
    }
  }
);

export default router;
