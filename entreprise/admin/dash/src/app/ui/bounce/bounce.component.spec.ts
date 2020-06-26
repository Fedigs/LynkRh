import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BounceComponent } from './bounce.component';

describe('BounceComponent', () => {
  let component: BounceComponent;
  let fixture: ComponentFixture<BounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
