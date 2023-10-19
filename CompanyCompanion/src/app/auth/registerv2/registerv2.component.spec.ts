import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registerv2Component } from './registerv2.component';

describe('Registerv2Component', () => {
  let component: Registerv2Component;
  let fixture: ComponentFixture<Registerv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Registerv2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registerv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
