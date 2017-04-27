import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodemcuComponent } from './nodemcu.component';

describe('NodemcuComponent', () => {
  let component: NodemcuComponent;
  let fixture: ComponentFixture<NodemcuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodemcuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodemcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
