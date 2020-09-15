import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionUsuarioComponent } from './direccion-usuario.component';

describe('DireccionUsuarioComponent', () => {
  let component: DireccionUsuarioComponent;
  let fixture: ComponentFixture<DireccionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
