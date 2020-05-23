import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ResponseType } from 'src/app/models/responseType';
import { Question } from './../../models/question';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  fetchResponseTypes(): Observable<ResponseType[]> {
    const url = 'responseTypes';

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as ResponseType[])
    );
  }

  fetchResponseTypesByBasicType(basicType: string): Observable<ResponseType[]> {
    const url = `responseTypes/${basicType}`;

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as ResponseType[])
    );
  }

  fetchQuestions(): Observable<Question[]> {
    const url = 'questions';

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as Question[])
    );
  }
}
