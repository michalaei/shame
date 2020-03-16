import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {loadRealitiesAction} from '../../actions/realities.actions';
import {State} from '../../reducers';
import {loadSystemsAction} from '../../actions/system.actions';
import {System} from '../../models/system';
import {Reality} from '../../reducers/realities/realities.reducer';

@Injectable({providedIn: 'root'})
export class RealitiesManagerService {

  constructor(private httpClient: HttpClient,
              private stateStore: Store<State>) {
  }

  init() {
    this.httpClient.get('http://localhost:8080/realities', {withCredentials: false})
      .subscribe((realities: Reality[]) => {
        this.stateStore.dispatch(loadRealitiesAction({realities}));
      });
  }
}
