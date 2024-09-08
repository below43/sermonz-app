import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { SermonsList } from 'src/app/models/sermons.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-sermon-list',
  templateUrl: './sermon-list.page.html',
  styleUrls: ['./sermon-list.page.scss'],
})
export class SermonListPage implements OnInit, ViewDidEnter
{

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService
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
		
		this.apiService.getSermonsCached(refresh, pageNumber, constants.defaultPageSize, '', '', undefined, undefined, 'sermon_date', 'desc')
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

	showHeader: boolean = false;
	handleScroll(event:any) {
	  const currentY = event.detail.scrollTop;
	  this.showHeader = currentY > 60; 
	}
}
