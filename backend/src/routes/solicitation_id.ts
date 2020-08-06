import { Request, Response, Router } from "express";
import Solicitation from "../models/Solicitation";
import User from "./../models/User";
const router = Router({ mergeParams: true });

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const solicitation = (await Solicitation.get(solicitation_id)) as Solicitation;

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.delete("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const solicitation = (await Solicitation.get(solicitation_id)) as Solicitation;
    const user_id: number = Number(req.body.decoded.user.id);

    if (user_id != solicitation.submitted_by_user_id && !req.body.decoded.hasPermission("manage_solicitations")) {
      return res
        .status(403)
        .send("You do not have permission manage solicitations and this one was not created by you.");
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

    const solicitation = await Solicitation.changeManaged({ solicitation_id, user_id });

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put("/managedByMe", User.validateToken, async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    const user_id = Number(req.body.decoded.user.id);

    const solicitation = await Solicitation.changeManaged({ solicitation_id, user_id });

    return res.status(200).send(solicitation);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
