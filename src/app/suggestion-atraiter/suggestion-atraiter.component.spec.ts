import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionAtraiterComponent } from './suggestion-atraiter.component';

describe('SuggestionAtraiterComponent', () => {
  let component: SuggestionAtraiterComponent;
  let fixture: ComponentFixture<SuggestionAtraiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionAtraiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionAtraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
