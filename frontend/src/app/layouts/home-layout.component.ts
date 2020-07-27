import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-menu>
      <div style="padding: 10px">
        <router-outlet></router-outlet>
      </div>
    </app-menu>
  `,
  styles: []
})
export class HomeLayoutComponent {}