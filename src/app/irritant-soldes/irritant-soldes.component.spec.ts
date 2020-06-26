import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrritantSoldesComponent } from './irritant-soldes.component';

describe('IrritantSoldesComponent', () => {
  let component: IrritantSoldesComponent;
  let fixture: ComponentFixture<IrritantSoldesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrritantSoldesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrritantSoldesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
