import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {take} from 'rxjs/operators';
import {loadStats} from '../../actions/stats.actions';
import {loadSystemsAction} from '../../actions/system.actions';
import {System, SystemStat} from '../../models/system';
import {State} from '../../reducers';
import {getSelectedReality, Reality} from '../../reducers/realities/realities.reducer';
import {PushNotificationsService} from '../push-notifications/push-notifications.service';

@Injectable({providedIn: 'root'})
export class SystemsManagerService {
  private sockets: WebSocketSubject<any>;

  constructor(private pushNotificationsService: PushNotificationsService,
              private httpClient: HttpClient,
              private stateStore: Store<State>) {
    this.sockets = new WebSocketSubject('ws://localhost:9090');
    this.sockets.subscribe((message: { server: string, reality: Reality, status: 'down' }) => {
      console.log('Got new Message', message);
      this.notify(`server ${message.server} is ${message.status} in reality ${message.reality.name}`,
        `${message.server} is ${message.status}`);
    });
  }

  notify(body: string, cardTitle: string) {
    const data: any[] = [];
    data.push({
      title: cardTitle,
      alertContent: body
    });
    this.pushNotificationsService.generateNotification(data);
  }

  init() {
    const selectedReality = this.stateStore.pipe(select(getSelectedReality));
    selectedReality.subscribe((reality) => {
      this.httpClient.post('http://localhost:8080/systems', null, {headers: {reality: reality.toString()}, withCredentials: false})
        .subscribe((systems: System[]) => {
          this.stateStore.dispatch(loadSystemsAction({systems}));
        });
    });
  }

  getStat(serverId: number) {
    const selectedReality = this.stateStore.pipe(select(getSelectedReality));
    selectedReality.pipe(take(1)).subscribe(reality => {
      this.httpClient.post('http://localhost:8080/statistic', {serverId}, {headers: {reality: reality.toString()}, withCredentials: false})
        .subscribe((systemStat: SystemStat) => {
          this.stateStore.dispatch(loadStats({stats: systemStat}));
        });
    });
  }
}

