import { TestBed } from '@angular/core/testing';

import { BlogSiteServiceService } from './blog-site-service.service';
import { HttpClient } from '@angular/common/http';

describe('BlogSiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    declarations: []
  }));

  it('should be created', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    expect(service).toBeTruthy();
  });
});
