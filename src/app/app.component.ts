import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent
{
	constructor() { }

	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
}
