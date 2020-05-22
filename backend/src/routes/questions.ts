import { Request, Response, Router } from "express";
import Question from "../models/Question";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const questions = await Question.list();
    return res.status(200).send(questions);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
