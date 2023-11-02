import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductMagazine } from '../models/productMagazine';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts():Observable<ProductMagazine[]> {
    return this.http.get<ProductMagazine[]>(ApiConfig.productMAgazineApiUrl);
  }
  getProductByCode(code: string):Observable<ProductMagazine> {
    return this.http.get<ProductMagazine>(ApiConfig.productMAgazineApiUrl + code);
  }
  getProductsByName(name: string):Observable<ProductMagazine[]> {
    return this.http.get<ProductMagazine[]>(ApiConfig.productMAgazineApiUrl + 'name/' + name);
  }
  updateProductByCode(product: ProductMagazine):Observable<ProductMagazine> {
    return this.http.put<ProductMagazine>(ApiConfig.productMAgazineApiUrl, product);
  }
  createProduct(product: ProductMagazine):Observable<ProductMagazine>  {
    return this.http.post<ProductMagazine>(ApiConfig.productMAgazineApiUrl, product);
  }
  deleteProduct(code: string):Observable<ProductMagazine>  {
    return this.http.delete<ProductMagazine>(ApiConfig.productMAgazineApiUrl + code);
  }
}
