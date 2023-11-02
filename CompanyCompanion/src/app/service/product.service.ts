import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductMagazine } from '../models/productMagazine';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrlProducts = 'https://localhost:7037/api/ProductMagazines/';

  constructor(private http: HttpClient) {}

  getProducts():Observable<ProductMagazine[]> {
    return this.http.get<ProductMagazine[]>(this.apiUrlProducts);
  }
  getProductByCode(code: string):Observable<ProductMagazine> {
    return this.http.get<ProductMagazine>(this.apiUrlProducts + code);
  }
  getProductsByName(name: string):Observable<ProductMagazine[]> {
    return this.http.get<ProductMagazine[]>(this.apiUrlProducts + 'name/' + name);
  }
  updateProductByCode(product: ProductMagazine):Observable<ProductMagazine> {
    return this.http.put<ProductMagazine>(this.apiUrlProducts, product);
  }
  createProduct(product: ProductMagazine):Observable<ProductMagazine>  {
    return this.http.post<ProductMagazine>(this.apiUrlProducts, product);
  }
  deleteProduct(code: string):Observable<ProductMagazine>  {
    return this.http.delete<ProductMagazine>(this.apiUrlProducts + code);
  }
}
