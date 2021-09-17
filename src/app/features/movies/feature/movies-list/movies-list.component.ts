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
    this.showMovieResults = true;

    this.moviesService
      .searchMovies(title, year)
      .subscribe(movies => this.movies = movies);
  }

  sortMovies(sort: string): void {
    if (!this.movies) { return; }

    if (sort === 'a-zAsc') {
      this.movies = this.movies.sort((a, b) => {
        if (a.Title < b.Title) {
          return - 1;
        } else if (a.Title > b.Title) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === 'a-zDsc') {
      this.movies = this.movies.sort((a, b) => {
        if (a.Title > b.Title) {
          return - 1;
        } else if (a.Title < b.Title) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === 'yearAsc') {
      this.movies = this.movies.sort((a, b) => +a.Year - +b.Year);
    } else if (sort === 'yearDsc') {
      this.movies = this.movies.sort((a, b) => +a.Year - +b.Year).reverse();
    }
  }
}
