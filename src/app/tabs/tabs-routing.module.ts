import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [

			{
				path: 'home',
				loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
			},
			{
				path: 'browse',
				children: [
					{
						path: '',
						loadChildren: () => import('../pages/browse/browse.module').then(m => m.BrowsePageModule)
					},
					{
						path: 'sermons',
						loadChildren: () => import('../pages/sermon-list/sermon-list.module').then(m => m.SermonsPageModule)
					},
					{
						path: 'sermons/:id',
						loadChildren: () => import('../pages/sermon/sermon.module').then(m => m.SermonPageModule)
					},
					{
						path: 'series',
						loadChildren: () => import('../pages/series-list/series-list.module').then(m => m.SeriesPageModule)
					},
					{
						path: 'series/:id',
						loadChildren: () => import('../pages/series/series.module').then(m => m.SeriePageModule)
					},
					{
						path: 'speakers',
						loadChildren: () => import('../pages/speaker-list/speakers.module').then(m => m.SpeakersPageModule)
					},
					{
						path: 'speakers/:id',
						loadChildren: () => import('../pages/speaker/speaker.module').then(m => m.SpeakerPageModule)
					},
					{
						path: 'books',
						loadChildren: () => import('../pages/book-list/book-list.module').then(m => m.BookListPageModule)
					},
					{
						path: 'books/:id',
						loadChildren: () => import('../pages/book/book.module').then(m => m.BookPageModule)
					},
				]
			},
			{
				path: 'search',
				loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
			},
			{
				path: 'play',
				loadChildren: () => import('../pages/play/play.module').then(m => m.PlayPageModule)
			},
			{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }