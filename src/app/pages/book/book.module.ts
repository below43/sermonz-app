import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookPageRoutingModule } from './book-routing.module';

import { BookPage } from './book.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookPageRoutingModule,
	SharedModule
  ],
  declarations: [BookPage]
})
export class BookPageModule {}
