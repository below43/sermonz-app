import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-play',
    templateUrl: './play.page.html',
    styleUrls: ['./play.page.scss'],
    standalone: false
})
export class PlayPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loading: boolean = false;
}
