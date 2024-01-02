import { Component, OnInit } from '@angular/core';
import { RestaurantCategoriesService } from 'src/app/services/restaurantcategories.service';
import { Pageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-catbrowser',
  templateUrl: './catbrowser.component.html',
  styleUrls: ['./catbrowser.component.css']
})
export class CatbrowserComponent implements OnInit {

  public restaurantCategories:any[]= [];
  fetching: boolean = true;
  public pageable:Pageable= { page:0, size:10, sort:'restaurantCategoryId', sortOrder:'DESC' };

  constructor(private restaurantCategorieservice:RestaurantCategoriesService) { }

  ngOnInit(): void {
    this.getrestaurantCategories();
  }

  getrestaurantCategories() {
    this.restaurantCategorieservice.getCategories(this.pageable);
    this.restaurantCategorieservice.categoriesSub.subscribe((data)=>{
      if(data.length !=0){
        this.restaurantCategories = Object.assign([],data);
        this.fetching = false;
      } 
    })
  }

}
