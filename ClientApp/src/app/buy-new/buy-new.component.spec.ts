import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNewComponent } from './buy-new.component';

describe('BuyNewComponent', () => {
  let component: BuyNewComponent;
  let fixture: ComponentFixture<BuyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
