

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { Sermon, SermonsList } from 'src/app/models/sermons.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
	selector: 'app-sermon',
	templateUrl: './sermon.page.html',
	styleUrls: ['./sermon.page.scss'],
})
export class SermonPage implements OnInit, ViewDidEnter
{

	id: string | null = null;

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService
	) { }

	title: string = 'Sermon';
	ngOnInit()
	{
		this.titleService.setTitle(this.title);
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		this.id = id;

		this.loadSermonObject(false);
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

}