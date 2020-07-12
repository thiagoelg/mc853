import { Request, Response, Router } from "express";
import Answer, { AnswerData } from "../models/Answer";
import User from "../models/User";
const router = Router({ mergeParams: true });

router.get(
    "/",
    User.validateToken,
    async (req: Request, res: Response) => {
        try {
            const solicitation_id = Number(req.params["solicitation_id"]);
            const answers = await Answer.list(solicitation_id);
            return res.status(200).send(answers);
        } catch (error) {
            return res.status(500).send(error.toString());
        }
    }
);

router.get(
    "/:form_question_id",
    User.validateToken,
    async (req: Request, res: Response) => {
        try {
            const solicitation_id = Number(req.params["solicitation_id"]);
            const form_question_id = Number(req.params["form_question_id"]);

            const answer = await Answer.forFormQuestion({ solicitation_id, form_question_id });
            return res.status(200).send(answer);
        } catch (error) {
            return res.status(500).send(error.toString());
        }
    }
);

router.post(
    "/:form_question_id",
    User.validateToken,
    async (req: Request, res: Response) => {
        try {
            const solicitation_id = Number(req.params["solicitation_id"]);
            const form_question_id = Number(req.params["form_question_id"]);
            const old_answer = await Answer.forFormQuestion({ solicitation_id, form_question_id });

            if (old_answer?.id > 0) {
                return res.status(403).send("Answer already present. Please use a PUT request.")
            }

            const data = { value: req.body?.value, form_question_id, solicitation_id } as AnswerData;

            const answer = await Answer.newAnswer(data)

            return res.status(200).send(answer);
        } catch (error) {
            return res.status(500).send(error.toString());
        }
    }
);

export default router;
