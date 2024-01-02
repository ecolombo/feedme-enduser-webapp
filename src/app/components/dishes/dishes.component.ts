import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  public dishList:any[] =[];
  public dishInfo:any;

  public selectedImageIdx: number = 0;
  public thumbnailImageIdx: number = 0;
  public tempImageFile: any = "";
  public pagable:Pageable= { page:0, size:10, sort:'dishId', sortOrder:'DESC' };

  constructor(private dishesService:DishesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllDishes();
  }

  getAllDishes() {
    this.dishesService.getAll(this.pagable).subscribe((response:any)=> {
      //console.log(response);
      this.dishList = response.data.content;
    })
  }

  openModal(modelRef:any, dishObj = null) {
    this.modalService.open(modelRef, { size: "xl" });
    this.dishInfo = dishObj;
  }

  openViewModal(modelRef:any, dishObj = null) {
    this.modalService.open(modelRef, { size: "l" });
    this.dishInfo = dishObj;
  }
  
  // view image model
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

  delete(dishId:any) {
    this.dishesService.delete(dishId).subscribe(response=>{
      this.getAllDishes();
    })
  } 
  closeModel(modelRef:any) {
    this.modalService.dismissAll(modelRef);
  }
}
