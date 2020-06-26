import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrritantTabmenuComponent } from './irritant-tabmenu.component';

describe('IrritantTabmenuComponent', () => {
  let component: IrritantTabmenuComponent;
  let fixture: ComponentFixture<IrritantTabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrritantTabmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrritantTabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
