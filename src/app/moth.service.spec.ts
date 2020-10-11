import { TestBed } from '@angular/core/testing';

import { MothService } from './moth.service';

describe('MothService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MothService = TestBed.get(MothService);
    expect(service).toBeTruthy();
  });
});
