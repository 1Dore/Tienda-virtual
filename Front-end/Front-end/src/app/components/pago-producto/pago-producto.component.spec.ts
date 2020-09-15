import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoProductoComponent } from './pago-producto.component';

describe('PagoProductoComponent', () => {
  let component: PagoProductoComponent;
  let fixture: ComponentFixture<PagoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
