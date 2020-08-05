import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { Form, FormFull } from './../../models/form';
import { ResponseType } from './../../models/responseType';
import { Solicitation, SolicitationForm } from './../../models/solicitation';
import { AuthService } from 'src/app/security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchSolicitations(): Observable<Solicitation[]> {
    const url = 'solicitations';

    return this.http
      .get<Solicitation[]>(url)
      .pipe(take(1))
      .pipe(
        map((solicitations) =>
          solicitations.map((solicitation) => {
            solicitation.submitted_by_user = (() => {
              if (solicitation.submitted_by_user) {
                return solicitation.submitted_by_user;
              }

              if (solicitation.submitted_by_user_id === this.authService.user.id) {
                return this.authService.user;
              }

              return undefined;
            })();

            return solicitation;
          })
        )
      );
  }

  fetchUnassignedSolicitations(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>("solicitations/managedByNone").pipe(take(1));
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
