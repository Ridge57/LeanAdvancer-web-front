import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTabmenuComponent } from './standard-tabmenu.component';

describe('StandardTabmenuComponent', () => {
  let component: StandardTabmenuComponent;
  let fixture: ComponentFixture<StandardTabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardTabmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
