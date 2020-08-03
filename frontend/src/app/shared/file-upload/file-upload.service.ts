import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('files/upload', formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'ignore-content-type': 'ignore-content-type'
      }
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress ) {
        const progress = Math.round((100 * event.loaded) / event.total);
        console.log(progress);
      }

      if (event.type === HttpEventType.Response ) {
        console.log(event.body);
      }
    })
  }
}
