import { createReducer, on } from '@ngrx/store';
import { client } from '../models/client.model';
import { toggleShowRemoved, updateclientSuccess, loadclients, loadclientsSuccess, loadclientsFailure, addclientSuccess, deleteclientSuccess } from './client.actions';

export interface clientState {
  clients: client[];
  loading: boolean;
  error: string | null;
  showRemoved: boolean;
}

export const initialState: clientState = {
  clients: [],
  loading: false,
  error: null,
  showRemoved: false
};

export const clientReducer = createReducer(
  initialState,
  on(loadclients, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadclientsSuccess, (state, { clients }) => ({
    ...state,
    clients,
    loading: false
  })),
  on(loadclientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addclientSuccess, (state, { client }) => ({
    ...state,
    clients: [...state.clients, client]
  })),

  on(deleteclientSuccess, (state, { id, isDeleted }) => ({
    ...state,
    clients: isDeleted
      ? state.clients.filter(client => client.idClient !== id)
      : state.clients.map(client =>
          client.idClient === id ? { ...client, isDeleted: true } : client
        )
  })),
  on(updateclientSuccess, (state, { client }) => ({
    ...state,
    clients: state.clients.map(u => 
      u.idClient === client.idClient ? { ...client } : u
    )
  })),
  on(toggleShowRemoved, (state) => ({
    ...state,
    showRemoved: !state.showRemoved,
  }))
);