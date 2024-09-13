import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent
{
	constructor(
		private navController: NavController
	) { }

	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
	podcast: string = environment.podcast;

	goHome() {
		document.location.href = this.homeUrl;
	}
}
