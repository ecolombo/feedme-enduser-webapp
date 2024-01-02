import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DishesService } from 'src/app/services/dishes.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Pageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-adddish',
  templateUrl: './adddish.component.html',
  styleUrls: ['./adddish.component.css']
})
export class AdddishComponent implements OnInit {

  prodDishBool: boolean = true;
  dishForm:FormGroup = new FormGroup({});
  loader : boolean = false;
  tempFile: any;
  imageUrlError: any = '';
  restaurantList:any[] =[];
  public pageable:Pageable= { page:0, size:50, sort:'restaurantId', sortOrder:'DESC' };
  

  @Input()
  public dishInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private fb:FormBuilder, private dishService: DishesService, private restaurantsService:RestaurantsService) { 
  }

  ngOnInit(): void {

    if(this.dishInfo) {
      this.initialForm(this.dishInfo);
    } else{
      this.initialForm();
    }

    // load restaurants and make sure to update selected option after loading succeeded (better code async?)
    this.restaurantsService.getAll(this.pageable).subscribe( (response:any)=> {
      this.restaurantList = response.data.content;
      //console.log("[loadRestaurants] restaurantList:");
      //console.log(this.restaurantList);
      if(this.dishInfo) { this.onSelectOption(this.dishInfo.restaurant); }
    });
  }


  // COE Attention: use same names as in Webservice, for simple service implementation (pass json)

  initialForm(dishObj: any = null) {
    if (dishObj === null) {
      this.dishForm = this.fb.group({
        name: ["", Validators.required],
        description: ["", Validators.required],
        imageURL: [""],
        dishId: [null],
        addedOn: [],
        price: [],
        restaurant: [null]
      });
    } else {
      this.dishForm = this.fb.group({
        name: [dishObj.name, Validators.required],
        description: [dishObj.description, Validators.required],
        imageURL: [dishObj.imageURL],
        dishId: [dishObj.dishId],
        price: [dishObj.price],
        restaurant: [dishObj.restaurant],
      });
      this.onSelectOption(dishObj.restaurant);
    }
  }

  onSelectOption(restaurant: any) {
    
    if (restaurant) {
      this.dishForm.patchValue({
        restaurant: this.restaurantList.find(x => x.restaurantId === restaurant.restaurantId)
      })
    }
    // console.log("[onSelectOption] restaurantId: " + restaurant.restaurantId);
    // console.log("[onSelectOption] restaurantList:");
    // console.log(this.restaurantList);
    // console.log("[onSelectOption] " + this.restaurantList.find(x => x.restaurantId === restaurant.restaurantId));
  }

  compareByRestaurantId(restaurant1: Restaurant, restaurant2: Restaurant) {
    return restaurant1 && restaurant2 && restaurant1.restaurantId === restaurant2.restaurantId;
  }
  
  onSubmit() {

    if(this.dishForm.valid) {
      if(this.dishForm.get('dishId')?.value) {
        this.handleUpdate();
      } else{
        this.handleCreate();
      }
    } else{
      this.errResponse = "Unable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

  handleCreate() {
    this.dishService.add(this.dishForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/restaurants/dishes');
      window.location.href ="/dishes";
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.dishService.update(this.dishForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/dishes";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {
    this.closeModel.emit();
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