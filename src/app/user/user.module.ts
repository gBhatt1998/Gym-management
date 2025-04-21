import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StaticPageComponent } from './components/static-page/static-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StaticPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],

})
export class UserModule { }
