import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-podcast',
	templateUrl: './podcast.page.html',
	styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit
{

	constructor() { }

	ngOnInit()
	{
	}

	loading: boolean = false;

	appName: string = environment.appName;
	home: string = environment.home;
	homeUrl: string = environment.homeUrl;
	copyright: string = environment.copyright;
	year: number = new Date().getFullYear();
	podcast: string = environment.podcast;

	goHome()
	{
		document.location.href = this.homeUrl;
	}
	copyPodcastUrl()
	{

		const podcastUrl = this.podcast;
		navigator.clipboard.writeText(podcastUrl).then(() =>
		{
			alert('Podcast URL copied to clipboard');
		}, (err) =>
		{
			console.error('Could not copy text: ', err);
		});
	}
	launchPodcastUrl() 
	{
		const podcastUrl = this.podcast.replace('https', 'podcast');
		window.open(podcastUrl, '_blank');
	}
}
