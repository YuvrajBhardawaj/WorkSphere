import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managersListResolver } from './managers-list.resolver';

describe('managersListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managersListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
