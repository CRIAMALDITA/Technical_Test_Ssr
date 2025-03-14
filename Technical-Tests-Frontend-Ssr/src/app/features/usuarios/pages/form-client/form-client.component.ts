import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addclient } from '../../store/client.actions';
import { client } from '../../models/client.model';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent {
  
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveclient() {
    if (this.clientForm.valid) {
      const newclient: client = {
        idClient: 0,
        name: this.clientForm.value.name,
        email: this.clientForm.value.email,
        isDeleted: false
      };

      this.store.dispatch(addclient({ client: newclient }));
      this.clientForm.reset();
    }
  }
}