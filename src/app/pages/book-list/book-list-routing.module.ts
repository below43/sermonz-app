import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookListPage } from './book-list.page';

const routes: Routes = [
  {
    path: '',
    component: BookListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookListPageRoutingModule {}
