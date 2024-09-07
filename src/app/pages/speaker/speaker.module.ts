import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakerPageRoutingModule } from './speaker-routing.module';

import { SpeakerPage } from './speaker.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerPageRoutingModule,
	SharedModule
  ],
  declarations: [SpeakerPage]
})
export class SpeakerPageModule {}
