import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IptvDto } from '../../models/iptv-dto.model';
import { ActivatedRoute } from '@angular/router';
import { IptvsEntityService } from '../../../store/iptv/iptvs-entity.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  iptvsCount$!: Observable<number>;
  // public startedPlay: boolean = true;
  // public show: boolean = true;
  id: string;
  constructor(
    private _activatedroute: ActivatedRoute,
    private iptvsEntityService: IptvsEntityService
  ) {
    // this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.iptvsCount$ = this.iptvsEntityService.count$;
    this.isLoading$ = this.iptvsEntityService.loading$;
    this.isLoaded$ = this.iptvsEntityService.loaded$;
    this.iptvs$ = this.iptvsEntityService.entities$;
    // console.log(this.id);

  }
  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.iptv$ = this.iptvs$.pipe(map((iptvs) => iptvs.find((iptv) => iptv.id == this.id)));
    });
  }
}
