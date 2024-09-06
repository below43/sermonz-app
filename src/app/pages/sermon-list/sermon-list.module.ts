import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SermonListPageRoutingModule } from './sermon-list-routing.module';

import { SermonListPage } from './sermon-list.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SermonListPageRoutingModule,
	SharedModule
  ],
  declarations: [SermonListPage]
})
export class SermonListPageModule {}
