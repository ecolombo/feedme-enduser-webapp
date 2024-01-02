import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurants.component';
import { AddrestaurantComponent } from './addrestaurant/addrestaurant.component';
import { ViewrestaurantComponent } from './viewrestaurant/viewrestaurant.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RestaurantsComponent,
    AddrestaurantComponent,
    ViewrestaurantComponent,
    AddcategoryComponent,
    CategoriesComponent
    ],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule, RouterModule
  ]
})
export class RestaurantsModule { }
