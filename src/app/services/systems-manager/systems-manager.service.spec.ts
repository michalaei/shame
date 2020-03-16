import { TestBed } from '@angular/core/testing';

import { SystemsManagerService } from './systems-manager.service';

describe('SystemsManagerService', () => {
  let service: SystemsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
