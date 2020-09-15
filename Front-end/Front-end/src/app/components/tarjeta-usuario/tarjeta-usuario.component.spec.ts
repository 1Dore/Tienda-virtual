import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaUsuarioComponent } from './tarjeta-usuario.component';

describe('TarjetaUsuarioComponent', () => {
  let component: TarjetaUsuarioComponent;
  let fixture: ComponentFixture<TarjetaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
