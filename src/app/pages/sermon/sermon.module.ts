import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SermonPageRoutingModule } from './sermon-routing.module';

import { SermonPage } from './sermon.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SermonPageRoutingModule,
	SharedModule
  ],
  declarations: [SermonPage]
})
export class SermonPageModule {}
