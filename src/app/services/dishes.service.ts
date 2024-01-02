import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class DishesService {

    private DISHES_URL =`${environment.apiBaseUrl}/dishes`;
    public dishesSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public dishesRetrieved:boolean = false;    

    constructor(private httpClient: HttpClient) { }

      /** Get Observable */
  public getDishes(pageable:Pageable) {
    console.log("[getDishes] Fetching:"+ `${this.DISHES_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`)
    this.httpClient.get(`${this.DISHES_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`)
    .subscribe( (response:any)=>{
      this.dishesSub.next(Object.assign([],response?.data.content)); // important to add .data. because of wrapping!
      this.dishesRetrieved = true;
    })
  }

    /** Get dish List */
    getAll(pageable:Pageable){
        return this.httpClient.get<any[]>(`${this.DISHES_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
    }

    /** Get one dish */
    getOne(dishId:number){
        return this.httpClient.get<any[]>(`${this.DISHES_URL}/${dishId}`);
    }

    /** Add dish */
    add(dishObj:any){
        return this.httpClient.post<any>(`${this.DISHES_URL}`,dishObj);
    }

    /** Update dish */
    update(dishObj:any){
        return this.httpClient.put<any>(`${this.DISHES_URL}`,dishObj);
    }

    /** Delete dish */
    delete(dishId:number){
        return this.httpClient.delete<any>(`${this.DISHES_URL}/${dishId}`);
    }
}