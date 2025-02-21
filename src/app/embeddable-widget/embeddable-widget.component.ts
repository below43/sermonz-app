import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { timeout } from 'rxjs';
import { constants } from '../constants';
import { SermonsList } from '../models/sermons.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-embeddable-widget',
    templateUrl: './embeddable-widget.component.html',
    styleUrls: ['./embeddable-widget.component.scss'],
    standalone: false
})
export class EmbeddableWidgetComponent
{
	@Input() type: WidgetType = 'mini';

	public sermonsList: SermonsList | null = null;
	public error: boolean = false;
	public homeUrl: string = environment.homeUrl;
	public appName: string = environment.appName;

	constructor(
		private apiService: ApiService
	) { }

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


}

export type WidgetType = 'mini' | 'full';
