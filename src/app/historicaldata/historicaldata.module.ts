import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricalDataPage } from './historicaldata.page';

import { HistoricalDataPageRoutingModule } from './historicaldata-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HistoricalDataPageRoutingModule
  ],
  declarations: [HistoricalDataPage]
})
export class HistoricalDataPageModule {}
