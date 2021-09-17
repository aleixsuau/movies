import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../data-access/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  moviesForm: FormGroup;
  movies: IMovie[] | null;
  movieUrlBase = `https://www.imdb.com/title/`;
  selectedMovie: IMovie;
  showMovieResults: boolean;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.moviesForm = this.formBuilder.group({
      title: [null, Validators.required],
      year: null
    });
  }

  searchMovies(title: string, year?: number): void {
    this.moviesService
      .searchMovies(title, year)
      .subscribe(
        movies => {
          this.movies = movies;
          this.showMovieResults = true;
        }
      );
  }

  getMovie(id: string): void {
    this.moviesService.getMovie(id).subscribe((movie) => this.selectedMovie = movie);
  }
}
