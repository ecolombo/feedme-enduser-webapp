import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuards } from './guards/auth.guard';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AddrestaurantComponent } from './components/restaurants/addrestaurant/addrestaurant.component';
import { ViewrestaurantComponent } from './components/restaurants/viewrestaurant/viewrestaurant.component';
import { CategoriesComponent } from './components/restaurants/categories/categories.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AdddishComponent } from './components/dishes/adddish/adddish.component';

const routes: Routes = [

{ path: 'auth', children: [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]},
{ path: 'restaurants', children: [
  {path: '', component: RestaurantsComponent, canActivate: [AuthGuards]},
  {path: 'create', component: AddrestaurantComponent, canActivate: [AuthGuards]},
  {path: 'update', component: AddrestaurantComponent, canActivate: [AuthGuards]},
  {path: 'view', component: ViewrestaurantComponent, canActivate: [AuthGuards] },
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuards]}
]},
{ path: 'dishes', canActivate: [AuthGuards], children: [
  {path: '', component: DishesComponent},
  {path: 'create', component: AdddishComponent},
  {path: 'update', component: AdddishComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
