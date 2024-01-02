import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Pageable } from 'src/app/model/pageable.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restbrowser',
  templateUrl: './restbrowser.component.html',
  styleUrls: ['./restbrowser.component.css']
})
export class RestbrowserComponent {

  public restaurants:any[]= [];
  fetching: boolean = true;
  public pageable:Pageable= { page:0, size:10, sort:'restaurantId', sortOrder:'DESC' };

  public selectedImageIdx: number = 0;
  public thumbnailImageIdx: number = 0;
  public tempImageFiles: any[] = [];
  public categoryName: string = "";
  
  constructor(private restaurantsService:RestaurantsService, private modalService: NgbModal, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {

     //this.route.queryParams.subscribe(params => {console.log(params);});
    const catId = this.route.snapshot.paramMap.get('catId');
    this.route.snapshot.queryParams
    // console.log("[ngOnInit] Selected Category: " + catId)
    this.restaurantsService.getRestaurants(this.pageable);
    this.restaurantsService.restaurantsSub.subscribe((data)=>{
      if(data.length !=0){
        this.restaurants = Object.assign([],data);
        if (catId) {
          this.restaurants  = this.restaurants.filter( (rest:Restaurant) => { return rest.restaurantCategory?.restaurantCategoryId==catId; });
          this.categoryName = this.restaurants[0]?.restaurantCategory?.name;
        }
        this.fetching = false;
      } 
    })
  }

    // view image modal
    openImageModal(modal: any, imageUrls: string[], thumbnailImageIdx: number) {
      console.log(imageUrls);
      this.tempImageFiles = [...imageUrls];
      this.thumbnailImageIdx = thumbnailImageIdx;
      this.modalService.open(modal, { 
        size: "xl",
        scrollable: true 
      });
    }


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

export interface RestaurantCategory {
  restaurantCategoryId?: string;
  name?: string;
}