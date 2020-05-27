import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsTypeListComponent } from './solicitations-type-list.component';

describe('SolicitationsTypeListComponent', () => {
  let component: SolicitationsTypeListComponent;
  let fixture: ComponentFixture<SolicitationsTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationsTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationsTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
