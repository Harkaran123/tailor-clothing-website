import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import {
  createProductFailure,
  createProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  findProductByIdFailure,
  findProductByIdSuccess,
  findProductsByCategoryFailure,
  findProductsByCategorySuccess,
  recentllyAddedProductsFailure,
  recentllyAddedProductsSuccess,
  updateProductFailure,
  updateProductSuccess,
} from './Actions';
import { ProductRequest } from 'src/app/Models/Product';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Get JWT token from localStorage

    // Set headers with the JWT token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  findProductsByCategory(reqData: ProductRequest) {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    // Construct HttpParams object with query parameters
    let params = new HttpParams()
      .set('color', colors)
      .set('size', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category)
      .set('stock', stock)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    // Get headers using the getHeaders() method (assuming it's defined somewhere)
    const headers = this.getHeaders();

    //RxJS Operators
    return this.http
      .get(`${this.API_BASE_URL}/api/products`, { headers, params })
      .pipe(
        // Map the response data to findProductsByCategorySuccess action
        map((data: any) => findProductsByCategorySuccess({ payload: data })),
        // Catch errors and map them to findProductsByCategoryFailure action
        catchError((error: any) => {
          return of(
            findProductsByCategoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

//Destructuring: Destructure the properties from the reqData object for easier access.

//HttpParams: Construct an HttpParams object to include query parameters for the HTTP GET request.

//Headers: Retrieve headers using the getHeaders() method. The method is assumed to be defined elsewhere in your code.

//HTTP GET Request: Use Angular's HttpClient.get method to make a GET request to the specified API endpoint (/api/products) with the constructed headers and parameters.

//RxJS Operators: Use RxJS operators (pipe, map, catchError) to handle the response and errors.

//map: Map the response data to the findProductsByCategorySuccess action with the payload.
//catchError: If there's an error, catch it and map it to the findProductsByCategoryFailure action. It checks if there is a response with an error message; otherwise, it uses a generic error message.
//Subscription: Subscribe to the observable returned by the pipe method. When an action is emitted, dispatch it to the Redux store using this.store.dispatch(action).

  findProductById(productId: any) {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.API_BASE_URL}/api/products/id/${productId}`, { headers })
      .pipe(
        map((data: any) => findProductByIdSuccess({ payload: data })),
        catchError((error: any) => {
          return of(
            findProductByIdFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  createProduct(product: any) {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.API_BASE_URL}/api/admin/products/`, product, {
        headers,
      })
      .pipe(
        map((data: any) => {
          console.log(' created product ', data);
          // this.router.navigate([
          //   `/${product.topLavelCategory}/${product.secondLavelCategory}/${product.thirdLavelCategory}`,
          // ]);
          return createProductSuccess(data);
        }),
        catchError((error: any) => {
          return of(
            createProductFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deleteProduct(productId: any) {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.API_BASE_URL}/api/admin/products/${productId}/delete`, {
        headers,
      })
      .pipe(
        map((data: any) => {
          console.log('data', data);
          return deleteProductSuccess({ payload: productId });
        }),
        catchError((error: any) => {
          return of(
            deleteProductFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  findRecentllyAddedProduct() {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.API_BASE_URL}/api/admin/products/recent`, { headers })
      .pipe(
        map((data: any) =>{
          console.log("recent product ",data)
          return recentllyAddedProductsSuccess({payload:data})}),
        catchError((error: any) => {
          return of(
            recentllyAddedProductsFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

}
function catchErro(arg0: () => void): import('rxjs').OperatorFunction<
  {
    payload: any;
  } & import('@ngrx/store/src/models').TypedAction<'[Product] Find Products By Category Success'>,
  any
> {
  throw new Error('Function not implemented.');
}
