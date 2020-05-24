import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsQuestionSelectComponent } from './forms-question-select.component';

describe('FormsQuestionSelectComponent', () => {
  let component: FormsQuestionSelectComponent;
  let fixture: ComponentFixture<FormsQuestionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsQuestionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsQuestionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
