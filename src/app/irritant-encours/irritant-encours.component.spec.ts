import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrritantEncoursComponent } from './irritant-encours.component';

describe('IrritantEncoursComponent', () => {
  let component: IrritantEncoursComponent;
  let fixture: ComponentFixture<IrritantEncoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrritantEncoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrritantEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
