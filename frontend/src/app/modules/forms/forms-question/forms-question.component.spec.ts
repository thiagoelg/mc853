import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsQuestionComponent } from './forms-question.component';

describe('FormsQuestionComponent', () => {
  let component: FormsQuestionComponent;
  let fixture: ComponentFixture<FormsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
