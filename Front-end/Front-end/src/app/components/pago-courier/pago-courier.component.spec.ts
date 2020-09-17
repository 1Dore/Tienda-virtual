import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCourierComponent } from './pago-courier.component';

describe('PagoCourierComponent', () => {
  let component: PagoCourierComponent;
  let fixture: ComponentFixture<PagoCourierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCourierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
