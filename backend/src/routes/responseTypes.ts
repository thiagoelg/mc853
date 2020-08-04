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

router.get("/:type", User.validateToken, async (req: Request, res: Response) => {
  try {
    const type = req.params["type"];
    const response_types = await ResponseType.listByBasicType(type);
    return res.status(200).send(response_types);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.post("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await ResponseType.newResponseType({
      name: req.body.name,
      max: req.body.max || 0,
      min: req.body.min,
      basic_type: req.body.basic_type,
      regex: req.body.regex || ""
    }));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.put("/:response_type_id/status", User.validateToken, async (req: Request, res: Response) => {
  try {
    const response_type_id = Number(req.params["response_type_id"]);
    const status = Boolean(req.body["status"]);
    return res.status(200).send(await ResponseType.setStatus(response_type_id, status));
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
