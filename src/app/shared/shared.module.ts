import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,      
    FormsModule,       
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
