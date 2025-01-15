import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from 'src/app/movies/models/movie.model';
import videojs from 'video.js';
import 'videojs-playlist';
import '@videojs/http-streaming';

@Directive({
  selector: '[appVideojsPlayer]'
})
export class VideojsPlayerDirective {
  @Input()
  public stream!: string;
  private video: HTMLVideoElement; 
  player: any;
  options:any;

  constructor(
    private el: ElementRef<HTMLVideoElement>,
    private snackBar: MatSnackBar,
  ) {
    this.video = this.el.nativeElement;
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
            src: this.stream,
            type: 'video/mp4',
          },
        // {
        //   src: 'https://objectstorage.us-phoenix-1.oraclecloud.com/n/axa4wow3dcia/b/bucket-20201001-1658/o/2022pelicu%2Fjulio%2FVer%20Predator-%20La%20presa%20Online%20Castellano%20Latino%20Subtitulada%20HD%20-%20HDFull.mp4',
        //   type: 'video/mp4',
        //   //  type: 'application/vnd.apple.mpegurl',
        // },
      ],
    };
  }

  
  ngOnInit() {
    console.log('Stream: ', this.stream);
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
}
