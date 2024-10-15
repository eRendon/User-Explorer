import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileUserComponent } from './profile-user.component';
import { IProfile } from '../../interfaces/IProfile'
import { By } from '@angular/platform-browser'

describe('ProfileUserComponent', () => {
  let component: ProfileUserComponent;
  let fixture: ComponentFixture<ProfileUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUserComponent);
    component = fixture.componentInstance;
  });

  it('should render profile information correctly', () => {
    const mockProfile: IProfile = {
      login: "eRendon",
      id: 36104986,
      node_id: "MDQ6VXNlcjM2MTA0OTg2",
      avatar_url: "https://avatars.githubusercontent.com/u/36104986?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/eRendon",
      html_url: "https://github.com/eRendon",
      followers_url: "https://api.github.com/users/eRendon/followers",
      following_url: "https://api.github.com/users/eRendon/following{/other_user}",
      gists_url: "https://api.github.com/users/eRendon/gists{/gist_id}",
      starred_url: "https://api.github.com/users/eRendon/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/eRendon/subscriptions",
      organizations_url: "https://api.github.com/users/eRendon/orgs",
      repos_url: "https://api.github.com/users/eRendon/repos",
      events_url: "https://api.github.com/users/eRendon/events{/privacy}",
      received_events_url: "https://api.github.com/users/eRendon/received_events",
      type: "User",
      site_admin: false,
      name: "Edwin Alexander Rendon",
      company: '',
      blog: "",
      location: "Medellin Colombia",
      email: '',
      hireable: true,
      bio: "Senior front end devoloper and mid Bakcend",
      twitter_username: '',
      public_repos: 35,
      public_gists: 0,
      followers: 10,
      following: 3,
      created_at: "2018-02-03T13:21:51Z",
      updated_at: "2024-09-23T22:42:23Z",
      score: 1
    }
    component.profile = mockProfile;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h1.text-2xl'));
    expect(nameElement.nativeElement.textContent).toContain(mockProfile.name);


    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.nativeElement.src).toContain(mockProfile.avatar_url);
  });

  it('should handle empty profile input gracefully', () => {
    component.profile = undefined;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.profile-name'));
    const emailElement = fixture.debugElement.query(By.css('.profile-email'));

    expect(nameElement).toBeFalsy();
    expect(emailElement).toBeFalsy();
  });
});
