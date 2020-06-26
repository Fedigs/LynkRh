import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatResultatComponent } from './candidat-resultat.component';

describe('CandidatResultatComponent', () => {
  let component: CandidatResultatComponent;
  let fixture: ComponentFixture<CandidatResultatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatResultatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
