import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmOrderComponent } from './dialog-confirm-order.component';

describe('DialogConfirmOrderComponent', () => {
  let component: DialogConfirmOrderComponent;
  let fixture: ComponentFixture<DialogConfirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
