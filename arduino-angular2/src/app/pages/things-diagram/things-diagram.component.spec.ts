import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsDiagramComponent } from './things-diagram.component';

describe('ThingsDiagramComponent', () => {
  let component: ThingsDiagramComponent;
  let fixture: ComponentFixture<ThingsDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingsDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
