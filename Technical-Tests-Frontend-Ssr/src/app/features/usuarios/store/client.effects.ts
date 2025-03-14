import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateclient, updateclientSuccess, updateclientFailure, loadclients, loadclientsSuccess, loadclientsFailure, addclient, addclientSuccess, deleteclient, deleteclientSuccess } from './client.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { clientService } from 'src/app/core/services/client.service';

@Injectable()
export class clientEffects {

  constructor(private actions$: Actions, private clientService: clientService) {}

  loadclients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadclients),
      mergeMap(() =>
        this.clientService.getclients().pipe(
          map(clients => loadclientsSuccess({ clients })),
          catchError(error => of(loadclientsFailure({ error: error.message })))
        )
      )
    )
  );

  addclient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addclient),
        mergeMap(action =>
        this.clientService.addclient(action.client).pipe(
          map(client => addclientSuccess({ client })),
          catchError(error => of({ type: '[clients] Add client Failure', error: error.message }))
        )
      )
    )
  );

  deleteclient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteclient),
      mergeMap(action =>
        this.clientService.deleteclient(action.id, action.isDeleted).pipe(
          map(() => deleteclientSuccess({ id: action.id, isDeleted: action.isDeleted })),
          catchError(error => of({ type: '[clients] Delete client Failure', error: error.message }))
        )
      )
    )
  );
  updateclient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateclient),
      mergeMap(action =>
        this.clientService.updateclient(action.client, action.client.idClient ?? -1).pipe(
          map(client =>{ 
            console.log('[Effects] Usuario actualizado recibido:', client);
            return updateclientSuccess({ client })
        }),
          catchError(error => of(updateclientFailure({ error: error.message })))
        )
      )
    )
  );
}