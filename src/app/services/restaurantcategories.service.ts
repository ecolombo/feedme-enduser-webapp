import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../model/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCategoriesService {

  private CATG_URL =`${environment.apiBaseUrl}/restaurantCategories`;

  constructor(private httpClient: HttpClient) { }


  /** Get category List */
  getAll(pageable:Pageable){
      return this.httpClient.get<any[]>(`${this.CATG_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
  }

  /** Get one category */
  getOne(categoryId:number){
      return this.httpClient.get<any[]>(`${this.CATG_URL}/${categoryId}`);
  }

  /** Add category */
  add(categoryObj:any){
      console.log("[add]:"+ categoryObj);
      return this.httpClient.post<any>(`${this.CATG_URL}`,categoryObj);
  }

  /** Update category */
  update(categoryObj:any){
    console.log("[update]:"+ categoryObj);
      return this.httpClient.put<any>(`${this.CATG_URL}`,categoryObj);
  }

  /** Delete category */
  delete(categoryId:number){
      return this.httpClient.delete<any>(`${this.CATG_URL}/${categoryId}`);
  }
}
