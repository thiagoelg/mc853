import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appHideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnInit {
  @Input('appHideIfUnauthorized') requiredPermissions: Array<string>;
  constructor(private el: ElementRef, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.hasPermissions(this.requiredPermissions)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
