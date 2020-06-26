import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRectifierComponent } from './standard-rectifier.component';

describe('StandardRectifierComponent', () => {
  let component: StandardRectifierComponent;
  let fixture: ComponentFixture<StandardRectifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardRectifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardRectifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
