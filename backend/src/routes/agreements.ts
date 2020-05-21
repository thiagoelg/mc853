import { Request, Response, Router } from "express";
import Agreement from "../models/Agreement";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const agreements = await Agreement.list();
    return res.status(200).send(agreements);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get(
  "/templates",
  User.validateToken,
  async (req: Request, res: Response) => {
    try {
      const agreements = await Agreement.listTemplates();
      return res.status(200).send(agreements);
    } catch (error) {
      return res.status(500).send(error.toString());
    }
  }
);

export default router;
