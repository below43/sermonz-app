
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject, takeUntil, timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Book } from 'src/app/models/books.model';
import { Series, SeriesList } from 'src/app/models/series.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.page.html',
	styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit
{

	constructor(
		private apiService: ApiService,
		private alertController: AlertController
	) { }

	ngOnInit()
	{
		this.loadObject(false);
	}

	loading: boolean = false;
	loadingMore: boolean = false;
	bookList: Book[] | null = null;

	handleRefresh(event: any)
	{
		this.loading = true;
		this.bookList = null;
		this.loadObject(true, event);
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

		this.apiService.getBookListCached(refresh)
			.pipe(
				timeout(constants.defaultTimeout)
			).subscribe({
				next: (response: string[]) =>
				{
					console.log(response);

					let bookList = constants.booksOfTheBible.map(book =>
					{
						return {
							id: book,
							name: book,
							active: false,
							initials: book.split(' ').map((n: string) => n[0]).join('')
						};
					});

					bookList = bookList.map(book =>
					{
						return {
							...book,
							active: response.includes(book.name),
						};
					});

					this.bookList = bookList;

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

}
