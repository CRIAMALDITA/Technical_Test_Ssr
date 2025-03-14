import { createFeatureSelector, createSelector } from '@ngrx/store';
import { clientState } from './client.reducer';

export const selectclientState = createFeatureSelector<clientState>('clients');

export const selectclients = createSelector(
  selectclientState,
  (state) => [...state.clients]
);

export const selectclientsLoading = createSelector(
  selectclientState,
  (state) => state.loading
);

export const selectclientsError = createSelector(
  selectclientState,
  (state) => state.error
);

export const selectShowRemoved = createSelector(
  selectclientState,
  (state) => state.showRemoved
);

export const selectFilteredClients = createSelector(
  selectclientState,
  selectShowRemoved,
  (state, showRemoved) => state.clients.filter(client => client.isDeleted === showRemoved)
);