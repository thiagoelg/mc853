import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFormQuestionComponent } from './forms-form-question.component';

describe('FormsFormQuestionComponent', () => {
  let component: FormsFormQuestionComponent;
  let fixture: ComponentFixture<FormsFormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsFormQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
