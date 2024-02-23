import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartSuccess, removeCartItemFailure, removeCartItemSuccess, updateCartItemFailure, updateCartItemSuccess } from './cart.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_BASE_URL = BASE_API_URL;
  private headers;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  addItemToCart(reqData: any) {
     // Construct the URL for the cart add endpointcart/add`;
    const url = `${this.API_BASE_URL}/api/cart/add`;

    // Set up the headers with authorization and content type
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    // Make a PUT request to add the item to the cart
    return this.http
      .put(url, reqData, { headers })
      .pipe(
         // Map the response data to the addItemToCartSuccess action
        map((data: any) => {
          return addItemToCartSuccess({payload:data});
        }),
        // Catch errors and map them to addItemToCartFailure action
        catchError((error: any) => {
          return of(addItemToCartFailure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

//Construct URL: Construct the URL for the cart add endpoint using the API_BASE_URL.

//Set Headers: Set up the HTTP headers with the authorization token (JWT) and content type as JSON.

//HTTP PUT Request: Use Angular's HttpClient.put method to make a PUT request to the specified API endpoint (/api/cart/add). The request includes the URL, request data (reqData), and headers.

//RxJS Operators: Use RxJS operators (pipe, map, catchError) to handle the response and errors.

//map: If the request is successful, map the response data to the addItemToCartSuccess action with the payload.
//catchError: If there's an error, catch it and map it to the addItemToCartFailure action. It checks if there is a response with an error message; otherwise, it uses a generic error message.
//Subscription: Subscribe to the observable returned by the pipe method. When an action is emitted, dispatch it to the Redux store using this.store.dispatch(action).

  getCart() {
    const url = `${this.API_BASE_URL}/api/cart/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers }).pipe(
      map((data:any)=>{
        return getCartSuccess({payload:data})
      }),
      catchError((error: any) => {
        return of(getCartFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  removeCartItem(cartItemId:Number) {
    const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers }).pipe(
      map((data:any)=>removeCartItemSuccess({cartItemId})),
      catchError((error: any) => {
        return of(removeCartItemFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    // Construct the URL for the API endpoint
    const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;

    // Set up the headers with authorization and content type
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    // Make a PUT request to update the cart item
    return this.http.put(url, reqData.data, { headers }).pipe(  
      map((data:any)=>updateCartItemSuccess({payload:data})),
      catchError((error: any) => {
        return of(updateCartItemFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
      //You subscribe to the observable returned by the pipe method. 
      //When an action is emitted, you dispatch it to the Redux store using 
    ).subscribe((action) => this.store.dispatch(action));
  }
}
