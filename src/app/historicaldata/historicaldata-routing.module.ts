import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricalDataPage } from './historicaldata.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricalDataPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricalDataPageRoutingModule {}
