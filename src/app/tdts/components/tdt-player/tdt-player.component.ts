import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { jelloAnimation } from 'angular-animations';
import { TdtDto } from '../../models/tdt-dto.model';
import { TdtsEntityService } from 'src/app/store/tdt/tdts-entity.service';

@Component({
  selector: 'app-tdt-player',
  templateUrl: './tdt-player.component.html',
  styleUrls: ['./tdt-player.component.scss'],
  animations: [
    jelloAnimation(),
  ]
})
export class TdtPlayerComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly tdtsEntityService: TdtsEntityService = inject(TdtsEntityService);
  tdt$!: Observable<TdtDto>;
  tdts$!: Observable<TdtDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;  // constructor() { this.tdt$ = this.tdtEntityService.entities$.pipe(map((tdts) => tdts.find((tdt) => tdt.id === this.route.snapshot.params['id']))); }

  ngOnInit(): void {
    this.tdts$ = this.tdtsEntityService.entities$;
    this.route.paramMap.subscribe(params => {
      this.tdt$ = this.tdts$.pipe(map((tdts) => tdts.find((tdt) => tdt.id == params.get('id'))));
    });
    // this.tdt$ = this.route.data.pipe<TdtDto>(map((tdt: TdtDto) => tdt));
  }
}
