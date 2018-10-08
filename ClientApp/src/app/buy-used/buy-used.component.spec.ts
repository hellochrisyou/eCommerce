import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyUsedComponent } from './buy-used.component';

describe('BuyUsedComponent', () => {
  let component: BuyUsedComponent;
  let fixture: ComponentFixture<BuyUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
