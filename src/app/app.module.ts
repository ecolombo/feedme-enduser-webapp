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
import { CatbrowserComponent } from './components/catbrowser/catbrowser.component';
import { RestbrowserComponent } from './components/restbrowser/restbrowser.component';
import { DishbrowserComponent } from './components/dishbrowser/dishbrowser.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatbrowserComponent,
    RestbrowserComponent,
    DishbrowserComponent,
    HomeComponent
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
