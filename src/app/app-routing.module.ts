import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
	},
	{
		path: 'podcast',
		loadChildren: () => import('./pages/podcast/podcast.module').then(m => m.PodcastPageModule)
	},
	{
		path: 'embed',
		loadChildren: () => import('./pages/embed/embed.module').then(m => m.EmbedPageModule)
	},
	{
		path: 'splash',
		loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
