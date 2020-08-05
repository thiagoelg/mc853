import { Request, Response, Router } from "express";
import SolicitatinoPost from "../models/SolicitationPost";
import User from "../models/User";
const router = Router();

router.post("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const author_id = req.body.decoded.user.id;
    const content = req.body.content;
    const solicitation_id = req.body.solicitation_id;

    return res.status(200).send(await SolicitatinoPost.new({ author_id, content, solicitation_id }));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/:solicitation_id", async (req: Request, res: Response) => {
  try {
    const solicitation_id = Number(req.params["solicitation_id"]);
    return res.status(200).send(await SolicitatinoPost.list(solicitation_id));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
