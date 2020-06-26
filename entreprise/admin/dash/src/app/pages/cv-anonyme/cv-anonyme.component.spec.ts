import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAnonymeComponent } from './cv-anonyme.component';

describe('CvAnonymeComponent', () => {
  let component: CvAnonymeComponent;
  let fixture: ComponentFixture<CvAnonymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvAnonymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvAnonymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
