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
    httpMock.verify(); // Verifica que no hay peticiones pendientes
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
        expect(users).toEqual(mockResponse); // Verifica que el resultado es el esperado
      });

      const req = httpMock.expectOne('https://api.github.com/search/users?q=test'); // Espera una solicitud
      expect(req.request.method).toBe('GET'); // Verifica que el método es GET
      req.flush(mockResponse); // Responde con los datos simulados
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
        expect(profile).toEqual(mockUserProfile); // Verifica que el perfil es el esperado
      });

      const req = httpMock.expectOne('https://api.github.com/users/user1'); // Espera una solicitud
      expect(req.request.method).toBe('GET'); // Verifica que el método es GET
      req.flush(mockUserProfile); // Responde con los datos simulados
    });
  });
});
