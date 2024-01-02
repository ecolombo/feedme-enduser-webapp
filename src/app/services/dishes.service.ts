import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn : 'root'
})
export class DishesService {

    private DISHES_URL =`${environment.apiBaseUrl}/dishes`;

    constructor(private httpClient: HttpClient) { }

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