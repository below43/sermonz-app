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
						path: 'series',
						loadChildren: () => import('../pages/series-list/series-list.module').then(m => m.SeriesListPageModule)
					},
					{
						path: 'series/:id',
						loadChildren: () => import('../pages/series/series.module').then(m => m.SeriePageModule)
					},
					{
						path: 'speakers',
						loadChildren: () => import('../pages/speaker-list/speaker-list.module').then( m => m.SpeakerListPageModule)
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
				loadChildren: () => import('../pages/sermon-list/sermon-list.module').then(m => m.SermonListPageModule)
			},
			{
				path: 'play',
				children: [
					{
						path: '',
						loadChildren: () => import('../pages/play/play.module').then(m => m.PlayPageModule)
					},
					{
						path: ':id/:title',
						loadChildren: () => import('../pages/sermon/sermon.module').then(m => m.SermonPageModule)
					},
					{
						path: ':id',
						loadChildren: () => import('../pages/sermon/sermon.module').then(m => m.SermonPageModule)
					},
				]
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
