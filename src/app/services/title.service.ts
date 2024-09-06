import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TitleService
{

	constructor(
		private title: Title
	) { }

	public setTitle(title: string): void
	{
		this.title.setTitle(`${title} | ${environment.appName}`);
	}
}
