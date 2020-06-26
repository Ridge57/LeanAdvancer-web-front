import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAjouterComponent } from './standard-ajouter.component';

describe('StandardAjouterComponent', () => {
  let component: StandardAjouterComponent;
  let fixture: ComponentFixture<StandardAjouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardAjouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
