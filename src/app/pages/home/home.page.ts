
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { SeriesList } from 'src/app/models/series.model';
import { SermonsList } from 'src/app/models/sermons.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
})
export class HomePage implements OnInit, ViewDidEnter
{
	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
	podcast: string = environment.podcast;
	showBackLink: boolean = false;

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService
	) { }

	title: string = 'Latest';
	ngOnInit()
	{
		//if mobile, title should be app name
		if (window.innerWidth <= 990)
		{
			this.title = this.appName;
		}
		this.titleService.setTitle(this.title);
		this.loadSermonsObject(false);
		this.loadSeriesObject(false);

		setTimeout(() =>
		{
			//if ?back=true is in the URL, show the back link
			this.activatedRoute.queryParams.subscribe(params =>
			{
				if (params['back'] && params['back'] === 'true')
				{
					this.showBackLink = true;
					//without causing any navigation, remove the query parameter from the url bar
					const url = new URL(window.location.href);
					url.searchParams.delete('back');
					history.replaceState(null, '', url.toString());
				}
			});
		}, 100);

	}

	ionViewDidEnter()
	{
		this.titleService.setTitle(this.title);
	}

	loadingSeries: boolean = false;
	loadingSermons: boolean = false;
	loadingMore: boolean = false;
	sermonsList: SermonsList | null = null;
	seriesList: SeriesList | null = null;

	handleRefresh(event: any)
	{
		this.sermonsList = null;
		this.loadSermonsObject(true, event);
		this.loadSeriesObject(true, event);
	}

	loadSeriesObject(refresh: boolean, event?: any)
	{
		const pageNumber = 1;
		this.apiService.getSeriesListCached(refresh, pageNumber, 12)
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
					this.loadingSeries = false;
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
					this.loadingSeries = false;
					this.loadingMore = false;
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

		const pageNumber = 1;

		this.apiService.getSermonsCached(refresh, pageNumber, 12, '', '', undefined, undefined, 'sermon_date', 'desc')
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SermonsList) =>
				{
					// console.log(response);
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

					if (this.sermonsList != null)
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

	showHeader: boolean = false;
	handleScroll(event: any)
	{
		const currentY = event.detail.scrollTop;
		this.showHeader = currentY > 60;
	}

	goHome()
	{
		document.location.href = this.homeUrl;
	}
}
