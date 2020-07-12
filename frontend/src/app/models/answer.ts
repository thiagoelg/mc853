import { BaseModel } from '.';
import { User } from './user';

export interface AnswerForm {
    form_question_id: number;
    answer: string | number;
}


export interface Answer extends BaseModel {
    solicitation_id: number;
    form_question_id: number;

    value: string;

    answered_by_user_id: number;
    answered_by_user?: User;
}
