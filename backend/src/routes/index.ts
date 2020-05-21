import { Router } from "express";
import agreementsRoutes from "./agreements";
import authRoutes from "./auth";
import roleRoutes from "./roles";
import usersRoutes from "./users";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/agreements", agreementsRoutes);

export default router;
