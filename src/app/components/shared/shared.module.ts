import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedGridComponent } from './fixed-grid/fixed-grid.component';
import { IonicModule } from '@ionic/angular';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
	FixedGridComponent,
	SkeletonComponent,
	HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
	FixedGridComponent,
	SkeletonComponent,
	HeaderComponent
  ]
})
export class SharedModule { }
