import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantCategoriesService } from 'src/app/services/restaurantcategories.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  prodCategoryBool: boolean = true;
  restaurantCategoryForm:FormGroup = new FormGroup({});
  loader : boolean = false;
  tempFile: any;
  imageUrlError: any = '';

  @Input()
  public categoryInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private fb:FormBuilder, private categoryService: RestaurantCategoriesService) { }

  ngOnInit(): void {
    if(this.categoryInfo) {
      this.initialForm(this.categoryInfo);
    } else{
      this.initialForm();
    }
   
  }

  // COE Attention: use same names as in Webservice, for simple service implementation (pass json)

  initialForm(restaurantCategoryObj: any = null) {
    if (restaurantCategoryObj === null) {
      this.restaurantCategoryForm = this.fb.group({
        name: ["", Validators.required],
        description: ["", Validators.required],
        imageURL: [""],
        restaurantCategoryId: [null],
        addedOn: [],
      });
    } else {
      this.restaurantCategoryForm = this.fb.group({
        name: [restaurantCategoryObj.name, Validators.required],
        description: [restaurantCategoryObj.description, Validators.required],
        imageURL: [restaurantCategoryObj.imageURL],
        restaurantCategoryId: [restaurantCategoryObj.restaurantCategoryId],
      });
    }
  }

  onSubmit() {

    if(this.restaurantCategoryForm.valid) {
      if(this.restaurantCategoryForm.get('restaurantCategoryId')?.value) {
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
    this.categoryService.add(this.restaurantCategoryForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/restaurants/categories');
      window.location.href ="/restaurants/categories";
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.categoryService.update(this.restaurantCategoryForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/restaurants/categories";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {
    this.closeModel.emit();
  }
}
