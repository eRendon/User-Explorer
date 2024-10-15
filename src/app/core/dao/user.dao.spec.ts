import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { UserDAO } from './user.dao';
import { provideHttpClient } from '@angular/common/http'

describe('UserDAO', () => {
  let service: UserDAO;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideHttpClient()
      ]
    });
    service = TestBed.inject(UserDAO);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchUsers', () => {
    it('should return an Observable of users', () => {
      const mockResponse = {
        items: [
          { login: 'user1', id: 1 },
          { login: 'user2', id: 2 }
        ]
      };

      service.searchUsers('test').subscribe(users => {
        expect(users).toEqual(mockResponse)
      });

      const req = httpMock.expectOne('https://api.github.com/search/users?q=test');
      expect(req.request.method).toBe('GET')
      req.flush(mockResponse)
    });
  });

  describe('getUserProfile', () => {
    it('should return an Observable of user profile', () => {
      const mockUserProfile = {
        login: 'user1',
        id: 1,
        avatar_url: 'https://example.com/avatar.jpg',
        followers: 10,
        following: 5,
        public_repos: 20
      };

      service.getUserProfile('user1').subscribe(profile => {
        expect(profile).toEqual(mockUserProfile)
      });

      const req = httpMock.expectOne('https://api.github.com/users/user1')
      expect(req.request.method).toBe('GET')
      req.flush(mockUserProfile)
    });
  });
});
