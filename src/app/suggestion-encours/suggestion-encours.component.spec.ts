import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionEncoursComponent } from './suggestion-encours.component';

describe('SuggestionEncoursComponent', () => {
  let component: SuggestionEncoursComponent;
  let fixture: ComponentFixture<SuggestionEncoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionEncoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
