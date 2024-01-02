import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DishesComponent } from './dishes.component';
import { RouterModule } from '@angular/router';
import { AdddishComponent } from './adddish/adddish.component';




@NgModule({
  declarations: [
    DishesComponent,
    AdddishComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule, RouterModule
  ]
})
export class DishesModule { }
