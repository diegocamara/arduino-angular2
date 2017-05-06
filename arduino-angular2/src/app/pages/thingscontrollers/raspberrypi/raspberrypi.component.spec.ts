import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspberrypiComponent } from './raspberrypi.component';

describe('RaspberrypiComponent', () => {
  let component: RaspberrypiComponent;
  let fixture: ComponentFixture<RaspberrypiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaspberrypiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspberrypiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
