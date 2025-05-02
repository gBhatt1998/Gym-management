import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StaticPageComponent } from './components/static-page/static-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';


@NgModule({
  declarations: [
    StaticPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AuthRoutingModule
  ],

})
export class UserModule { }
