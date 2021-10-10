import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:Category[];
  categorySubject=new Subject<Category[]>();
  constructor(private httpClient:HttpClient) {
    this.getCategoryFromServer();
   }
   emitCategory():void{
     this.categorySubject.next(this.categories);
   }
   getCategoryFromServer():void{
    const url=`${environment.API+'category?'+environment.API_KEY}`;
    this.httpClient.get(url).subscribe(
      (response:Result)=>{
        if(response.status==200){
           this.categories=response.result;
           this.emitCategory();
        }else{
          console.log(response.message);
        }
      }
    )
   }
}
