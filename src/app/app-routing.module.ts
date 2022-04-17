import { FinanceDeleteComponent } from './components/finance/finance-delete/finance-delete.component';
import { FinanceUpdateComponent } from './components/finance/finance-update/finance-update.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { FinanceCrudComponent } from './views/finance-crud/finance-crud.component';
import { FinanceCreateComponent } from './components/finance/finance-create/finance-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, 
  {
    path: "finances",
    component: FinanceCrudComponent
  },
  {
    path: "finances/create",
    component: FinanceCreateComponent
  },
  {
    path: "finances/update/:id",
    component: FinanceUpdateComponent
  },
  {
    path: "finances/delete/:id",
    component: FinanceDeleteComponent
  }    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
