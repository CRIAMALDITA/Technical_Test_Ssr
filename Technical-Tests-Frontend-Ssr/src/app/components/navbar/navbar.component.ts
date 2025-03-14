import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectclient } from 'src/app/features/auth/store/auth.selectors';
import { logout} from 'src/app/features/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  client$: Observable<{ clientname: string; role: string } | null>;

  constructor(private store: Store) {
    this.client$ = this.store.select(selectclient);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}