import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ShipService } from './ship.service';

describe('ShipService', () => {
  let service: ShipService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ShipService],
    });

    service = TestBed.inject(ShipService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a specific starship by ID successfully', inject(
    [HttpTestingController, ShipService],
    (httpClient: HttpTestingController, shipService: ShipService) => {
      const starshipId = 'ttps://swapi.dev/api/starships/1';
      const dummyStarship = { name: 'Starship 1' };

      // Make an HTTP GET request
      shipService.getStarshipById(starshipId).subscribe((starship) => {
        expect(starship).toEqual(dummyStarship); // Check the response data
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(starshipId);
      expect(req.request.method).toBe('GET');

      // Respond with dummy data
      req.flush(dummyStarship);
    }
  ));
});
