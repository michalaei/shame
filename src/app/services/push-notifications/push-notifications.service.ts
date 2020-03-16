import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class PushNotificationsService {
  public permission: Permission;

  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  isSupported(): boolean {
    return 'Notification' in window;
  }

  async requestPermission(): Promise<void> {
    let self = this;
    if (this.isSupported()) {
      await Notification.requestPermission((status) => {
        return self.permission = status;
      });
    }
  }

  create(title: string, options ?: NotificationOptions): any {
    return new Observable((obs) => {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (this.permission !== 'granted') {
        console.log('The user hasn\'t granted you permission to send push notifications');
        obs.complete();
      }
      let notify: Notification = new Notification(title, options);
      notify.onshow = (e) => {
        return obs.next({
          notification: notify,
          event: e
        });
      };
      notify.onclick = (e) => {
        alert('Hello');
        return obs.next({
          notification: notify,
          event: e
        });
      };
      notify.onerror = (e) => {
        return obs.error({
          notification: notify,
          event: e
        });
      };
      notify.onclose = () => {
        return obs.complete();
      };
    });
  }

  generateNotification(source: Array<any>): void {
    let self = this;
    source.forEach((item) => {
      let options: NotificationOptions = {
        body: item.alertContent,
        icon: '../../../assets/images/favicon.ico',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        dir: 'ltr'
      };
      let notify = self.create(item.title, options).subscribe();
    });
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
