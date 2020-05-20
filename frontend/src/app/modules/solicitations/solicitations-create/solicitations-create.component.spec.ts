import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsCreateComponent } from './solicitations-create.component';

describe('SolicitationsCreateComponent', () => {
  let component: SolicitationsCreateComponent;
  let fixture: ComponentFixture<SolicitationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
