import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-series',
	templateUrl: './series.page.html',
	styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit
{

	id: string | null = null;
	title: string = 'Series';

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController
	) { }

	ngOnInit()
	{
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		this.id = id;


		this.loadObject(false);
	}

	loading: boolean = false;
	loadingMore: boolean = false;
	series: Series | null = null;

	sermons: any | null = null;

	handleRefresh(event: any)
	{
		this.loading = true;
		this.series = null;
		this.sermons = null;
		this.loadObject(true, event);
		// setTimeout(() =>
		// {
		// 	// Any calls to load data go here
		// }, 1000);
	}

	loadObject(refresh: boolean, event?: any)
	{
		this.loading = true;

		if (!this.id)
		{
			//show an error and when ok clicked, go to browse series page
			this.alertController.create({
				header: 'Error',
				message: 'No series ID was provided.',
				buttons: [
					{
						text: 'OK',
						handler: () =>
						{
							this.navController.navigateRoot('/series-list');
						}
					}
				]
			}).then(alert => alert.present());
			return;
		}

		this.apiService.getSeriesByIdCached(this.id, refresh)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: Series) =>
				{
					console.log(response);
					this.series = response;

					this.title = `Series: ${response.series_name}`;

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
						message: 'An error occurred while loading the series.',
						buttons: ['OK']
					}).then(alert => alert.present());
					this.loading = false;
					this.loadingMore = false;
					if (event)
					{
						event.target.complete();
					}
				}
			});

	}
}