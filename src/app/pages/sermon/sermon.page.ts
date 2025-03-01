

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { Sermon, SermonsList } from 'src/app/models/sermons.model';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
    selector: 'app-sermon',
    templateUrl: './sermon.page.html',
    styleUrls: ['./sermon.page.scss'],
    standalone: false
})
export class SermonPage implements OnInit, ViewDidEnter
{

	id: string | null = null;
	referrer: string = "/search";

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService,
		private location: Location,
		private messageService: MessageService

	) { }

	title: string = 'Sermon';
	ngOnInit()
	{
		this.titleService.setTitle(this.title);
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		this.id = id;

		this.loadSermonObject(false);
	}

	goBack()
	{
		if (this.location.path() !== '')
		{
			this.location.back();
		} else
		{
			this.navController.navigateRoot('/search');
		}
	}

	ionViewDidEnter()
	{
		this.titleService.setTitle(this.title);
	}

	loading: boolean = false;
	sermon: Sermon | null = null;

	handleRefresh(event: any)
	{
		this.sermon = null;
		this.loadSermonObject(true, event);
	}

	loadSermonObject(refresh: boolean, event?: any)
	{
		this.loading = true;

		if (!this.id)
		{
			//show an error and when ok clicked, go to browse series page
			this.alertController.create({
				header: 'Error',
				message: 'No sermon ID was provided.',
				buttons: [
					{
						text: 'OK',
						handler: () =>
						{
							this.navController.navigateRoot('/search');
						}
					}
				]
			}).then(alert => alert.present());
			return;
		}

		this.apiService.getSermonByIdCached(this.id, refresh)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: Sermon) =>
				{
					console.log(response);
					this.sermon = response;

					this.title = `${response.sermon_title}`;
					this.titleService.setTitle(this.title);

					this.loading = false;
					if (event)
					{
						event.target.complete();
					}

					this.messageService.activeTalk.next(this.id ?? '');
				},
				error: (error: any) =>
				{
					console.error(error);
					this.alertController.create({
						header: 'Error',
						message: 'An error occurred while loading the sermon.',
						buttons: ['OK']
					}).then(alert => alert.present());

					this.loading = false;
					if (event)
					{
						event.target.complete();
					}
				}
			});
	}

	downloadTalk()
	{
		if (!this.sermon || !this.sermon.sermon_file)
		{
			console.error('No sermon file available for download.');
			return;
		}

		// Create a temporary anchor element
		const a = document.createElement('a');
		//set target to _blank to open in new tab
		a.target = '_blank';
		a.href = this.sermon.sermon_file;
		a.download = this.sermon.sermon_title || 'download'; // Use the sermon title as the filename, or default to 'download'
		document.body.appendChild(a); // Append the anchor to the body to make it clickable
		a.click(); // Simulate a click on the anchor
		document.body.removeChild(a); // Clean up by removing the anchor from the body
	}
}