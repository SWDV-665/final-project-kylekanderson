import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadingsPage } from './readings.page';

import { ReadingsPageRoutingModule } from './readings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReadingsPageRoutingModule
  ],
  declarations: [ReadingsPage]
})
export class ReadingsPageModule {}
