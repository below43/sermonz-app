import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodcastPageRoutingModule } from './podcast-routing.module';

import { PodcastPage } from './podcast.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastPageRoutingModule,
	SharedModule
  ],
  declarations: [PodcastPage]
})
export class PodcastPageModule {}
