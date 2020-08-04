import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { Form, FormFull } from './../../models/form';
import { ResponseType } from './../../models/responseType';
import { Solicitation, SolicitationForm } from './../../models/solicitation';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(private http: HttpClient) {}

  fetchForms(): Observable<Form[]> {
    const url = 'forms';

    return this.http.get<Form[]>(url).pipe(take(1));
  }

  fetchAllSolicitations(): Observable<Solicitation[]> {
    const url = 'solicitations';

    return this.http.get<Solicitation[]>(url).pipe(take(1));
  }

  fetchSolicitationsSubmittedBy(userId: number): Observable<Solicitation[]> {
    return this.fetchAllSolicitations().pipe(
      map((solicitations) =>
        solicitations.filter((solicitation) => solicitation.submitted_by_user_id == userId)
      )
    );
  }

  fetchSolicitation(id: number): Observable<Solicitation> {
    const url = `solicitations/${id}`;

    return this.http.get<Solicitation>(url).pipe(take(1));
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

  createSolicitation(body: SolicitationForm) {
    const url = `solicitations`;

    return this.http.post<Solicitation>(url, body).pipe(take(1));
  }
}
