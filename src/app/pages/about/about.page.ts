import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
    standalone: false
})
export class AboutPage implements OnInit
{

	constructor() { }

	ngOnInit()
	{
	}

	loading: boolean = false;

	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
	podcast: string = environment.podcast;

	goHome()
	{
		document.location.href = this.homeUrl;
	}
}
