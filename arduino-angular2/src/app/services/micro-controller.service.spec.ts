import { TestBed, inject } from '@angular/core/testing';

import { MicroControllerService } from './micro-controller.service';

describe('MicroControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicroControllerService]
    });
  });

  it('should ...', inject([MicroControllerService], (service: MicroControllerService) => {
    expect(service).toBeTruthy();
  }));
});
