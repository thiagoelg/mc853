import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { FormFull } from './../../models/form';
import { SolicitationPost } from './../../models/solicitationPost';
import { ResponseType } from './../../models/responseType';
import { Solicitation, SolicitationForm } from './../../models/solicitation';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchAllSolicitations(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>('solicitations').pipe(take(1));
  }

  fetchUnassignedSolicitations(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>('solicitations/managedByNone').pipe(take(1));
  }

  fetchSolicitationsManagedByUser(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>('solicitations/managedByMe').pipe(take(1));
  }

  fetchSolicitationsSubmittedByUser(): Observable<Solicitation[]> {
    return this.http
      .get<Solicitation[]>('solicitations/submittedByMe')
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

  assignToSelf(id: number): Observable<Solicitation> {
    const url = `solicitations/${id}/managedByMe`;

    return this.http.put<Solicitation>(url, {}).pipe(take(1));
  }

  assignToUser(solicitationId: number, userId: number): Observable<Solicitation> {
    const url = `solicitations/${solicitationId}/managedBy/${userId}`;

    return this.http.put<Solicitation>(url, {}).pipe(take(1));
  }

  newPost(body: any): Observable<any> {
    const url = 'solicitation_post';
    return this.http.post<any>(url, body).pipe(take(1));
  }

  listPosts(solicitationId: number) {
    const url = `solicitation_post/${solicitationId}`;
    return this.http.get<SolicitationPost[]>(url).pipe(take(1));
  }
}
