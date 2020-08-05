import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from '../solicitations.service';
import { Question } from 'src/app/models/question';
import { Form } from './../../../models/form';
import { Answer } from 'src/app/models/answer';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitations-display',
  templateUrl: './solicitations-display.component.html',
  styleUrls: ['./solicitations-display.component.css'],
})
export class SolicitationsDisplayComponent implements OnInit {
  baseUrl: string = environment.backend;
  solicitation: Solicitation;
  questions: Question[];
  form: Form;
  answers: Answer[];
  author: User;
  authorImageUrl: string;
  responsible: User;
  responsibleImageUrl: string;

  constructor(private solicitationsService: SolicitationsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('solicitation_id'));
    this.solicitationsService.fetchSolicitation(id).subscribe((solicitation) => {
      this.solicitation = solicitation;
      this.questions = solicitation.questions;
      this.form = solicitation.form;
      this.answers = solicitation.answers;
      this.author = solicitation.submitted_by_user;
      this.authorImageUrl = this.author.profile_image_id
        ? `${this.baseUrl}files/${this.author.profile_image_id}`
        : 'assets/images/profile.jpg';
      this.responsible = solicitation.managed_by_user;
      this.responsibleImageUrl = this.responsible.profile_image_id
        ? `${this.baseUrl}files/${this.responsible.profile_image_id}`
        : 'assets/images/profile.jpg';
    });
  }
}
