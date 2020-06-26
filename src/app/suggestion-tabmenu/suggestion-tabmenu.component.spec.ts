import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionTabmenuComponent } from './suggestion-tabmenu.component';

describe('SuggestionTabmenuComponent', () => {
  let component: SuggestionTabmenuComponent;
  let fixture: ComponentFixture<SuggestionTabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionTabmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionTabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
