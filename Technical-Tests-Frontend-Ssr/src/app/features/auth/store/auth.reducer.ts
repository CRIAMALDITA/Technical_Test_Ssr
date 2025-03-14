import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  client: { clientname: string; role: string } | null;
}

export const initialState: AuthState = {
  client: null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { client }) => ({
    ...state,
    client
  })),
  on(logout, (state) => ({
    ...state,
    client: null
  }))
);