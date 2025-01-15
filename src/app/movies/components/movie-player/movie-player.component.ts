import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MoviesEntityService } from 'src/app/store/movie/movies-entity.service';
import { Movie } from '../../models/movie.model';
import { StarRatingColor } from 'src/app/shared/components';
import { MoviesService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import videojs from 'video.js';
import 'videojs-playlist';
import '@videojs/http-streaming';

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.scss']
})
export class MoviePlayerComponent{
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly moviesEntityService: MoviesEntityService = inject(MoviesEntityService);
  @ViewChild('target') target: ElementRef;
  // private readonly moviesService: MoviesService = inject(MoviesService);
  movie$!: Observable<Movie>;
  movies$!: Observable<Movie[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;  // constructor() { this.movie$ = this.movieEntityService.entities$.pipe(map((movies) => movies.find((movie) => movie.id === this.route.snapshot.params['id']))); }
  starColor: StarRatingColor = StarRatingColor.accent;
  private video: HTMLVideoElement; 
  player: any;
  options:any;
    
  ngOnInit(): void {
    this.movie$ =this.route.paramMap.pipe(
      switchMap(params =>        this.moviesEntityService.entities$.pipe(
        map((movies) => {
          let movie= movies.find((movie) => movie.id == params.get('id'))
          this.options = {
            preload: 'metadata',
            controls: true,
            autoplay: true,
            overrideNative: true,
            techOrder: ['html5'],
            html5: {
              nativeVideoTracks: false,
              nativeAudioTracks: false,
              nativeTextTracks: false,
              vhs: {
                withCredentials: false,
                overrideNative: true,
                debug: true,
              },
            },
            playsinline: true,
            bigPlayButton: false,
            liveui: true,
            sources: [
                {
                  src: movie.url,
                  type: 'video/mp4',
                },
            ],
          };
          return movie
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
    this.establishVideojsStream();

  }
  private establishVideojsStream() {
    this.player = videojs('my-video', this.options);
    this.player.on('pause', this.videoEve.bind(this));
    this.player.on('ready', () => {
      this.player.tech().on('usage', (e) => {
        //console.log(e.name);
      });
    });
   
  }
  
  videoEve() {
    console.log(this.player.currentTime());
  }
  // this.movie$ = this.route.data.pipe<MovieDto>(map((movie: MovieDto) => movie));
}


