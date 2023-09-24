import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take, map } from 'rxjs';
import { IptvDto } from 'src/app/iptvs/models/iptv-dto.model';
import { animateText, onMainContentChange, onSideNavChange } from '../../../shared/animations/sidenav.animations';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { IptvsEntityService } from 'src/app/store/iptv/iptvs-entity.service';

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
  // firstSource = 'XEIPN-TDT';
  constructor(
    private layoutService: LayoutService,
    public translate: TranslateService,
    // private iptvsEntityService: IptvsEntityService
  ) {
    translate.use('es');
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
    this.layoutService.sideNavState$.subscribe((state: boolean) => {
      this.onSideNavChange = state;
    });
    // this.iptvsCount$ = this.iptvsEntityService.count$;
    // this.isLoading$ = this.iptvsEntityService.loading$;
    // this.isLoaded$ = this.iptvsEntityService.loaded$;
    // this.iptvs$ = this.iptvsEntityService.entities$;
  }

  ngOnInit(): void {
    // this.selectIptv(this.firstSource);
  }
  // setFilter(countryCode?: string) {
  //   this.iptvsEntityService.setFilter({ countryCode: countryCode });
  // }

  // selectIptv(channelName: string) {
  //   this.iptv$ = this.iptvs$
  //     .pipe(
  //       map(
  //         (iptvArray) => this.selectedIptv =
  //           iptvArray.find((iptv) => iptv.channelName === channelName) || new IptvDto()
  //       )
  //     );
  // }
  // notify(channelName: string) {
  //   this.selectIptv(channelName);
  //   this.sidenavLeft.close();
  // }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100);
    this.layoutService.sideNavState$.next(this.sideNavState);
  }
}
