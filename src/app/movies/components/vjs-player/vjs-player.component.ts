import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MoviesEntityService } from 'src/app/store/movie/movies-entity.service';
import videojs from 'video.js';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-vjs-player',
  template: `
    <video #target class="video-js" controls muted playsinline preload="none"></video>
  `,
  styleUrls: [
    './vjs-player.component.css'
  ],
  //encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
  
})

export class VjsPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly moviesEntityService: MoviesEntityService = inject(MoviesEntityService);
  @ViewChild('target', { static: true }) target: ElementRef;
  movie$!: Observable<Movie>;
  movies$!: Observable<Movie[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
movie:Movie;
  // See options: https://videojs.com/guides/options
  options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };

  player: any;

  constructor(
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.moviesEntityService.entities$.pipe(
        map((movies) => {
          this.movie = movies.find((movie) => movie.id == params.get('id'));
          return this.movie
        }),
        // switchMap((movie) => this.moviesService.getInfo(movie.name)
        //   .pipe(
        //     map((info) => ({ ...movie, ...info } as Movie)),
        //     tap((movie) =>console.log(movie))
        //   )
        // )
      )
      )
    )
    }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   
  }
    // Dispose the player OnDestroy
    ngOnDestroy() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
