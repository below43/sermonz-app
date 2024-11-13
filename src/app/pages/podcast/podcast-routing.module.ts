import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastPage } from './podcast.page';

const routes: Routes = [
  {
    path: '',
    component: PodcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastPageRoutingModule {}
