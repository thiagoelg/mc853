import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File as FileModel } from 'src/app/models/file';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<FileModel>  {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileModel>('files/upload', formData, {
      headers: {
        'ignore-content-type': 'ignore-content-type'
      }
    });
  }
}
