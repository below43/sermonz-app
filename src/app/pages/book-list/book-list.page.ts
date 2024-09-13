
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertController, ModalController, NavController, ViewDidEnter } from '@ionic/angular';
import { Subject, takeUntil, timeout } from 'rxjs';
import { constants } from 'src/app/constants';
import { Book } from 'src/app/models/books.model';
import { Series, SeriesList } from 'src/app/models/series.model';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.page.html',
	styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit, ViewDidEnter
{
	@Input() embedded: boolean = false;

	constructor(
		private apiService: ApiService,
		private alertController: AlertController,
		private titleService: TitleService,
		private navController: NavController,
		private modalController: ModalController
	) { }

	title: string  = 'Browse books of the Bible';
	ngOnInit()
	{
		if (!this.embedded) this.titleService.setTitle(this.title);
		this.loadObject(false);
	}

	ionViewDidEnter()
	{
		if (!this.embedded) this.titleService.setTitle(this.title);
	}

	loading: boolean = false;
	loadingMore: boolean = false;
	bookList: Book[] | null = null;
	booksActive: number = 0;

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

					this.booksActive = response.length;

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

	onBookClicked(book: string)
	{
		if (this.embedded) {
			this.modalController.dismiss( { book: book });
		}
		else 
		{
			this.navController.navigateForward(`/browse/books/${book}`);
		}
	}

	closeModal()
	{
		this.modalController.dismiss();
	}
}
