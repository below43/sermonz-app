import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedGridComponent } from './fixed-grid/fixed-grid.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
	FixedGridComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
	FixedGridComponent
  ]
})
export class SharedModule { }
