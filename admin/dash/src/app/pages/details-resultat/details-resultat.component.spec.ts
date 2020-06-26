import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsResultatComponent } from './details-resultat.component';

describe('DetailsResultatComponent', () => {
  let component: DetailsResultatComponent;
  let fixture: ComponentFixture<DetailsResultatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsResultatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
