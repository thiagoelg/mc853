import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsFormPageComponent } from './solicitations-form-page.component';

describe('SolicitationsFormPageComponent', () => {
  let component: SolicitationsFormPageComponent;
  let fixture: ComponentFixture<SolicitationsFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
