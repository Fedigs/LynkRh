import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsesQcmComponent } from './reponses-qcm.component';

describe('ReponsesQcmComponent', () => {
  let component: ReponsesQcmComponent;
  let fixture: ComponentFixture<ReponsesQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponsesQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponsesQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
