import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsDisplayComponent } from './solicitations-display.component';

describe('SolicitationsDisplayComponent', () => {
  let component: SolicitationsDisplayComponent;
  let fixture: ComponentFixture<SolicitationsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
