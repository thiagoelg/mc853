import { Request, Response, Router } from "express";
import Answer, { AnswerData } from "../models/Answer";
import FormQuestion from "../models/FormQuestion";
import Solicitation from "../models/Solicitation";
import User from "./../models/User";
const router = Router({ mergeParams: true });


router.put("/form/:form_id", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const form_id = Number(req.params["form_id"]);

        if (!req.body.decoded.hasPermission("manage_solicitations")) {
            return res.status(403).send("You do not have permission manage solicitations")
        }

        const solicitation = await Solicitation.changeSolutionForm({ solicitation_id, form_id });

        return res.status(200).send(solicitation);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.post("/", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const current_user_id = Number(req.body.decoded.user.id);

        if (!req.body.decoded.hasPermission("manage_solicitations")) {
            return res.status(403).send("You do not have permission manage solicitations")
        }

        const answers = (req.body.answers as { form_question_id: number, answer: string | number }[]).map(answer => {
            return {
                form_question_id: answer.form_question_id,
                value: answer.answer.toString(),
                solicitation_id: solicitation.id,
                answered_by_user_id: current_user_id
            } as AnswerData;
        })
        await Answer.newAnswers(answers);

        const solicitation = await Solicitation.setSolved({ solicitation_id });

        return res.status(200).send(await Solicitation.get(solicitation.id));

    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.get("/", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const solicitation = await Solicitation.get(solicitation_id) as Solicitation;

        if (req.body.decoded.user.id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
            return res.status(403).send("You do not have permission manage solicitations and this one was not created by you.")
        }

        const answers = await Answer.list(solicitation_id)

        const solution = answers.filter(a => ((a as any).form_question as FormQuestion).form_id == solicitation.solution_form_id);

        return res.status(200).send(solution);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.post("/not_solved", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const solicitation = await Solicitation.get(solicitation_id) as Solicitation;

        if (req.body.decoded.user.id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
            return res.status(403).send("You do not have permission manage solicitations and this one was not created by you.")
        }

        const updated = await Solicitation.setNotSolved({ solicitation_id });

        return res.status(200).send(updated);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.post("/solved", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const solicitation = await Solicitation.get(solicitation_id) as Solicitation;

        if (req.body.decoded.user.id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
            return res.status(403).send("You do not have permission manage solicitations and this one was not created by you.")
        }

        const updated = await Solicitation.setSolved({ solicitation_id });

        return res.status(200).send(updated);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});




export default router;
