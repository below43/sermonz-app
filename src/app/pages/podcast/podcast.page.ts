import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.page.html',
    styleUrls: ['./podcast.page.scss'],
    standalone: false
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
	podcast_apple: string = environment.podcast_apple;
	podcast_spotify: string = environment.podcast_spotify;

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
	
	openUrl(url: 'podcast_apple' | 'podcast_spotify' | 'podcast') 
	{
		switch (url) {
			case 'podcast':
				const podcastUrl = this.podcast.replace('https', 'podcast');
				window.open(podcastUrl, '_blank');
				break;
			case 'podcast_apple':
 				window.open(this.podcast_apple, '_blank');
				break;
			case 'podcast_spotify':
				window.open(this.podcast_spotify, '_blank');
				break;
		}
	}
}
