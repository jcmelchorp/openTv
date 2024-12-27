import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/movies/models/movie.model';
import { MoviesEntityService } from 'src/app/store/movie/movies-entity.service';



@Component({
  selector: 'app-surfer-movies',
  templateUrl: './surfer-movies.component.html',
  styleUrls: ['./surfer-movies.component.scss']
})
export class SurferMoviesComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly moviesEntityService: MoviesEntityService = inject(MoviesEntityService);
  movie$!: Observable<Movie>;
  movies$!: Observable<Movie[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  filteredEntities$: Observable<Movie[]>;
  subscription: Subscription;
  filterValues: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    // Init form
    this.filterValues = this.fb.group({
      country: new FormControl(''),
      // subdivisions: new FormControl([]),
      category: new FormControl(''),
    });
  }

  ngOnInit() {
    this.subscription = this.filterValues.valueChanges
      .subscribe(((changes) => {
        Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
        this.moviesEntityService.setFilter(changes);
      }));
    this.selectFilter()
    this.isLoading$ = this.moviesEntityService.loading$;
    this.isLoaded$ = this.moviesEntityService.loaded$;
    this.movies$ = this.moviesEntityService.filteredEntities$.pipe(
      map(entities => entities.filter(entity => entity.url)));/*.pipe(
          map((movies) => movies.filter((movie) => movie.countryCode === 'MX'))
        );*/
    //this.filteredEntities$ = this.moviesEntityService.filteredEntities$;
    // this.movies$ = this.route.data.pipe<MovieDto[]>(map((movies: MovieDto[]) => movies));
    // this.movie$ = this.selectMovie(this.firstSource);
  }

  selectFilter() {
    let obj = {
      // subdivision: this.subdivisions ? this.subdivisions.join('@@') : null, 
      countryCode: this.country,// ? this.countryCode : this.subdivisions.slice(0, 2)[0], 
      category: this.category
    };
    Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    this.moviesEntityService.setFilter(...[obj]);
    // console.log(obj)
  }

  get country(): string {
    return this.filterValues.get('country').value;
  }
  get category(): string {
    return this.filterValues.get('category').value;
  }

  selectMovie(channelId: string) {
    return this.movies$
      .pipe(
        map((movieArray) => movieArray.filter((movie) => movie.channelId === channelId).pop())
      );
  }

  notify(channelId: string) {
    console.log(channelId)
    this.movie$ = this.selectMovie(channelId);
  }
}

