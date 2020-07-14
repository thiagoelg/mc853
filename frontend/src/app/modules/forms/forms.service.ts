import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormData, FormFull } from 'src/app/models/form';
import { ResponseType } from 'src/app/models/responseType';
import { Form } from './../../models/form';
import { Question } from './../../models/question';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) { }

  createForm(body: FormData): Observable<FormFull> {
    const url = 'forms';

    return this.http.post<FormFull>(url, body).pipe(take(1));
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
    const url = 'responseTypes';

    return this.http.get<ResponseType[]>(url).pipe(take(1));
  }

  fetchResponseTypesByBasicType(basicType: string): Observable<ResponseType[]> {
    const url = `responseTypes/${basicType}`;

    return this.http.get<ResponseType[]>(url).pipe(take(1));
  }

  fetchQuestions(): Observable<Question[]> {
    const url = 'questions';

    return this.http.get<Question[]>(url).pipe(take(1));
  }
}
