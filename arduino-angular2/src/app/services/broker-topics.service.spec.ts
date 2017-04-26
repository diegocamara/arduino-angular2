import { TestBed, inject } from '@angular/core/testing';

import { BrokerTopicsService } from './broker-topics.service';

describe('BrokerTopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrokerTopicsService]
    });
  });

  it('should ...', inject([BrokerTopicsService], (service: BrokerTopicsService) => {
    expect(service).toBeTruthy();
  }));
});
