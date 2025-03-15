import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Series } from 'src/app/models/series.model';
import { SermonsList } from 'src/app/models/sermons.model';
import { Speaker } from 'src/app/models/speakers.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import { SeriesListPage } from '../series-list/series-list.page';
import { BookListPage } from '../book-list/book-list.page';
import { SpeakerListPage } from '../speaker-list/speaker-list.page';

@Component({
	selector: 'app-sermon-list',
	templateUrl: './sermon-list.page.html',
	styleUrls: ['./sermon-list.page.scss'],
	standalone: false
})
export class SermonListPage implements OnInit, ViewDidEnter
{
	searchTerm: string = '';
	filterSpeaker: Speaker | null = null;
	filterSeries: Series | null = null;
	filterBook: string = '';

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService,
		private modalController: ModalController
	) { }

	title: string = 'Search';
	ngOnInit()
	{
		this.titleService.setTitle(this.title);
		this.loadSermonsObject(false);
	}

	ionViewDidEnter()
	{
		this.titleService.setTitle(this.title);
	}

	loading: boolean = false;
	loadingSermons: boolean = false;
	loadingMore: boolean = false;
	sermonsList: SermonsList | null = null;

	handleRefresh(event: any)
	{
		this.sermonsList = null;
		this.loadSermonsObject(true, event);
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

		this.apiService.getSermonsCached(refresh, pageNumber, constants.defaultPageSize, this.searchTerm, this.filterBook, this.filterSpeaker?.id ?? undefined, this.filterSeries?.series_id ?? undefined, 'sermon_date', 'desc')
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SermonsList) =>
				{
					// console.log(response);
					if (this.sermonsList && !refresh)
					{
						if (this.sermonsList.sermons)
						{
							this.sermonsList.sermons = this.sermonsList.sermons.concat(response.sermons);
							this.sermonsList.page_number = response.page_number;
							this.sermonsList.row_count = response.row_count;
						}
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

	search(ev: any)
	{
		console.log(this.searchTerm);
		this.sermonsList = null;
		this.loadSermonsObject(false);
	}

	launchFilterModal(component: any)
	{
		const modal = this.modalController.create({
			component,
			componentProps: {
				embedded: true
			}
		});
		modal.then(modal => modal.present());
		modal.then(modal => modal.onDidDismiss().then(data =>
		{
			console.log(data);
			if (data && data.data)
			{
				if (data.data.series)
				{
					console.log(data.data.series);
					this.filterSeries = data.data.series;
				}
				else if (data.data.speaker)
				{
					console.log(data.data.speaker);
					this.filterSpeaker = data.data.speaker;
				}
				else if (data.data.book)
				{
					console.log(data.data.book);
					this.filterBook = data.data.book;
				}
				setTimeout(() =>
				{
					this.sermonsList = null;
					this.loadSermonsObject(false);
				}, 0);
			}
		}));
	}

	onFilterSeriesClicked(event: any)
	{
		if (this.filterSeries)
		{
			this.filterSeries = null;
			this.sermonsList = null;
			this.loadSermonsObject(false);
		}
		else
		{
			this.launchFilterModal(SeriesListPage);
		}
	}
	onFilterSpeakerClicked(event: any)
	{
		if (this.filterSpeaker)
		{
			this.filterSpeaker = null;
			this.sermonsList = null;
			this.loadSermonsObject(false);
		}
		else
		{
			this.launchFilterModal(SpeakerListPage);
		}
	}
	onFilterBookClicked(event: any)
	{
		if (this.filterBook)
		{
			this.filterBook = '';
			this.sermonsList = null;
			this.loadSermonsObject(false);
		}
		else
		{
			this.launchFilterModal(BookListPage);
		}
	}

}
