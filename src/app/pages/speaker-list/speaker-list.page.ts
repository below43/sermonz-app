
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ViewDidEnter } from '@ionic/angular';
import { timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { SermonsList } from 'src/app/models/sermons.model';
import { Speaker } from 'src/app/models/speakers.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.page.html',
  styleUrls: ['./speaker-list.page.scss'],
})
export class SpeakerListPage implements OnInit, ViewDidEnter
{

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private titleService: TitleService
	) { }

	title: string = 'Browse speakers';
	ngOnInit()
	{
		this.titleService.setTitle(this.title);
		this.loadSpeakersObject(false);
	}

	ionViewDidEnter()
	{
		this.titleService.setTitle(this.title);
	}

	loading: boolean = false;
	loadingMore: boolean = false;
	speakersList: Speaker[] | null = null;
	highFrequencyList: Speaker[] | null = null;

	handleRefresh(event: any)
	{
		this.speakersList = null;
		this.loadSpeakersObject(true, event);
	}
	
	loadSpeakersObject(refresh: boolean, event?: any)
	{
		if (event)
		{
			this.loadingMore = true;
		}
		else
		{
			this.loading = true;
		}
		
		this.apiService.getSpeakersCached(refresh)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: Speaker[]) =>
				{
					console.log(response);
					this.speakersList = response;
					//set initials from speaker.name
					this.speakersList.forEach(speaker => {
						var name = speaker.name;
						//change to alpha characters only
						name = name.replace(/[^a-zA-Z ]/g, '');
						speaker.initials = name.split(' ').map((n: string) => n.charAt(0)).join('');
						if (speaker.initials.length > 2)
						{
							speaker.initials = speaker.initials.substr(0, 2);
						}
						if (speaker.initials.length === 1)
						{
							speaker.initials = speaker.initials + speaker.initials;
						}
					});

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
						message: 'An error occurred while loading the sermons.',
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
