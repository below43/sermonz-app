import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sermon-list',
  templateUrl: './sermon-list.page.html',
  styleUrls: ['./sermon-list.page.scss'],
})
export class SermonListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  loading: boolean = false;

}
