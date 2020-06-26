import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistVoirComponent } from './checklist-voir.component';

describe('ChecklistVoirComponent', () => {
  let component: ChecklistVoirComponent;
  let fixture: ComponentFixture<ChecklistVoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistVoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistVoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
