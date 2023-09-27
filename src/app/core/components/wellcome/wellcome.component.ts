import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss']
})
export class WellcomeComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;
  constructor() { }

  ngOnInit(): void {

  }
}
