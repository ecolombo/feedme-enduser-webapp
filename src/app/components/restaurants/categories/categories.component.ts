import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { RestaurantCategoriesService } from 'src/app/services/restaurantcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categoriesList:any[] =[];
  public categoryInfo:any;
  public pageable:Pageable= { page:0, size:10, sort:'restaurantCategoryId', sortOrder:'DESC' };
  public tempImageFile: any = "";

  constructor(private categoriesService:RestaurantCategoriesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAll(this.pageable).subscribe( (response:any)=> {
      // console.log(response);
      this.categoriesList = response.data.content;
    })
  }
  openRestaurantCategoryDialog(modelRef:any, restaurantCategoryObj = null) {
    this.modalService.open(modelRef);
    this.categoryInfo = restaurantCategoryObj;
  }

  closeModel(modelRef:any) {
    this.modalService.dismissAll(modelRef);
  }

  delete(categoryId:any) {
    this.categoriesService.delete(categoryId).subscribe((response:any ) => {
      this.getAllCategories();
    });
  }

 openImageModal(modal: any, imageURL: string) {
  console.log(imageURL);
  this.tempImageFile = imageURL;
  this.modalService.open(modal, { 
    size: "xl",
    scrollable: true 
  });
}

// open image
openImage(url: string) {
  window.open(url, "_blank")
}

}
