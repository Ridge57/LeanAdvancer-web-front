import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrritantAtraiterComponent } from './irritant-atraiter.component';

describe('IrritantAtraiterComponent', () => {
  let component: IrritantAtraiterComponent;
  let fixture: ComponentFixture<IrritantAtraiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrritantAtraiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrritantAtraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
