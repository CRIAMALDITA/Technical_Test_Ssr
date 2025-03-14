import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectclient = createSelector(
  selectAuthState,
  (state) => state.client
);

export const selectclientRole = createSelector(
  selectAuthState,
  (state) => state.client?.role
);