import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, ResponseType} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {UserHomepageService} from "./user-homepage.service";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import {Profileinfo} from "../../model/profileinfo";

class MockAuthService {
  auth0 = new Object();

  public getUserInfo(): Profileinfo {
    return {
      email: 'runtrackminds2017@gmail.com',
      emailVerified: true,
      nickname: 'runtrackminds2017',
      picture: 'picture',
      sub: 'sub',
      updatedAt: '11-12-13',
      givenName: 'runtrack',
      familyName: 'minds',
      gender: 'm'
    }
  }
}

describe('userHomepageService', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('home')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserHomepageService,
        {provide: AuthService, useClass: MockAuthService},
        {provide: Router, useValue: mockRouter},
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ],
    });
  });

  describe('getUser()', () => {
    it('getUser should return an Observable<User>',
      inject([UserHomepageService, MockBackend], (userHomepageService, mockBackend) => {
        const mockResponse = {userId: 1, username: 'Jos1', firstname: 'Jos', lastname: 'TestPersoon'};

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        userHomepageService.getUser().subscribe((user) => {
          expect(user.userId).toBe(1);
          expect(user.username).toBe('Jos1');
        });
      }));

    it('getUser should have errorHandling',
      inject([UserHomepageService, MockBackend], (userHomepageService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockError(new Response(new ResponseOptions({
            status: 403,
            type: ResponseType.Error,
            body: JSON.stringify({key: 'val'})
          })));
        });
        userHomepageService.getUser().subscribe(
          data => {
          },
          err => {
            expect(err).toBe('403 -  {"key":"val"}')
          });
      }));
  });

  describe('createUser()', () => {
    it('createUser should return an Observable<User>',
      inject([UserHomepageService, MockBackend], (userHomepageService, mockBackend) => {
        const mockResponse = {userId: 2, username: 'Jos2', firstname: 'Jos', lastname: 'TestPersoon'};

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        userHomepageService.createUser().subscribe((user) => {
          expect(user.userId).toBe(2);
          expect(user.username).toBe('Jos2');
        });
      }));
  });
});
