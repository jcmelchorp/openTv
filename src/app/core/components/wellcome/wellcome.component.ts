import { Component, OnInit } from '@angular/core';
import { bounceInLeftOnEnterAnimation, bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'enter1', delay: 100 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter2', delay: 150 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter4', delay: 250 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter5', delay: 300 }),
  ]
})
export class WellcomeComponent {
  animationState = false;
  animationWithState = false;
  hueBtnState = false;

}
