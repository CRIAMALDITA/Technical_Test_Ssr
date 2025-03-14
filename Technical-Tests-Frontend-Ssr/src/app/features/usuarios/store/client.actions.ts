import { createAction, props } from '@ngrx/store';
import { client } from '../models/client.model';

export const loadclients = createAction('[clients] Load clients');
export const loadclientsSuccess = createAction(
  '[clients] Load clients Success',
  props<{ clients: client[] }>()
);
export const loadclientsFailure = createAction(
  '[clients] Load clients Failure',
  props<{ error: string }>()
);

export const addclient = createAction(
  '[clients] Add client',
  props<{ client: client }>()
);
export const addclientSuccess = createAction(
  '[clients] Add client Success',
  props<{ client: client }>()
);
export const addclientFailure = createAction(
  '[clients] Add client Failure',
  props<{ error: string }>()
);

export const deleteclient = createAction(
  '[clients] Delete client',
  props<{ id: number, isDeleted:boolean }>()
);
export const deleteclientSuccess = createAction(
  '[clients] Delete client Success',
  props<{ id: number, isDeleted:boolean }>()
);
export const deleteclientFailure = createAction(
  '[clients] Delete client Failure',
  props<{ error: string }>()
);

export const updateclient = createAction(
    '[clients] Update client',
    props<{ client: client }>()
  );

  export const updateclientSuccess = createAction(
    '[clients] Update client Success',
    props<{ client: client }>()
  );
  
  export const updateclientFailure = createAction(
    '[clients] Update client Failure',
    props<{ error: string }>()
  );

  export const toggleShowRemoved = createAction('[Client] Toggle Show Removed');