import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn : 'root'
})
export class RestaurantsService {

    private RESTAURANTS_URL =`${environment.apiBaseUrl}/restaurants`;

    constructor(private httpClient: HttpClient) { }

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