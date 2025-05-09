import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticPageComponent } from './components/static-page/static-page.component';

const routes: Routes = [
  { path: '', component: StaticPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
