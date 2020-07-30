import { Request, Response, Router } from "express";
import Answer from "../models/Answer";
import Solicitation from "../models/Solicitation";
import { AnswerData } from './../models/Answer';
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    let solicitations: Solicitation[];
    if (req.body.decoded.hasPermission("manage_solicitations")) {
      solicitations = await Solicitation.listAll();
    } else {
      const user_id = req.body.decoded?.user?.id;
      solicitations = await Solicitation.listSubmittedByUser(user_id);
    }

    return res.status(200).send(solicitations);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.get("/submittedBy/:user_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params["user_id"]);
    const current_user_id = req.body.decoded?.user?.id;

    if (current_user_id != user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission to view solicitation from others.")
    }

    const solicitations = await Solicitation.listSubmittedByUser(user_id);

    return res.status(200).send(solicitations);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/managedBy/:user_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params["user_id"]);

    if (!req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission to manage solicitations.")
    }

    const solicitations = await Solicitation.listManagedByUser(user_id);

    return res.status(200).send(solicitations);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/managedByMe", User.validateToken, async (req: Request, res: Response) => {
  try {
    const current_user_id = req.body.decoded?.user?.id;

    if (!req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations")
    }

    const solicitations = await Solicitation.listManagedByUser(current_user_id);

    return res.status(200).send(solicitations);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.post('/', User.validateToken, async (req: Request, res: Response) => {
  try {
    const form_id: number = req.body?.form_id;
    const submitted_by_user_id: number = req.body.decoded.user.id;

    const solicitation = await Solicitation.newSolicitation({ form_id, submitted_by_user_id });

    const answers = (req.body.answers as { form_question_id: number, answer: string | number }[]).map(answer => {
      return {
        form_question_id: answer.form_question_id,
        value: answer.answer.toString(),
        solicitation_id: solicitation.id,
        answered_by_user_id: submitted_by_user_id
      } as AnswerData;
    })

    await Answer.newAnswers(answers);

    return res.status(200).send(await Solicitation.get(solicitation.id));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.get("/managedByNone", User.validateToken, async (req: Request, res: Response) => {
  try {

    if (!req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations")
    }

    const solicitations = await Solicitation.listNotManaged();

    return res.status(200).send(solicitations);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


export default router;
