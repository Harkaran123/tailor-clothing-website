import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/Models/user.model';
// import { User } from './user.model';

export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());

//createAction: This is a function provided by NgRx that creates an action with a specific type. It takes two arguments: the action type as a string and an object defining any associated metadata (in this case, using props).

//props<{ error: any }>(): The props function is used to define the payload structure for the action. In this case, the payload is an object with a property named error of type any. This allows you to include additional information about the login failure in the action payload.

//Action Type: The first argument to createAction is a string that represents the action type. In this case, it's [Auth] Login Failure. The square brackets [Auth] often denote the feature/module associated with the action, and the rest of the string provides a description of the action.
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const register = createAction('[Auth] Register', props<{user:User}>());
export const registerSuccess = createAction('[Auth] Register Success',props<{user:any}>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: any }>());
