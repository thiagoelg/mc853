import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsResponseTypeComponent } from './forms-response-type.component';

describe('FormsResponseTypeComponent', () => {
  let component: FormsResponseTypeComponent;
  let fixture: ComponentFixture<FormsResponseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsResponseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsResponseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
