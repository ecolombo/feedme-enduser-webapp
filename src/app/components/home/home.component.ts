import { Component, OnInit } from '@angular/core';
import { RestaurantCategoriesService } from 'src/app/services/restaurantcategories.service';
import { Pageable } from 'src/app/model/pageable.model';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fetchingCat: boolean = true;
  pageableCat: Pageable= { page:0, size:1000, sort:'restaurantCategoryId', sortOrder:'DESC' };
  public nrCat: number = 0;

  public fetchingDishes: boolean = true;
  pageableDishes:Pageable= { page:0, size:1000, sort:'dishId', sortOrder:'DESC' };
  public nrDishes: number = 0;

  public fetchingRest: boolean = true;
  pageableRest:Pageable= { page:0, size:1000, sort:'restaurantId', sortOrder:'DESC' };
  public nrRest: number = 0;

  constructor(private restaurantCategorieservice:RestaurantCategoriesService,
          private disheservice:DishesService, private restaurantsService:RestaurantsService) { }


  ngOnInit(): void {
    this.getrestaurantCategories();
    this.getdishes();
    this.getRestaurants();
  }
  
  getrestaurantCategories() {
    this.restaurantCategorieservice.getCategories(this.pageableCat);
    this.restaurantCategorieservice.categoriesSub.subscribe((data)=>{
      this.nrCat = data.length;
      this.fetchingCat = false;
    })
  }

  getdishes() {
    this.disheservice.getDishes(this.pageableDishes);
    this.disheservice.dishesSub.subscribe((data)=>{
      this.nrDishes = data.length;
      this.fetchingDishes = false;
   })
  }  

  getRestaurants() {
   this.restaurantsService.getRestaurants(this.pageableRest);
   this.restaurantsService.restaurantsSub.subscribe((data)=>{
    this.nrRest = data.length;
    this.fetchingRest = false;     
   })
 }

}


