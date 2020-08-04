import { Request, Response, Router } from "express";
import Solicitation from "../models/Solicitation";
import User from "./../models/User";
const router = Router({ mergeParams: true });


router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const solicitation = await Solicitation.get(solicitation_id) as Solicitation;
    const user_id: number = Number(req.body.decoded.user.id);

    if (user_id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations and this one was not created by you.")
    }

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.delete("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const solicitation = await Solicitation.get(solicitation_id) as Solicitation;
    const user_id: number = Number(req.body.decoded.user.id);

    if (user_id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations and this one was not created by you.")
    }

    await Solicitation.delete(solicitation_id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.put("/managedBy/:user_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const user_id = Number(req.params["user_id"]);

    if (!req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations")
    }

    const solicitation = await Solicitation.changeManaged({ solicitation_id, user_id });

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put("/agreement/:agreement_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const agreement_id = Number(req.params["agreement_id"]);

    if (!req.body.decoded.hasPermission("manage_solicitations")) {
      return res.status(403).send("You do not have permission manage solicitations")
    }

    const solicitation = await Solicitation.changeAgreement({ solicitation_id, agreement_id });

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.post("/agreement/:agreement_id/agree", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const agreement_id = Number(req.params["agreement_id"]);

    const solicitation = await Solicitation.get(solicitation_id) as Solicitation;

    if (req.body.decoded.user.id != solicitation.submitted_by_user_id) {
      return res.status(403).send("You can not agree in a submission you did not created.")
    }

    if (agreement_id != solicitation.agreement_id) {
      return res.status(403).send("Wrong agreement_id for this solicitation. Maybe agreement_id updated this solicitation or is not set.")
    }

    const updated = await Solicitation.agree({ solicitation_id });

    return res.status(200).send(updated);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
