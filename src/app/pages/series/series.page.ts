import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { SermonsList } from 'src/app/models/sermons.model';
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

		this.loadSeriesObject(false);
		this.loadSermonsObject(false);
	}

	loading: boolean = false;
	loadingSermons: boolean = false;
	loadingMore: boolean = false;
	series: Series | null = null;
	sermonsList: SermonsList | null = null;

	handleRefresh(event: any)
	{
		this.series = null;
		this.sermonsList = null;
		this.loadSeriesObject(true, event);
		this.loadSermonsObject(true, event);
	}

	loadSeriesObject(refresh: boolean, event?: any)
	{
		this.loading = true;
		this.loadingSermons = true;

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
					if (event)
					{
						event.target.complete();
					}
				}
			});
	}

	loadSermonsObject(refresh: boolean, event?: any)
	{
		if (event)
		{
			this.loadingMore = true;
		}
		else
		{
			this.loadingSermons = true;
		}

		const pageNumber = this.sermonsList ? this.sermonsList.page_number : 1;
		const seriesId = parseInt(this.id || '0');
		this.apiService.getSermonsCached(refresh, pageNumber, constants.defaultPageSize, '', '', 0, seriesId, 'sermon_date', 'asc')
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SermonsList) =>
				{
					console.log(response);
					if (this.sermonsList && !refresh)
					{
						this.sermonsList.sermons = this.sermonsList.sermons.concat(response.sermons);
						this.sermonsList.page_number = response.page_number;
						this.sermonsList.row_count = response.row_count;
					}
					else
					{
						this.sermonsList = response;
					}

					if (this.sermonsList!=null)
					{
						//append a row index to the sermons
						this.sermonsList.sermons.forEach((sermon, index) =>
						{
							sermon.row_index = index + 1;
						});
					}
					this.loadingSermons = false;
					this.loadingMore = false;
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
						message: 'An error occurred while loading the sermons.',
						buttons: ['OK']
					}).then(alert => alert.present());
					this.loadingSermons = false;
					this.loadingMore = false;
					if (event)
					{
						event.target.complete();
					}
				}
			});

	}

	loadData(event: any)
	{
		if (this.sermonsList && this.sermonsList.page_number < (this.sermonsList.row_count / this.sermonsList.page_size))
		{
			this.sermonsList.page_number++;
			this.loadSermonsObject(false, event);
		}
		else if (event)
		{
			event.target.complete();
		}
	}

}