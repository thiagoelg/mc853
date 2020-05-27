import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { Form, FormFull } from './../../models/form';
import { ResponseType } from './../../models/responseType';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(private http: HttpClient) {}

  fetchForms(): Observable<Form[]> {
    const url = 'forms';

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as Form[])
    );
  }

  fetchQuestions(formId: number): Observable<FormQuestion[]> {
    const url = `forms/${formId}/questions`;

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as FormQuestion[])
    );
  }

  fetchResponseTypes(): Observable<ResponseType[]> {
    const url = 'responseTypes';

    return this.http.get(url).pipe(
      take(1),
      map((data) => data as ResponseType[])
    );
  }

  fetchFullForm(formId: number): Observable<FormFull> {
    return of(
      JSON.parse(
        `{
            "updated_at": null,
            "id": 1,
            "name": "Formulário Grande",
            "is_template": true,
            "created_at": null,
            "questions": [
                {
                    "updated_at": "",
                    "form_id": 1,
                    "question_id": 1,
                    "order": 1,
                    "required": true,
                    "question": {
                        "updated_at": null,
                        "id": 1,
                        "text": "Qual o seu nome?",
                        "created_at": null,
                        "response_type": {
                            "updated_at": null,
                            "id": 1,
                            "name": "Título",
                            "min": 5,
                            "max": 255,
                            "regex": "",
                            "basic_type": "text",
                            "created_at": null
                        }
                    }
                },
                {
                    "updated_at": "",
                    "form_id": 1,
                    "question_id": 2,
                    "order": 2,
                    "required": true,
                    "question": {
                        "updated_at": null,
                        "id": 2,
                        "text": "Avalie este aplicativo",
                        "created_at": null,
                        "response_type": {
                            "updated_at": null,
                            "id": 2,
                            "name": "Avaliação",
                            "min": 1,
                            "max": 5,
                            "regex": "",
                            "basic_type": "number",
                            "created_at": null
                        }
                    }
                },
                {
                    "updated_at": "",
                    "form_id": 1,
                    "question_id": 3,
                    "order": 3,
                    "required": true,
                    "question": {
                        "updated_at": null,
                        "id": 3,
                        "text": "Me diga o que você fez hoje",
                        "created_at": null,
                        "response_type": {
                            "updated_at": null,
                            "id": 3,
                            "name": "Texto Médio",
                            "min": 1,
                            "max": 1023,
                            "regex": "",
                            "basic_type": "text",
                            "created_at": null
                        }
                    }
                },
                {
                    "updated_at": "",
                    "form_id": 1,
                    "question_id": 4,
                    "order": 4,
                    "required": true,
                    "question": {
                        "updated_at": null,
                        "id": 4,
                        "text": "Você aceita isso?",
                        "created_at": null,
                        "response_type": {
                            "updated_at": null,
                            "id": 4,
                            "name": "Confirmação",
                            "min": 0,
                            "max": 1,
                            "regex": "",
                            "basic_type": "checkbox",
                            "created_at": null
                        }
                    }
                },
                {
                    "updated_at": "",
                    "form_id": 1,
                    "question_id": 5,
                    "order": 5,
                    "required": true,
                    "question": {
                        "updated_at": null,
                        "id": 5,
                        "text": "Até que dia você pode esperar?",
                        "created_at": null,
                        "response_type": {
                            "updated_at": null,
                            "id": 5,
                            "name": "Data",
                            "min": 0,
                            "max": 0,
                            "regex": "",
                            "basic_type": "date",
                            "created_at": null
                        }
                    }
                }
            ]
        }`
      )
    );
  }
}
