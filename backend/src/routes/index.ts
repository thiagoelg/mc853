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
import solicitationIdRoutes from "./solicitation_id";
import solutionRoutes from "./solution";
import usersRoutes from "./users";
import filesRoutes from "./files";

const router = Router();

router.use('/files', filesRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/agreements", agreementsRoutes);
router.use("/questions", questionsRoutes);
router.use("/forms", formsRoutes);
router.use("/forms/:form_id/questions", formQuestionsRoutes);
router.use("/response_types", responseTypesRoutes);
router.use("/solicitations", solicitationsRoutes);
router.use("/solicitations/:solicitation_id", solicitationIdRoutes);
router.use("/solicitations/:solicitation_id/solution", solutionRoutes);
router.use("/solicitations/:solicitation_id/answers", answersRoutes);

export default router;
