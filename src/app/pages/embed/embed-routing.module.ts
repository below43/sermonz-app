import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmbedPage } from './embed.page';

const routes: Routes = [
  {
    path: '',
    component: EmbedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmbedPageRoutingModule {}
