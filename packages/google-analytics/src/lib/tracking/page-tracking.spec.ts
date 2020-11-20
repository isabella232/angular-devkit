import { TestBed } from '@angular/core/testing';
import { PageTracking } from './page-tracking';

describe('PageTracking', () => {
  let service: PageTracking;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTracking],
    });

    service = TestBed.inject(PageTracking);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
