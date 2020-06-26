import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsesLibreComponent } from './reponses-libre.component';

describe('ReponsesLibreComponent', () => {
  let component: ReponsesLibreComponent;
  let fixture: ComponentFixture<ReponsesLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponsesLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponsesLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
