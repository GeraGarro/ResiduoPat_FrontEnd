import { TestBed } from '@angular/core/testing';

import { ApiServicesResiduoService } from './api-services-residuo.service';

describe('ApiServicesResiduoService', () => {
  let service: ApiServicesResiduoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicesResiduoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
