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
    loadChildren: () => import('./pages/podcast/podcast.module').then( m => m.PodcastPageModule)
  },
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
