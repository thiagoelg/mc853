import { Router } from "express";
import agreementsRoutes from "./agreements";
import authRoutes from "./auth";
import formsRoutes from "./forms";
import questionsRoutes from "./questions";
import responseTypesRoutes from "./responseTypes";
import roleRoutes from "./roles";
import usersRoutes from "./users";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/agreements", agreementsRoutes);
router.use("/questions", questionsRoutes);
router.use("/forms", formsRoutes);
router.use("/responseTypes", responseTypesRoutes);

export default router;
