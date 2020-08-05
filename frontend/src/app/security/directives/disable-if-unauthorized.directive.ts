import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appDisableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective implements OnInit {
  @Input('appDisableIfUnauthorized') requiredPermissions: Array<string>;
  constructor(private el: ElementRef, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.hasAllPermissions(this.requiredPermissions)) {
      this.el.nativeElement.disabled = true;
    }
  }
}
