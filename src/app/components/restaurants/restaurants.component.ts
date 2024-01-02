import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  public restaurantList:any[] =[];
  public restaurantInfo:any;

  public selectedImageIdx: number = 0;
  public thumbnailImageIdx: number = 0;
  public tempImageFiles: any[] = [];
  public pagable:Pageable= { page:0, size:10, sort:'restaurantId', sortOrder:'DESC' };

  constructor(private restaurantsService:RestaurantsService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllRestaurant();
  }

  getAllRestaurant() {
    this.restaurantsService.getAll(this.pagable).subscribe((response:any)=> {
      //console.log(response);
      this.restaurantList = response.data.content;
    })
  }

  openModal(modelRef:any, restaurantObj = null) {
    this.modalService.open(modelRef, { size: "xl" });
    this.restaurantInfo = restaurantObj;
  }

  openViewModal(modelRef:any, restaurantObj = null) {
    this.modalService.open(modelRef, { size: "l" });
    this.restaurantInfo = restaurantObj;
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

  // open image
  openImage(url: string) {
      window.open(url, "_blank")
  }

  delete(restaurantId:any) {
    this.restaurantsService.delete(restaurantId).subscribe(response=>{
      this.getAllRestaurant();
    })
  } 
  closeModel(modelRef:any) {
    this.modalService.dismissAll(modelRef);
  }
}
