import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sermon',
  templateUrl: './sermon.page.html',
  styleUrls: ['./sermon.page.scss'],
})
export class SermonPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loading: boolean = false;
}
