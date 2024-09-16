import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { MessageService } from './services/message.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit
{
	constructor(
		private navController: NavController,
		private messageService: MessageService
	) { }

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

	activeTalk: string = '';
	ngOnInit(): void
	{
		this.messageService.activeTalk.subscribe((activeTalk) =>
		{
			if (activeTalk === '')
			{
				this.activeTalk = '';
			} else
			{
				this.activeTalk = activeTalk;
			}
		});
	}
}
