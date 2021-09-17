import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../data-access/movies/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: IMovie;
  
  movieDetail: IMovieDetail;
  detailVisible: boolean;
  movieUrlBase = `https://www.imdb.com/title/`;

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
  }

  showDetail(id: string): void {
    if (!this.movieDetail) {
      this.moviesService.getMovie(id).subscribe((movieDetail) => {
        this.movieDetail = movieDetail;
        this.detailVisible = true;
      });
    } else {
      this.detailVisible = true;
    }
  }
}
