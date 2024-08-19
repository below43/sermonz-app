import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonListPage } from './sermon-list.page';

const routes: Routes = [
  {
    path: '',
    component: SermonListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SermonListPageRoutingModule {}
