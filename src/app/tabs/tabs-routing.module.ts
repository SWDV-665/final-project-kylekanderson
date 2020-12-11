import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'readings',
        loadChildren: () => import('../pages/readings/readings.module').then(m => m.ReadingsPageModule)
      },
      {
        path: 'historicaldata',
        loadChildren: () => import('../pages/historicaldata/historicaldata.module').then(m => m.HistoricalDataPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/readings',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/readings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
