import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject, takeUntil, timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-series-list',
	templateUrl: './series-list.page.html',
	styleUrls: ['./series-list.page.scss'],
})
export class SeriesListPage implements OnInit
{

	constructor(
		private apiService: ApiService,
		private alertController: AlertController
	) { }

	ngOnInit()
	{
		this.loadObject(false);
	}

	loading: boolean = false;
	pageNumber: number = 1;
	seriesList: SeriesList | null = null;

	loadObject(refresh: boolean)
	{
		this.loading = true;

		this.apiService.getSeriesList(this.pageNumber)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SeriesList) =>
				{
					console.log(response);

					this.seriesList = response;

					this.loading = false;
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
				}
			});

	}
}
