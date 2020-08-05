import { Request, Response, Router } from "express";
import FormQuestion from "../models/FormQuestion";
import User from "../models/User";
const router = Router({ mergeParams: true });

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id = Number(req.params["form_id"]);
    const forms = await FormQuestion.listQuestions(form_id);
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/:question_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id = Number(req.params["form_id"]);
    const question_id = Number(req.params["question_id"]);
    const forms = await FormQuestion.getQuestion(form_id, question_id);
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.post("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id = Number(req.params["form_id"]);
    const questions = await FormQuestion.listQuestions(form_id);
    if (questions?.length > 0) {
      return res.status(403).send("Can not modify forms. Please create a new form.")
    }

    const new_questions = await FormQuestion.setFormQuestions(form_id, req.body)

    return res.status(200).send(new_questions);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
