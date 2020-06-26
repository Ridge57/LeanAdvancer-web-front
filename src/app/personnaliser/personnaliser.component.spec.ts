import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnaliserComponent } from './personnaliser.component';

describe('PersonnaliserComponent', () => {
  let component: PersonnaliserComponent;
  let fixture: ComponentFixture<PersonnaliserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnaliserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnaliserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
