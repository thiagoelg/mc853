import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsQuestionCreateComponent } from './forms-question-create.component';

describe('FormsQuestionCreateComponent', () => {
  let component: FormsQuestionCreateComponent;
  let fixture: ComponentFixture<FormsQuestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsQuestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
