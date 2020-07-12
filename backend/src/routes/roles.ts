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

router.get("/:role_id", User.validateToken, async (req: Request, res: Response) => {
  try {
    const role_id = Number(req.params["role_id"]);

    const roles = await Role.get(role_id);

    return res.status(200).send(roles);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get("/:role_id/users/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const role_id = Number(req.params["role_id"]);

    const users = await User.listUsersByRole(role_id);

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
