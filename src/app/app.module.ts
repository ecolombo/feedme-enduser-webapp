import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './components/auth/auth.module';
import { RestaurantsModule } from './components/restaurants/restaurants.module';

import { RouterModule } from '@angular/router';
import { DishesModule } from './components/dishes/dishes.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    HttpClientModule,
    AuthModule,
    RestaurantsModule,
    RouterModule,
    DishesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
