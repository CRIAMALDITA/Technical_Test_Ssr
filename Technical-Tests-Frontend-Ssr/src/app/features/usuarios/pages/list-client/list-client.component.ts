import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { client } from '../../models/client.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectclients, selectShowRemoved  } from '../../store/client.selectors';
import { toggleShowRemoved, deleteclient, loadclients, updateclient } from '../../store/client.actions';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clients$: Observable<client[]>;
  filteredClients$: Observable<client[]>;
  showRemoved$: Observable<boolean>;
  filterGlobal = new BehaviorSubject<string>('');
  editMode: boolean = false;
  clientEditForm: FormGroup;
  clientInEditMode!: client;
  filterControl = new FormControl('');

  constructor(private store: Store<{ usuarios: client[] }>, private fb: FormBuilder) {
    this.clientEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.clients$ = this.store.select(selectclients);
    this.filteredClients$ = combineLatest([this.clients$, this.filterGlobal]).pipe(
      map(([clients, filterText]) => 
        clients
          .filter(client => !client.isDeleted)
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
  onRemoveBtn(){
    this.store.dispatch(toggleShowRemoved());
  }
  filter(event: any) {
    this.filterGlobal.next(event.target.value);
  }

  editclient(client: client) {
    this.clientEditForm.patchValue(client);
    this.clientInEditMode = client;
    this.editMode = true;
  }

  updateclient() {
    if (this.clientEditForm.valid && this.clientInEditMode) {
      this.clientInEditMode = {
        ...this.clientInEditMode,
        ...this.clientEditForm.value
      };
      this.store.dispatch(updateclient({ client: this.clientInEditMode }));
      this.editMode = false;
    }
  }

  deleteclient(id: number) {
    this.store.dispatch(deleteclient({ id, isDeleted: false}));
  }
}