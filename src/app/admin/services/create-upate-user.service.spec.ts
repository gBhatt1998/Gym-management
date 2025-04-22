import { TestBed } from '@angular/core/testing';

import { CreateUpateUserService } from './create-upate-user.service';

describe('CreateUpateUserService', () => {
  let service: CreateUpateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUpateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
