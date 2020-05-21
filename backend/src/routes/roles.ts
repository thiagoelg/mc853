import { Request, Response, Router } from "express";
import Role from "../models/Role";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const roles = await Role.list();
    return res.status(200).send(roles);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
