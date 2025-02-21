import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { MessageService } from './services/message.service';
import { ActivatedRoute } from '@angular/router';
import { WidgetType } from './embeddable-widget/embeddable-widget.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit
{
	constructor(
		private navController: NavController,
		private messageService: MessageService,
		private activatedRoute: ActivatedRoute
	) { }

	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
	podcast: string = environment.podcast;
	showBackLink: boolean = false;
	widget: WidgetType | undefined = undefined;

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

		this.activatedRoute.queryParams.subscribe(params =>
		{
			if (params['back'] && params['back'] === 'true')
			{
				this.showBackLink = true;
			}
			if (params['widget'])
			{
				this.widget = params['widget'] as WidgetType ?? undefined;
			}
		});
	}
}
