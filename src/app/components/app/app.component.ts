import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select/select';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {changeRealityAction} from '../../actions/realities.actions';
import {System} from '../../models/system';
import {State} from '../../reducers';
import {getRealities, getSelectedReality, Reality} from '../../reducers/realities/realities.reducer';
import {getSystems} from '../../reducers/systems/systems.reducer';
import {PushNotificationsService} from '../../services/push-notifications/push-notifications.service';
import {RealitiesManagerService} from '../../services/realities-manager/realities-manager.service';
import {SystemsManagerService} from '../../services/systems-manager/systems-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  systems: Observable<System[]>;
  realities: Observable<Reality[]>;
  selectedReality: string;
  selectedRealityOb: Observable<string>;

  constructor(private pushNotificationsService: PushNotificationsService,
              private systemsManagerService: SystemsManagerService,
              private realitiesManagerService: RealitiesManagerService,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    this.pushNotificationsService.requestPermission().then();
    this.systemsManagerService.init();
    this.realitiesManagerService.init();
    this.systems = this.store.pipe(select(getSystems));
    this.realities = this.store.pipe(select(getRealities));
    const selectedRealityOb = this.store.pipe(select(getSelectedReality));
    this.selectedRealityOb = combineLatest([this.realities, selectedRealityOb]).pipe(map(([realities, selectedReality]) => {
      return realities.find(reality => reality.warriorReality === selectedReality) ? realities.find(reality => reality.warriorReality === selectedReality).name : '';
    }));
  }

  realitySelectionChanged({value}: MatSelectChange) {
    this.store.dispatch(changeRealityAction({selectedReality: value}));
  }

  notify(body: string, cardTitle: string) {
    const data: any[] = [];
    data.push({
      title: cardTitle,
      alertContent: body
    });
    this.pushNotificationsService.generateNotification(data);
  }
}
