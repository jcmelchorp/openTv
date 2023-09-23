import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take, map } from 'rxjs';
import { IptvDto } from 'src/app/core/models/iptv-dto.model';
import { IptvEntityService } from 'src/app/store/iptv/iptv-entity.service';
import { animateText, onMainContentChange, onSideNavChange } from '../../animations/sidenav.animations';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [onMainContentChange, onSideNavChange, animateText],
})
export class SidenavComponent implements OnInit {
  @ViewChild('leftSidenav')
  sidenavLeft!: MatSidenav;
  @Input()
  isHandset!: boolean | null;
  iptv$!: Observable<IptvDto>;
  iptvs$!: Observable<IptvDto[]>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  public selectedIptv?: IptvDto;
  iptvsCount$!: Observable<number>;
  sideNavState: boolean = false;
  onSideNavChange: boolean;
  linkText: boolean = false;
  faCompressAlt = faCompressAlt;
  faExpandAlt = faExpandAlt;
  firstSource = 'XEIPN-TDT';
  constructor(
    private layoutService: LayoutService,
    public translate: TranslateService,
    private iptvEntityService: IptvEntityService
  ) {
    translate.use('es');
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
    this.layoutService.sideNavState$.subscribe((state: boolean) => {
      this.onSideNavChange = state;
    });
    this.iptvsCount$ = this.iptvEntityService.count$;
    this.isLoading$ = this.iptvEntityService.loading$;
    this.isLoaded$ = this.iptvEntityService.loaded$;
    this.iptvs$ = this.iptvEntityService.entities$;
  }

  ngOnInit(): void {
    this.selectIptv(this.firstSource);
  }
  // setFilter(countryCode?: string) {
  //   this.iptvEntityService.setFilter({ countryCode: countryCode });
  // }

  selectIptv(channelName: string) {
    this.iptv$ = this.iptvs$
      .pipe(
        map(
          (iptvArray) => this.selectedIptv =
            iptvArray.find((iptv) => iptv.channelName === channelName) || new IptvDto()
        )
      );
  }
  notify(channelName: string) {
    this.selectIptv(channelName);
    this.sidenavLeft.close();
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100);
    this.layoutService.sideNavState$.next(this.sideNavState);
  }
}
