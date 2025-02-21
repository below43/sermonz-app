import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmbedPageRoutingModule } from './embed-routing.module';

import { EmbedPage } from './embed.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmbedPageRoutingModule,
	SharedModule
  ],
  declarations: [EmbedPage]
})
export class EmbedPageModule {}
