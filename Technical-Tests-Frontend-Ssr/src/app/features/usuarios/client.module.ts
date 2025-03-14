import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { clientReducer } from './store/client.reducer';
import { clientEffects } from './store/client.effects';
import { ListClientComponent } from './pages/list-client/list-client.component';
import { FormClientComponent } from './pages/form-client/form-client.component';
import { RemovedListClientComponent } from './pages/removed-list-client/removed-list-client.component';

@NgModule({
  declarations: [
    ListClientComponent,
    FormClientComponent,
    RemovedListClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    StoreModule.forFeature('clients', clientReducer), // Reducer
    EffectsModule.forFeature([clientEffects]) // Effects
  ],
  exports: [
    ListClientComponent,
    FormClientComponent,
    RemovedListClientComponent
  ]
})
export class clientModule { }