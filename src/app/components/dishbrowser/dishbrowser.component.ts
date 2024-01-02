import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { Pageable } from 'src/app/model/pageable.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dishbrowser',
  templateUrl: './dishbrowser.component.html',
  styleUrls: ['./dishbrowser.component.css']
})
export class DishbrowserComponent implements OnInit {

  public dishes:any[]= [];
  fetching: boolean = true;
  public pageable:Pageable= { page:0, size:10, sort:'dishId', sortOrder:'DESC' };
  public restaurantName: string = "";

  constructor(private disheservice:DishesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getdishes();
  }

  getdishes() {
     const restId = this.route.snapshot.paramMap.get('restId');
     this.route.snapshot.queryParams
     // console.log("[ngOnInit] Selected Category: " + catId)
     this.disheservice.getDishes(this.pageable);
     this.disheservice.dishesSub.subscribe((data)=>{
       if(data.length !=0){
         this.dishes = Object.assign([],data);
         if (restId) {
           this.dishes = this.dishes.filter( (dish:Dish) => { return dish.restaurant?.restaurantId==restId; });
           this.restaurantName = this.dishes[0]?.restaurant?.name;
         }
         this.fetching = false;
       } 
     })
   }
}


export interface RestaurantCategory {
  restaurantCategoryId?: string;
  name?: string;
}

export interface Restaurant {
  restaurantId?: string;
  name?: string;
  description?: string;
  restaurantCategory?: RestaurantCategory;
  imageUrls?: string[];
  thumbnailImage?: number;
  addedOn?: Date;
}

export interface Dish {
  dishId?: number;
  name?: string;
  description?: string;
  imageUrl?:string;
  price?:number;
  addedon?: Date;
  restaurant?:Restaurant;
}
