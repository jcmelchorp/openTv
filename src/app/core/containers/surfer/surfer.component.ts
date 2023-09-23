import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, from, map, of, take, tap } from 'rxjs';


import { Stream } from '../../../core/models/stream.model';
import { Country } from '../../../core/models/country.model';
import { Channel } from '../../../core/models/channel.model';
import { IptvDto } from '../../../core/models/iptv-dto.model';
import { Category } from '../../../core/models/category.model';
import { IptvDtoService } from '../../services';
import { IptvEntityService } from 'src/app/store/iptv/iptv-entity.service';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
})
export class SurferComponent implements OnInit {
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  public selectedIptv?: IptvDto;
  iptvsCount$!: Observable<number>;
  firstSource = 'https://vivo.canaloncelive.tv/alivepkgr3/ngrp:cepro_all/chunklist_b1131072.m3u8';

  constructor(
    private iptvEntityService: IptvEntityService
  ) {
    this.iptvsCount$ = this.iptvEntityService.count$;
    this.isLoading$ = this.iptvEntityService.loading$;
    this.isLoaded$ = this.iptvEntityService.loaded$;
    this.iptvs$ = this.iptvEntityService.entities$;
    // this.selectedIptv.streamUrl = this.firstSource;
    // this.iptvs$ = from(this.iptvDtoService.getChannels().then((iptvArray) => {
    //   this.selectedIptv = iptvArray.filter((iptv) => iptv.streamUrl === this.firstSource).pop();
    //   console.log('this.selectedIptv', this.selectedIptv);
    //   return iptvArray;
    // }));
    // this.iptv$.next(this.selectedIptv || new IptvDto());

  }

  ngOnInit(): void {

    this.iptv$ = this.iptvs$
      .pipe(
        take(1),
        map(
          (iptvArray) => iptvArray.find((iptv) => iptv.url === this.firstSource) || new IptvDto()
        ));
  }
  setFilter(countryCode?: string) {
    this.iptvEntityService.setFilter({ countryCode: countryCode });
  }
  // notify(url: string) {
  //   this.iptv$ = this.iptvs$
  //     .pipe(
  //       map(
  //         (iptvArray) => this.selectedIptv =
  //           iptvArray.find((iptv) => iptv.url === url) || new IptvDto()
  //       )
  //     );
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.iptv$.unsubscribe();
  }
}
