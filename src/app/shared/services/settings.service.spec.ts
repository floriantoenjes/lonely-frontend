import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('LonelyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});
