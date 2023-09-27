import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { IptvDto } from '../../models/iptv-dto.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IptvsEntityService } from 'src/app/store/iptv/iptvs-entity.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly iptvsEntityService: IptvsEntityService = inject(IptvsEntityService);
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;  // constructor() { this.iptv$ = this.iptvEntityService.entities$.pipe(map((iptvs) => iptvs.find((iptv) => iptv.id === this.route.snapshot.params['id']))); }
  ngOnInit(): void {
    this.iptvs$ = this.iptvsEntityService.entities$;
    this.route.paramMap.subscribe(params => {
      this.iptv$ = this.iptvs$.pipe(map((iptvs) => iptvs.find((iptv) => iptv.id == params.get('id'))));
    });
    // this.iptv$ = this.route.data.pipe<IptvDto>(map((iptv: IptvDto) => iptv));
  }
}
