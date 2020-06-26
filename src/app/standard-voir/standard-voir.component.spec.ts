import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardVoirComponent } from './standard-voir.component';

describe('StandardVoirComponent', () => {
  let component: StandardVoirComponent;
  let fixture: ComponentFixture<StandardVoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardVoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardVoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
