import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerTopicsComponent } from './broker-topics.component';

describe('BrokerTopicsComponent', () => {
  let component: BrokerTopicsComponent;
  let fixture: ComponentFixture<BrokerTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
