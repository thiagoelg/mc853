import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  static token = new BehaviorSubject<string>(null);

  constructor() {}
}
