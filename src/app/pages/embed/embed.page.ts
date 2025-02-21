import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
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
	public sermonsList: SermonsList | null = null;
	public error: boolean = false;
	public homeUrl: string = environment.homeUrl;
	public appName: string = environment.appName;

	public type: WidgetType = 'mini';

	constructor(
		private menuController: MenuController,
		private apiService: ApiService
	)
	{

	}

	ngOnInit(): void
	{
		this.menuController.enable(false);
		this.loadObject();
	}

	loading: boolean = false;
	async loadObject()
	{
		this.loading = true;

		const pageNumber = 1;

		this.apiService.getSermonsCached(false, 1, 6, '', '', undefined, undefined, 'sermon_date', 'desc')
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: SermonsList) =>
				{
					this.sermonsList = response;

					this.loading = false;
				},
				error: (error: any) =>
				{
					console.error(error);
					this.loading = false;
					this.error = true;
				}
			});

	}

	loadSermon(sermon: Sermon)
	{
		window.open(`listen/${sermon.sermon_id}`, '_blank');
	}
}

export type WidgetType = 'mini' | 'large';