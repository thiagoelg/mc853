import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  text: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  static menu = {
    title: new BehaviorSubject<string>('Responsive'),
    menuTitle: new BehaviorSubject<string>('Menu'),
    items: new BehaviorSubject<MenuItem[]>([]),
    enable: new BehaviorSubject<boolean>(true),
  } as const;

  constructor() {}
}
