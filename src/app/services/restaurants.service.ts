import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class RestaurantsService {

    private RESTAURANTS_URL =`${environment.apiBaseUrl}/restaurants`;
    public restaurantsSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public restaurantsRetrieved:boolean = false;
  

    constructor(private httpClient: HttpClient) { }

  /** Get Observable */
  public getRestaurants(pageable:Pageable) {
    console.log("[getRestaurants] Fetching:"+ `${this.RESTAURANTS_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`)
    this.httpClient.get(`${this.RESTAURANTS_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`)
    .subscribe( (response:any)=>{
      this.restaurantsSub.next(Object.assign([],response?.data.content)); // important to add .data. because of wrapping!
      this.restaurantsRetrieved = true;
    })
  }


    /** Get restaurant List */
    getAll(pageable:Pageable){
        return this.httpClient.get<any[]>(`${this.RESTAURANTS_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
    }

    /** Get one restaurant */
    getOne(restaurantId:number){
        return this.httpClient.get<any[]>(`${this.RESTAURANTS_URL}/${restaurantId}`);
    }

    /** Add restaurant */
    add(restaurantObj:any){
        return this.httpClient.post<any>(`${this.RESTAURANTS_URL}`,restaurantObj);
    }

    /** Update restaurant */
    update(restaurantObj:any){
        return this.httpClient.put<any>(`${this.RESTAURANTS_URL}`,restaurantObj);
    }

    /** Delete restaurant */
    delete(restaurantId:number){
        return this.httpClient.delete<any>(`${this.RESTAURANTS_URL}/${restaurantId}`);
    }
}