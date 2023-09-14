import { TestBed } from '@angular/core/testing';

import { CreateQrCodeService } from './create-qr-code.service';

describe('CreateQrCodeService', () => {
  let service: CreateQrCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateQrCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
