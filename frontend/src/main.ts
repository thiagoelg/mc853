import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

Date.prototype.toString = function() {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  return `${pad(this.getDate())}/${pad(this.getMonth())}/${pad(this.getFullYear())} - ${pad(this.getHours())}:${pad(this.getMinutes())}`;
}