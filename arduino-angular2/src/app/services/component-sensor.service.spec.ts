import { TestBed, inject } from '@angular/core/testing';

import { ComponentSensorService } from './component-sensor.service';

describe('ComponentSensorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentSensorService]
    });
  });

  it('should ...', inject([ComponentSensorService], (service: ComponentSensorService) => {
    expect(service).toBeTruthy();
  }));
});
