import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { LayoutGridComponent } from './layout-grid/layout-grid.component';


const routes: Routes = [
  {
    path: 'user-table',
    component: UserTableComponent
  },
  {
    path: 'layout',
    component: LayoutGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
