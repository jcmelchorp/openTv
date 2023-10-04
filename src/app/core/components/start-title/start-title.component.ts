import { Component, OnInit } from '@angular/core';
import { bounceInLeftOnEnterAnimation, bounceInUpOnEnterAnimation, hueRotateAnimation, jelloAnimation, rubberBandAnimation } from 'angular-animations';
@Component({
  selector: 'app-start-title',
  templateUrl: './start-title.component.html',
  styleUrls: ['./start-title.component.scss'],
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'enter1' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter2', delay: 200 }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter3', delay: 400 }),
    rubberBandAnimation({ anchor: 'rubberBand', delay: 500 }),
    jelloAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 })

  ]
})
export class StartTitleComponent {
  defaultElevation = 4;
  raisedElevation = 6;
  animation = 'rubberBand';
  animationState = false;
  animationWithState = false;
  hueBtnState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }
}


