import { Router } from "express";
import authRoutes from "./auth";
import roleRoutes from "./roles";
import usersRoutes from "./users";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);

export default router;
