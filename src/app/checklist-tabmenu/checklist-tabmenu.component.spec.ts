import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistTabmenuComponent } from './checklist-tabmenu.component';

describe('ChecklistTabmenuComponent', () => {
  let component: ChecklistTabmenuComponent;
  let fixture: ComponentFixture<ChecklistTabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistTabmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistTabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
