import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UserRepository } from '../../core/repository/user.repository'
import { ActivatedRoute } from '@angular/router'
import { LoadingService } from '../../core/services/loading-service/loading.service'
import { provideHttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { IProfile } from '../../interfaces/IProfile'

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userRepositorySpy: jasmine.SpyObj<UserRepository>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    userRepositorySpy = jasmine.createSpyObj('UserRepository', ['getUserProfile']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setIsLoading']);

    activatedRouteStub = {
      snapshot: {
        params: {
          login: 'mockUser'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideHttpClient(),
        { provide: UserRepository, useValue: userRepositorySpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the user profile on initialization', () => {
    const mockProfile: IProfile = {
      login: "mockUser",
      id: 12345,
      node_id: "MDQ6VXNlcjEwMDAwMDAwMDAw",
      avatar_url: "https://example.com/avatar.png",
      gravatar_id: "",
      url: "https://api.github.com/users/mockUser",
      html_url: "https://github.com/mockUser",
      followers_url: "https://api.github.com/users/mockUser/followers",
      following_url: "https://api.github.com/users/mockUser/following{/other_user}",
      gists_url: "https://api.github.com/users/mockUser/gists{/gist_id}",
      starred_url: "https://api.github.com/users/mockUser/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/mockUser/subscriptions",
      organizations_url: "https://api.github.com/users/mockUser/orgs",
      repos_url: "https://api.github.com/users/mockUser/repos",
      events_url: "https://api.github.com/users/mockUser/events{/privacy}",
      received_events_url: "https://api.github.com/users/mockUser/received_events",
      type: "User",
      site_admin: false,
      name: "Mock User",
      company: '',
      blog: "",
      location: "Mock Location",
      email: '',
      hireable: true,
      bio: "Mock bio",
      twitter_username: '',
      public_repos: 10,
      public_gists: 1,
      followers: 5,
      following: 2,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      score: 1
    };

    userRepositorySpy.getUserProfile.and.returnValue(of(mockProfile));
    component.ngOnInit();

    expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(true);
    expect(userRepositorySpy.getUserProfile).toHaveBeenCalledWith('mockUser');
    expect(component.profile).toEqual(mockProfile);
    expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(false);
  });

  it('should handle errors when fetching user profile', () => {
    const errorResponse = new Error('Network Error');
    userRepositorySpy.getUserProfile.and.returnValue(throwError(() => errorResponse));
    component.ngOnInit();

    expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(true);
    expect(userRepositorySpy.getUserProfile).toHaveBeenCalledWith('mockUser');
    expect(component.profile).toBeUndefined()
    expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(true);
  });
});
