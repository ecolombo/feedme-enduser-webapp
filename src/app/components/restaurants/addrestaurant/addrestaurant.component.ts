import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { RestaurantCategoriesService } from 'src/app/services/restaurantcategories.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent implements OnInit {

  restaurantForm: FormGroup = new FormGroup({});
//  restaurantModel: Restaurants | undefined;
  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;
  tempImageFiles: any[] = [];
  doUpdate: boolean = false;
  loader: boolean = false;
  categoryList:any[] =[];
  showImageUrlInput:boolean = false;
  imageUrlError:any ='';
  public pageable:Pageable= { page:0, size:50, sort:'restaurantCategoryId', sortOrder:'DESC' };


  @Input()
  public restaurantInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  errResponse: string="";

  constructor(private modalService: NgbModal,  private fb:FormBuilder,private restaurantCategoriesService:RestaurantCategoriesService,
    private restaurantService:RestaurantsService) { }

  ngOnInit(): void {
    

    this.restaurantCategoriesService.getAll(this.pageable).subscribe( (response:any)=> {
      this.categoryList = response.data.content;
      // console.log(response);
      //console.log(this.categoryList);
    });

    if(this.restaurantInfo) {
      this.initialiseRestaurantModal(this.restaurantInfo);
    }else{
      this.initialiseRestaurantModal();
    }
  }

  initialiseRestaurantModal(restaurantObj: any = null) {
    if (restaurantObj == null) {
      this.doUpdate = false;
      this.restaurantForm = this.fb.group({
        restaurantId: [],
        name: [null],
        imageUrls: this.fb.array([]),
        thumbnailImage: [null],
        description: [null],
        restaurantCategory: [null],
        addedOn: [new Date()],
        newimageurl: ''
      });
    } else {
      this.doUpdate = true;
      this.restaurantForm = this.fb.group({
        restaurantId: [restaurantObj.restaurantId],
        name: [restaurantObj.name],
        imageUrls: [restaurantObj.imageUrls],
        thumbnailImage: [restaurantObj.thumbnailImage],
        description: [restaurantObj.description],
        restaurantCategory: [restaurantObj.restaurantCategory],
        addedOn: [restaurantObj.addedOn],
        newimageurl: ''
      });
      this.onSelectOption(restaurantObj.restaurantCategory);
      this.tempImageFiles = restaurantObj.imageUrls || [];
    }
  }

  onSelectOption(category: any) {
    this.restaurantForm.patchValue({
      category: this.categoryList.find(x => x.categoryId === category.categoryId)
    })
  }

  close() {
    this.closeModel.emit();
  }

  // open image
  openImage(url: string) {
    window.open(url, "_blank")
  }

  removeImage(idx: number) {
    this.tempImageFiles.splice(idx, 1);
  }

  changeThumbnailImageIdx(idx: number) {
    this.restaurantForm.patchValue({
      thumbnailImage: idx
    })
  }

  // old, remove:
  checkImageFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        // this.toast.warning("Only .png/.jpeg/.jpg file format accepted!!", file.name + " will not accepted.");
      }
    });
  }

  addImageURL() {
    var url = this.restaurantForm.get('newimageurl')?.value;
    console.log("[addImageURL]: Adding URL" + this.restaurantForm.get('newimageurl')?.value);
    if (this.isValidUrl(url)) {
      console.log("[addImageURL]: the entered URL seems valid! Adding " + url);
      this.tempImageFiles.push(this.restaurantForm.get('newimageurl')?.value);
      this.imageUrlError="";
      this.restaurantForm.get('newimageurl')?.setValue("");
      this.toggleAddImageURLDialog();
    } else {
      console.log("[addImageURL]: the entered URL seems not valid!");
      this.imageUrlError="The URL is invalid and can not be added!";
      
    }
  }

	isValidUrl(urlString:any) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

  compareByCategoryId(category1: restaurantCategory, category2: restaurantCategory) {
    return category1 && category2 && category1.restaurantCategoryId === category2.restaurantCategoryId;
  }

  onSubmit() {
    if(this.restaurantForm.valid) {
      if(this.restaurantForm.get('restaurantId')?.value) {
        this.handleUpdate();
      } else{
        this.handleCreate();
      }
    } else{
      this.errResponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

  handleCreate() {
    this.restaurantService.add(this.restaurantForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/users');
      window.location.href ="/restaurants";
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    console.log("Hallo");
    console.log(this.restaurantForm.getRawValue());

    this.restaurantService.update(this.restaurantForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/restaurants";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  toggleAddImageURLDialog() {
    console.log("[toggleAddImageURLDialog]");
    this.showImageUrlInput = !this.showImageUrlInput; 
  }
}


/**
export interface Restaurants {
  restaurantId?: string;
  name?: string;
  description?: string;
  restaurantCategory?: restaurantCategory;
  imageUrls?: string[];
  thumbnailImage?: number;
  addedOn?: Date;
}*/

export interface restaurantCategory {
  restaurantCategoryId?: string;
  name?: string;
}