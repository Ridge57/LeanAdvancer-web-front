import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistHistoriqueComponent } from './checklist-historique.component';

describe('ChecklistHistoriqueComponent', () => {
  let component: ChecklistHistoriqueComponent;
  let fixture: ComponentFixture<ChecklistHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
