import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-title',
  templateUrl: './start-title.component.html',
  styleUrls: ['./start-title.component.scss']
})
export class StartTitleComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;
  constructor() { }

  ngOnInit() {
  }

}
