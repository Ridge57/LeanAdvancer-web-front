import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionSoldesComponent } from './suggestion-soldes.component';

describe('SuggestionSoldesComponent', () => {
  let component: SuggestionSoldesComponent;
  let fixture: ComponentFixture<SuggestionSoldesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionSoldesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionSoldesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
