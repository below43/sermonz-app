import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { Sermon, SermonsList } from 'src/app/models/sermons.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-embed',
	templateUrl: './embed.page.html',
	styleUrls: ['./embed.page.scss'],
	standalone: false
})
export class EmbedPage implements OnInit 
{
	public error: boolean = false;
	public homeUrl: string = environment.homeUrl;
	public appName: string = environment.appName;

	public type: WidgetType = 'mini';

	constructor(
		private menuController: MenuController,
		private apiService: ApiService,
		private activatedRoute: ActivatedRoute
	)
	{

	}

	ngOnInit()
	{

		const type = this.activatedRoute.snapshot.paramMap.get('type');
		if (type === 'large')
		{
			this.type = 'large';
		}

		this.menuController.enable(false);
		this.loadObject();
	}

	loadingSermons: boolean = false;
	loadingSeries: boolean = false;
	sermonsList: SermonsList | null = null;
	seriesList: SeriesList | null = null;
	async loadObject()
	{
		this.loadingSermons = true;

		this.apiService.getSermonsCached(false, 1, 6, '', '', undefined, undefined, 'sermon_date', 'desc')
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SermonsList) =>
				{
					this.sermonsList = response;

					this.loadingSermons = false;
				},
				error: (error: any) =>
				{
					console.error(error);
					this.loadingSermons = false;
					this.error = true;
				}
			});

		if (this.type === 'large')
		{
			this.loadingSeries = true;
			this.apiService.getSeriesListCached(false, 1, 6)
				.pipe(
					timeout(constants.defaultTimeout)
				)
				.subscribe({
					next: (response: SeriesList) =>
					{
						if (this.seriesList)
						{
							this.seriesList.series = this.seriesList.series.concat(response.series);
							this.seriesList.page_number = response.page_number;
							this.seriesList.row_count = response.row_count;
						}
						else
						{
							this.seriesList = response;
						}
						this.loadingSeries = false;
					},
					error: (error: any) =>
					{
						console.error(error);
						this.loadingSeries = false;
						this.error = true;
					}
				});
		}
	}

	loadSermon(sermon: Sermon)
	{
		window.open(`listen/${sermon.sermon_id}`, '_blank');
	}

	loadSeries(series: Series)
	{
		window.open(`browse/series/${series.series_id}`, '_blank');
	}

	viewMoreSermons()
	{
		window.open('search', '_blank');
	}

	viewMoreSeries()
	{
		window.open('browse/series', '_blank');
	}
}

export type WidgetType = 'mini' | 'large';