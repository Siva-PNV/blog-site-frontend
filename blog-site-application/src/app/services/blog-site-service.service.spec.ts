import { TestBed } from '@angular/core/testing';

import { BlogSiteServiceService } from './blog-site-service.service';

describe('BlogSiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    expect(service).toBeTruthy();
  });
});
