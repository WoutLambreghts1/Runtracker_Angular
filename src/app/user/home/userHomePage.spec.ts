import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, ResponseType} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {UserHomepageService} from "./userhomepage.service.ts";

describe('userHomepageService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserHomepageService,
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
