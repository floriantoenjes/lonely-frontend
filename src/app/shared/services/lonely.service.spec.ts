import { TestBed } from '@angular/core/testing';

import { LonelyService } from './lonely.service';

describe('LonelyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LonelyService = TestBed.get(LonelyService);
    expect(service).toBeTruthy();
  });
});
