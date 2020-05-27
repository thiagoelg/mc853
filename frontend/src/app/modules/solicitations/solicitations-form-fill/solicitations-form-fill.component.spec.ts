import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsFormFillComponent } from './solicitations-form-fill.component';

describe('SolicitationsFormFillComponent', () => {
  let component: SolicitationsFormFillComponent;
  let fixture: ComponentFixture<SolicitationsFormFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsFormFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsFormFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
