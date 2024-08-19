import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SermonPageRoutingModule } from './sermon-routing.module';

import { SermonPage } from './sermon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SermonPageRoutingModule
  ],
  declarations: [SermonPage]
})
export class SermonPageModule {}
