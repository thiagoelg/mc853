import { Request, Response, Router } from "express";
import Question from "../models/Question";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const questions = await Question.list(req.query);
    return res.status(200).send(questions);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/:question_id", async (req: Request, res: Response) => {
  try {
    const question_id = Number(req.params["question_id"]);

    const question = await Question.get(question_id);

    return res.status(200).send(question);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.post("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage questions")
    }

    const text = req.body.text;
    const response_type_id = req.body.response_type_id;

    const question = await Question.newQuestion({ text, response_type_id });

    return res.status(200).send(question);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.delete("/:question_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const question_id = Number(req.params["question_id"]);


    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage questions")
    }

    await Question.delete(question_id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put("/:question_id/status", User.validateToken, async (req: Request, res: Response) => {
  try {
    const question_id = Number(req.params["question_id"]);
    const status = Boolean(req.body["status"]);
    return res.status(200).send(await Question.setStatus(question_id, status));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
