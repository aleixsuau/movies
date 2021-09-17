import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from '../../data-access/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  moviesForm: FormGroup;
  movies: any;
  movieUrlBase = `https://www.imdb.com/title/`;
  selectedMovie: any;
  noResults: any;
  showMovieResults: any;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.moviesForm = this.formBuilder.group({
      title: null,
      year: null
    });
  }

  searchMovies(title: string): void {
    this.moviesService
      .searchMovies(title)
      .subscribe(
        (movies: IAPIResponse) => {
          console.log('movies', movies);
          if (movies.Response) {
            this.movies = movies.Search;
            this.showMovieResults = true;
          } else {
            this.showMovieResults = true;
          }
        }
      );
  }

  getMovie(id: string): void {
    this.moviesService.getMovie(id).subscribe((movie) => {
      this.selectedMovie = movie;
    });
  }
}
