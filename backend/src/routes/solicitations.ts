import { Request, Response, Router } from "express";
import Solicitation from "../models/Solicitation";
import { SolicitationData } from './../models/Solicitation';
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitations = await Solicitation.listAll();
        return res.status(200).send(solicitations);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.get("/:solicitation_id", User.validateToken, async (req: Request, res: Response) => {
    try {
        const solicitation_id = Number(req.params["solicitation_id"]);
        const solicitation = await Solicitation.get(solicitation_id);
        return res.status(200).send(solicitation);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.post('/', User.validateToken, async (req: Request, res: Response) => {
    try {

        const solicitation = { form_id: req.body?.form_id, submitted_by_user_id: 1 } as SolicitationData;

        return res.status(200).send(await Solicitation.newSolicitation(solicitation));
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

export default router;
