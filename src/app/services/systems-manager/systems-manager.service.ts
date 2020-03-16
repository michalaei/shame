import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import {loadSystemsAction} from '../../actions/system.actions';
import {System} from '../../models/system';

@Injectable({providedIn: 'root'})
export class SystemsManagerService {

  constructor(private httpClient: HttpClient,
              private stateStore: Store<State>) {
  }

  init() {
    this.httpClient.post('http://localhost:8080/systems', null, {headers: {reality: '0'}, withCredentials: false})
      .subscribe((systems: System[]) => {
        this.stateStore.dispatch(loadSystemsAction({systems}));
      });
  }
}

