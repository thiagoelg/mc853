import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { Form, FormFull } from './../../models/form';
import { ResponseType } from './../../models/responseType';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(private http: HttpClient) { }

  fetchForms(): Observable<Form[]> {
    const url = 'forms';

    return this.http.get<Form[]>(url).pipe(take(1));
  }

  fetchQuestions(formId: number): Observable<FormQuestion[]> {
    const url = `forms/${formId}/questions`;

    return this.http.get<FormQuestion[]>(url).pipe(take(1));
  }

  fetchResponseTypes(): Observable<ResponseType[]> {
    const url = 'responseTypes';

    return this.http.get<ResponseType[]>(url).pipe(take(1));
  }

  fetchFullForm(formId: number): Observable<FormFull> {
    const url = `forms/${formId}`;

    return this.http.get<FormFull>(url).pipe(take(1));
  }
}
