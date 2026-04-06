import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { viewEmpResolver } from './view-emp.resolver';

describe('viewEmpResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => viewEmpResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
