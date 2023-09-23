import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IptvDto } from '../../models/iptv-dto.model';
import { ActivatedRoute } from '@angular/router';
import { IptvEntityService } from 'src/app/store/iptv/iptv-entity.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  iptvsCount$!: Observable<number>;
  // public startedPlay: boolean = true;
  // public show: boolean = true;
  id: string;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private iptvEntityService: IptvEntityService
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.iptvsCount$ = this.iptvEntityService.count$;
    this.isLoading$ = this.iptvEntityService.loading$;
    this.isLoaded$ = this.iptvEntityService.loaded$;
    this.iptvs$ = this.iptvEntityService.entities$;
    this.iptv$ = this.iptvs$.pipe(map((iptvs) => iptvs.find((iptv) => iptv.id == this.id)));
  }
  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.videoSource = this.firstSource;

  }
}
