import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonPage } from './sermon.page';

const routes: Routes = [
  {
    path: '',
    component: SermonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SermonPageRoutingModule {}
