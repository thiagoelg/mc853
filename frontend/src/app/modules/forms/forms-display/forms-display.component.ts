import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Form } from 'src/app/models/form';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-forms-display',
  templateUrl: './forms-display.component.html',
  styleUrls: ['./forms-display.component.css']
})
export class FormsDisplayComponent implements OnInit {
  form$: Observable<Form>;

  constructor(private formsService: FormsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('form_id'));
    this.form$ = this.formsService.fetchForm(id);
  }
}
