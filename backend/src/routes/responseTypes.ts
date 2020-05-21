import { Request, Response, Router } from "express";
import ResponseType from "../models/ResponseType";
import User from "./../models/User";
const router = Router();

router.get("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    const response_types = await ResponseType.list();
    return res.status(200).send(response_types);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.get(
  "/:type",
  User.validateToken,
  async (req: Request, res: Response) => {
    try {
      const type = req.params["type"];
      const response_types = await ResponseType.listByBasicType(type);
      return res.status(200).send(response_types);
    } catch (error) {
      return res.status(500).send(error.toString());
    }
  }
);

export default router;
