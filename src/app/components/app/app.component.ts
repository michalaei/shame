import {Component} from '@angular/core';
import {PushNotificationsService} from '../../services/push-notifications/push-notifications.service';
import {System} from '../../models/system';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  systems: System[] = [{
    name: 'Attack Demand',
    teamName: 'FireCore',
    freeText: 'They are mostly down all the time',
    icon: 'fas fa-fire'
  },
    {
      name: 'Operational Plan',
      teamName: 'FireCore',
      freeText: 'They are mostly down all the time',
      icon: 'fas fa-fire'
    }, {
      name: 'Candies',
      teamName: 'Ng - Green Blah',
      freeText: 'They are mostly down all the time',
      icon: 'fas fa-bomb'
    }, {
      name: 'Plannings',
      teamName: 'FireCore',
      freeText: 'They are mostly down all the time',
      icon: 'fas fa-fire'
    }
  ];

  constructor(private pushNotificationsService: PushNotificationsService) {
    this.pushNotificationsService.requestPermission().then();
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
