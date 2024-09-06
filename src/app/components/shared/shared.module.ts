import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedGridComponent } from './fixed-grid/fixed-grid.component';
import { IonicModule } from '@ionic/angular';
import { SkeletonComponent } from './skeleton/skeleton.component';



@NgModule({
  declarations: [
	FixedGridComponent,
	SkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
	FixedGridComponent,
	SkeletonComponent
  ]
})
export class SharedModule { }
