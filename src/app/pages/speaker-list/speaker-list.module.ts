import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakerListPageRoutingModule } from './speaker-list-routing.module';

import { SpeakerListPage } from './speaker-list.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerListPageRoutingModule,
	SharedModule
  ],
  declarations: [SpeakerListPage]
})
export class SpeakerListPageModule {}
