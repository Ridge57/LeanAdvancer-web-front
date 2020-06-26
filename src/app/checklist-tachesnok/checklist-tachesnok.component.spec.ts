import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistTachesnokComponent } from './checklist-tachesnok.component';

describe('ChecklistTachesnokComponent', () => {
  let component: ChecklistTachesnokComponent;
  let fixture: ComponentFixture<ChecklistTachesnokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistTachesnokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistTachesnokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
