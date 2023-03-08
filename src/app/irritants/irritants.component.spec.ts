import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrritantsComponent } from './irritants.component';

describe('IrritantsComponent', () => {
  let component: IrritantsComponent;
  let fixture: ComponentFixture<IrritantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IrritantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrritantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
