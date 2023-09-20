import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a specific movie by episode ID successfully', inject(
    [HttpTestingController, MovieService],
    (httpClient: HttpTestingController, movieService: MovieService) => {
      const episodeId = 1;
      const dummyMovie = { title: 'Movie 1' };

      // Make an HTTP GET request
      movieService.getMovieByEpisodeId(episodeId).subscribe((movie) => {
        expect(movie).toEqual(dummyMovie); // Check the response data
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(
        `https://swapi.dev/api/films/${episodeId}/`
      );
      expect(req.request.method).toBe('GET');

      // Respond with dummy data
      req.flush(dummyMovie);
    }
  ));
});
