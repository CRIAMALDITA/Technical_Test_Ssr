import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { client } from '../../models/client.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectclients, selectShowRemoved  } from '../../store/client.selectors';
import { deleteclient, loadclients, toggleShowRemoved, updateclient } from '../../store/client.actions';

@Component({
  selector: 'app-removed-list-client',
  templateUrl: './removed-list-client.component.html',
  styleUrls: ['./removed-list-client.component.scss']
})
export class RemovedListClientComponent implements OnInit {

  clients$: Observable<client[]>;
  filteredClients$: Observable<client[]>;
  showRemoved$: Observable<boolean>;
  filterGlobal = new BehaviorSubject<string>('');
  filterControl = new FormControl('');

  constructor(private store: Store<{ usuarios: client[] }>, private fb: FormBuilder) {

    this.clients$ = this.store.select(selectclients);
    this.filteredClients$ = combineLatest([this.clients$, this.filterGlobal]).pipe(
      map(([clients, filterText]) => 
        clients
          .filter(client => client.isDeleted)
          .filter(client =>
            client.name.toLowerCase().includes(filterText.toLowerCase()) ||
            client.email.toLowerCase().includes(filterText.toLowerCase())
          )
      )
    );
    this.showRemoved$ = this.store.select(selectShowRemoved);
  }

  ngOnInit() {
    this.store.dispatch(loadclients());
  }
  onHideList(){
    this.store.dispatch(toggleShowRemoved());
  }
  filter(event: any) {
    this.filterGlobal.next(event.target.value);
  }

  recoverclient(client: client) {
    const updatedClient = { ...client, isDeleted: false };
    this.store.dispatch(updateclient({ client: updatedClient }));
  }

  deleteclient(id: number) {
    this.store.dispatch(deleteclient({ id, isDeleted: true }));
  }
}