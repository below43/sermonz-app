import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { TitleService } from 'src/app/services/title.service';

@Component({
	selector: 'app-browse',
	templateUrl: './browse.page.html',
	styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit, ViewDidEnter
{

	constructor(
		private titleService: TitleService
	) { }

	title: string = 'Browse';
	ngOnInit()
	{
		this.titleService.setTitle(this.title);
	}

	ionViewDidEnter()
	{
		this.titleService.setTitle(this.title);
	}
}
