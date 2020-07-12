import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsListComponent } from './solicitations-list.component';

describe('SolicitationsListComponent', () => {
  let component: SolicitationsListComponent;
  let fixture: ComponentFixture<SolicitationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
