import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MoviesEntityService } from 'src/app/store/movie/movies-entity.service';
import { Movie } from '../../models/movie.model';
import { StarRatingColor } from 'src/app/shared/components';

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.scss']
})
export class MoviePlayerComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly moviesEntityService: MoviesEntityService = inject(MoviesEntityService);
  movie$!: Observable<Movie>;
  movies$!: Observable<Movie[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;  // constructor() { this.movie$ = this.movieEntityService.entities$.pipe(map((movies) => movies.find((movie) => movie.id === this.route.snapshot.params['id']))); }
  starColor: StarRatingColor = StarRatingColor.accent;

  ngOnInit(): void {
    this.movies$ = this.moviesEntityService.entities$;
    this.route.paramMap.subscribe(params => {
      this.movie$ = this.movies$.pipe(map((movies) => movies.find((movie) => movie.id == params.get('id'))));
    });
    // this.movie$ = this.route.data.pipe<MovieDto>(map((movie: MovieDto) => movie));
  }

}
