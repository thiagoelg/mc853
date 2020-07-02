import { Router } from "express";
import agreementsRoutes from "./agreements";
import answersRoutes from "./answers";
import authRoutes from "./auth";
import formQuestionsRoutes from "./formQuestions";
import formsRoutes from "./forms";
import questionsRoutes from "./questions";
import responseTypesRoutes from "./responseTypes";
import roleRoutes from "./roles";
import solicitationsRoutes from "./solicitations";
import usersRoutes from "./users";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/agreements", agreementsRoutes);
router.use("/questions", questionsRoutes);
router.use("/forms", formsRoutes);
router.use("/forms/:form_id/questions", formQuestionsRoutes);
router.use("/responseTypes", responseTypesRoutes);
router.use("/solicitations", solicitationsRoutes);
router.use("/solicitations/:solicitation_id/answers", answersRoutes);

export default router;
