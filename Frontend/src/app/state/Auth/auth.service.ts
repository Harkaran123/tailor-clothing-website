import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/Models/user.model';
import { BASE_API_URL } from 'src/app/config/api';
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = BASE_API_URL + '/auth';

  constructor(private http: HttpClient, private store: Store) {}

  login(loginData: any) {
    return this.http
      .post<User>(`${this.apiUrl}/signin`, loginData)
      // Map the response data to loginSuccess action
      .pipe(
        //If the request is successful, 
        //map the response data to the loginSuccess action.
        //If the response contains a JWT token, it is stored in the local storage. 
        //The action is then returned.
        map((user: any) => {
          console.log("login user ",user)

          // If the response contains a JWT token, store it in local storage
          if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
          }

          // Dispatch the loginSuccess action with the user data
          return loginSuccess({ user });
        }),
        //Catch errors and map them to loginFailure action
        //If there's an error, catch it and map it to the loginFailure action.
        // It checks if there is a response with an error message, otherwise, 
        //it uses a generic error message.
        catchError((error) => {
          return of(
            loginFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  register(data: User) {
    const registerData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    console.log('registerr data ', registerData);
    return this.http
      .post(`${this.apiUrl}/signup`, registerData)
      .pipe(
        map((data:any) => {
          if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
          }
          return registerSuccess({ user: data });
        }),
        catchError((error) => {
          console.error('Error registering', error);
          return of(
            registerFailure(
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
