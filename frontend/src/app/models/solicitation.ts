import { BaseModel } from '.';
import { Answer, AnswerForm } from './answer';
import { User } from './user';

export interface SolicitationForm {
    form_id: number;
    answers: AnswerForm[];
}


export interface Solicitation extends BaseModel {
    form_id: number;
    answers: Answer[];
    agreement_id: number;
    agreed_at: string;
    solution_form_id: number;
    solved_at: string;
    evaluated_at: string;
    evaluation_form_id: number;
    managed_by_user_id: number;
    managed_by_user: User;
    submitted_by_user_id: number;
    submitted_by_user: User;
}
