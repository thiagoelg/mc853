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

router.get("/templates", User.validateToken, async (req: Request, res: Response) => {
  try {
    const agreements = await Agreement.listTemplates();
    return res.status(200).send(agreements);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
}
);

router.post("/", User.validateToken, async (req: Request, res: Response) => {
  try {
    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage forms and agreements")
    }

    const name = req.body.name;
    const content = req.body.content;
    const isTemplate: boolean = req.body.isTemplate ?? true;

    const agreement = await Agreement.newAgreement({ name, content, isTemplate });

    return res.status(200).send(agreement);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});



router.get("/:agreement_id", async (req: Request, res: Response) => {
  try {
    const agreement_id = Number(req.params["agreement_id"]);

    const agreement = await Agreement.get(agreement_id);

    return res.status(200).send(agreement);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.delete("/templates/:agreement_id/", User.validateToken, async (req: Request, res: Response) => {
  try {
    console.log("\n\n\n\nTrying to remove template =D\n\n\n")
    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage forms and agreements")
    }

    const agreement_id = Number(req.params["agreement_id"]);

    console.log("\n\n\n\nTrying to remove template =D\n\n\n")
    const agreement = await Agreement.disableTemplate(agreement_id);
    console.log("\n\n\n\nTrying to remove template =D\n\n\n")

    return res.status(200).send(agreement);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});


router.put("/templates/:agreement_id/", User.validateToken, async (req: Request, res: Response) => {
  try {

    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage forms and agreements")
    }

    const agreement_id = Number(req.params["agreement_id"]);

    const agreement = await Agreement.enableTemplate(agreement_id);

    return res.status(200).send(agreement);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

router.delete("/:agreement_id", User.validateToken, async (req: Request, res: Response) => {
  try {

    if (!req.body.decoded.hasPermission("manage_forms")) {
      return res.status(403).send("You do not have permission manage forms and agreements")
    }

    const agreement_id = Number(req.params["agreement_id"]);

    await Agreement.delete(agreement_id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.toString());
  }
});

export default router;
