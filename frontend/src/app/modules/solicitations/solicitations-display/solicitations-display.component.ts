import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject, merge } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from '../solicitations.service';
import { Question } from 'src/app/models/question';
import { Form } from './../../../models/form';
import { Answer } from 'src/app/models/answer';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitationPost } from 'src/app/models/solicitationPost';

@Component({
  selector: 'app-solicitations-display',
  templateUrl: './solicitations-display.component.html',
  styleUrls: ['./solicitations-display.component.css'],
})
export class SolicitationsDisplayComponent implements OnInit {
  baseUrl: string = environment.backend;
  solicitationId: number;
  solicitation: Solicitation;
  questions: Question[];
  form: Form;
  answers: Answer[];
  author: User;
  authorImageUrl: string;
  responsible: User;
  responsibleImageUrl: string;
  canAssignToUser: boolean;
  posts: SolicitationPost[];

  postForm: FormGroup;
  errorMsg: string = null;

  constructor(
    private solicitationsService: SolicitationsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('solicitation_id'));
    this.solicitationsService.fetchSolicitation(this.solicitationId).subscribe((solicitation) => {
      this.loadSolicitation(solicitation);
    });
    this.solicitationsService.listPosts(this.solicitationId).subscribe((posts) => {
      this.posts = posts.map((post) => {
        post.authorProfileImageUrl = post.author.profile_image_id
          ? `${this.baseUrl}files/${post.author.profile_image_id}`
          : 'assets/images/profile.jpg';
        return post;
      });
    });
  }

  buildForm() {
    this.postForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  onSubmitPost() {
    const values = {
      ...this.postForm.value,
      solicitation_id: this.solicitationId,
    };
    this.solicitationsService.newPost(values).subscribe({
      next: () => {
        this.ngOnInit();
        this.postForm.reset();
        this.errorMsg = null;
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      },
    });
  }

  loadSolicitation(solicitation: Solicitation) {
    this.solicitation = solicitation;
    this.questions = solicitation.questions;
    this.form = solicitation.form;
    this.author = solicitation.submitted_by_user;
    this.authorImageUrl = this.author?.profile_image_id
      ? `${this.baseUrl}files/${this.author.profile_image_id}`
      : 'assets/images/profile.jpg';
    this.responsible = solicitation.managed_by_user;
    this.responsibleImageUrl = this.responsible?.profile_image_id
      ? `${this.baseUrl}files/${this.responsible.profile_image_id}`
      : 'assets/images/profile.jpg';

    this.answers = [];
    solicitation.answers.forEach((answer) => {
      this.answers.push({
        ...answer,
        question: this.questions.find((q) => q.id === answer.form_question_id),
      });
    });
    this.canAssignToUser = this.solicitation.managed_by_user_id !== this.authService.user.id;
  }

  onAssignToUser() {
    this.solicitationsService.assignToUser(this.solicitationId).subscribe({
      next: (data) => {
        this.loadSolicitation(data);
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
