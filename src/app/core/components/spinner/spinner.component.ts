import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../shared/services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
