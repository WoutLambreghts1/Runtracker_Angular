import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, ResponseType} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {EditProfileService} from "./edit-profile.service.ts";

describe('editProfileService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        EditProfileService,
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

  describe('Editprofile: getUser()', () => {
    it('Editprofile:getUser should return an Observable<User>',
      inject([EditProfileService, MockBackend], (editProfileService, mockBackend) => {
        const mockResponse = {userId: 1, username: 'Jos1', firstname: 'Jos', lastname: 'TestPersoon'};

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        editProfileService.getUser().subscribe((user) => {
          expect(user.userId).toBe(1);
          expect(user.username).toBe('Jos1');
        });
      }));

    it('Editprofile: getUser should have errorHandling',
      inject([EditProfileService, MockBackend], (editProfileService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockError(new Response(new ResponseOptions({
            status: 403,
            type: ResponseType.Error,
            body: JSON.stringify({key: 'val'})
          })));
        });
        editProfileService.getUser().subscribe(
          data => {
          },
          err => {
            expect(err).toBe('403 -  {"key":"val"}')
          });
      }));
  });

  describe('Editprofile: updateUser()', () => {
    let updateUser =
    {
      "userId":0,
      "username": "Jan1",
      "firstname": "Jan",
      "lastname": "Jansens",
      "gender": "MALE",
      "city": "",
      "birthday": null,
      "friends": [],
      "competitionsCreated": [],
      "trackings": [],
      "competitionsWon": [],
      "competitionsRun": [],
      "maxSpeed": 0,
      "avgSpeed": 0,
      "maxDistance": 0,
      "avgDistance": 0,
      "totalDistance": 0,
      "ranTenKm": false,
      "ranTwentyKm": false,
      "ranMarathon": false,
      "nrOfCompetitionsWon": 0
    };

    it('createUser should return an Observable<User>',
      inject([EditProfileService, MockBackend], (editProfileService, mockBackend) => {
        const mockResponse = updateUser;

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        editProfileService.updateUser(mockResponse).subscribe((user) => {
          expect(user.username).toBe('Jan1');
          expect(user.firstname).toBe('Jan');
          expect(user.lastname).toBe('Jansens');
        });
      }));
  });
});
