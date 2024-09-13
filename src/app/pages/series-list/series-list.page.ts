import { Component, Input, OnInit, Output, ɵɵInputTransformsFeature } from '@angular/core';
import { AlertController, ModalController, NavController, ViewDidEnter } from '@ionic/angular';
import { Subject, takeUntil, throwIfEmpty, timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series, SeriesList } from 'src/app/models/series.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
	selector: 'app-series-list',
	templateUrl: './series-list.page.html',
	styleUrls: ['./series-list.page.scss'],
})
export class SeriesListPage implements OnInit, ViewDidEnter
{
	@Input() embedded: boolean = false;

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private titleService: TitleService,
		private navController: NavController,
		private modalController: ModalController
	) { }

	title: string = 'Browse series';
	ngOnInit()
	{
		if (!this.embedded) this.titleService.setTitle(this.title);
		this.loadObject(false);
	}

	ionViewDidEnter()
	{
		if (!this.embedded) this.titleService.setTitle(this.title);
	}

	loading: boolean = false;
	loadingMore: boolean = false;
	seriesList: SeriesList | null = null;

	handleRefresh(event: any)
	{
		this.loading = true;
		this.seriesList = null;
		this.loadObject(true, event);
		// setTimeout(() =>
		// {
		// 	// Any calls to load data go here
		// }, 1000);
	}

	loadObject(refresh: boolean, event?: any)
	{
		if (event)
		{
			this.loadingMore = true;
		}
		else
		{
			this.loading = true;
		}

		const pageNumber = this.seriesList ? this.seriesList.page_number : 1;
		this.apiService.getSeriesListCached(refresh, pageNumber, constants.defaultPageSize)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SeriesList) =>
				{
					console.log(response);
					if (this.seriesList && !refresh)
					{
						this.seriesList.series = this.seriesList.series.concat(response.series);
						this.seriesList.page_number = response.page_number;
						this.seriesList.row_count = response.row_count;
					}
					else
					{
						this.seriesList = response;
					}
					this.loading = false;
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

	loadData(event: any)
	{
		if (this.seriesList && this.seriesList.page_number < (this.seriesList.row_count / this.seriesList.page_size))
		{
			this.seriesList.page_number++;
			this.loadObject(false, event);
		}
		else if (event)
		{
			event.target.complete();
		}
	}

	onSeriesSelected(series: Series)
	{
		if (this.embedded)
		{
			//dismiss the modal with the series
			this.modalController.dismiss(
				{
					series: series
				}
			);
		}
		else
		{
			this.navController.navigateForward(`browse/series/${series.series_id}`);
		}
	}

	closeModal()
	{
		this.modalController.dismiss();
	}
}
