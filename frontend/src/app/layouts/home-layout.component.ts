import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-menu>
      <div style="padding: 10px" class="content">
        <mat-card>
          <router-outlet></router-outlet>
        </mat-card>
      </div>
    </app-menu>
  `,
  styles: []
})
export class HomeLayoutComponent {}