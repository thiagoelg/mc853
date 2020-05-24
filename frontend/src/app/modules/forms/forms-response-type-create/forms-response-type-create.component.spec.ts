import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsResponseTypeCreateComponent } from './forms-response-type-create.component';

describe('FormsResponseTypeCreateComponent', () => {
  let component: FormsResponseTypeCreateComponent;
  let fixture: ComponentFixture<FormsResponseTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsResponseTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsResponseTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
