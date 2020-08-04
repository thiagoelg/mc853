import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FormData, FormFull } from 'src/app/models/form';
import { ResponseType, ResponseTypeData } from 'src/app/models/responseType';
import { Form } from './../../models/form';
import { Question, QuestionData } from './../../models/question';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) { }

  createForm(body: FormData): Observable<FormFull> {
    const url = 'forms';

    return this.http.post<FormFull>(url, body).pipe(take(1));
  }

  createQuestion(body: QuestionData): Observable<Question> {
    const url = 'questions';

    return this.http.post<Question>(url, body).pipe(take(1));
  }

  createResponseType(body: ResponseTypeData): Observable<ResponseType> {
    const url = 'response_types';

    return this.http.post<ResponseType>(url, body).pipe(take(1));
  }

  toggleStatusResponseType(response_type_id: number, status: boolean) {
    const url = `response_types/${response_type_id}/status`;
    return this.http.put<ResponseType>(url, { status }).pipe(take(1));
  }

  toggleStatusQuestion(question_id: number, status: boolean) {
    const url = `questions/${question_id}/status`;
    return this.http.put<Question>(url, { status }).pipe(take(1));
  }

  toggleStatusForm(form_id: number, status: boolean) {
    const url = `forms/${form_id}/status`;
    return this.http.put<Form>(url, { status }).pipe(take(1));
  }

  fetchForm(id: number): Observable<FormFull> {
    const url = `forms/${id}`;

    return this.http.get<FormFull>(url).pipe(take(1));
  }

  fetchForms(): Observable<Form[]> {
    const url = 'forms';

    return this.http.get<Form[]>(url).pipe(take(1));
  }

  fetchResponseTypes(): Observable<ResponseType[]> {
    const url = 'response_types';

    return this.http.get<ResponseType[]>(url).pipe(take(1));
  }

  fetchResponseTypesByBasicType(basicType: string): Observable<ResponseType[]> {
    const url = `response_types/${basicType}`;

    return this.http.get<ResponseType[]>(url).pipe(take(1));
  }

  fetchQuestions(): Observable<Question[]> {
    const url = 'questions';

    return this.http.get<Question[]>(url).pipe(take(1));
  }
}
