import { TestBed } from '@angular/core/testing';

import { UserRepository } from './user.repository';
import { UserDAO } from '../dao/user.dao'
import { IHTTPResponse } from '../../interfaces/IHTTPResponse'
import { IUser } from '../../interfaces/IUser'
import { of } from 'rxjs'

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userDAOMock: jasmine.SpyObj<UserDAO>;

  beforeEach(() => {
    userDAOMock = jasmine.createSpyObj('UserDAO', ['searchUsers', 'getUserProfile']);

    TestBed.configureTestingModule({
      providers: [
        UserRepository,
        { provide: UserDAO, useValue: userDAOMock }
      ]
    });
    TestBed.inject(UserDAO)
    userRepository = TestBed.inject(UserRepository);
  });

  it('should be created', () => {
    expect(userRepository).toBeTruthy();
  });

  it('should return users from searchUsers', (done) => {
    const mockResponse: IHTTPResponse<IUser[]> = {
      incomplete_results: false,
      total_count: 2,
      items: [
        { login: "eRendon",
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
          score: 1.0,
        } ,
        {
          login: "EAlexanderRC",
          id: 106752759,
          node_id: "U_kgDOBlzq9w",
          avatar_url: "https://avatars.githubusercontent.com/u/106752759?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/EAlexanderRC",
          html_url: "https://github.com/EAlexanderRC",
          followers_url: "https://api.github.com/users/EAlexanderRC/followers",
          following_url: "https://api.github.com/users/EAlexanderRC/following{/other_user}",
          gists_url: "https://api.github.com/users/EAlexanderRC/gists{/gist_id}",
          starred_url: "https://api.github.com/users/EAlexanderRC/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/EAlexanderRC/subscriptions",
          organizations_url: "https://api.github.com/users/EAlexanderRC/orgs",
          repos_url: "https://api.github.com/users/EAlexanderRC/repos",
          events_url: "https://api.github.com/users/EAlexanderRC/events{/privacy}",
          received_events_url: "https://api.github.com/users/EAlexanderRC/received_events",
          type: "User",
          site_admin: false,
          score: 1.0
        },
        // Agrega más usuarios si es necesario
      ]
    };

    userDAOMock.searchUsers.and.returnValue(of(mockResponse));

    userRepository.searchUsers('test query').subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users[0].login).toBe('eRendon');
      done();
    });
  });

  it('should return an empty array if no users found in searchUsers', (done) => {
    const mockResponse: IHTTPResponse<IUser[]> = {
      items: [],
      total_count: 0,
      incomplete_results: false
    };

    userDAOMock.searchUsers.and.returnValue(of(mockResponse));

    userRepository.searchUsers('test query').subscribe((users) => {
      expect(users.length).toBe(0);
      done();
    });
  });

  it('should get user profile from getUserProfile', (done) => {
    const mockUserProfile: IUser = {
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
      score: 1.0,
    }

    userDAOMock.getUserProfile.and.returnValue(of(mockUserProfile));

    userRepository.getUserProfile<IUser>('eRendon').subscribe((user) => {
      expect(user).toEqual(mockUserProfile)
      done();
    });
  });

  it('should set all users', () => {
    const mockUsers: IUser[] = [{
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
      score: 1.0
    }]

    userRepository.setAllUsers(mockUsers)

    expect(userRepository.getAllUsers()).toEqual(mockUsers)
  });
});
