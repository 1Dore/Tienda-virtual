import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisoresComponent } from './emisores.component';

describe('EmisoresComponent', () => {
  let component: EmisoresComponent;
  let fixture: ComponentFixture<EmisoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmisoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
