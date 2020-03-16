import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {System} from '../../models/system';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-system-card',
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.css']
})
export class SystemCardComponent implements OnInit {
  @Input() system: System;
  @Output() clickEmitter: EventEmitter<string>;

  constructor(private httpClient: HttpClient) {
    this.clickEmitter = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  click() {
    console.log('clicked');
    this.httpClient.post('http://localhost:8080/systems', {data: 'hello'}, {withCredentials: false})
      .subscribe((d: { data: string }) => {
        this.clickEmitter.emit(d.data);
      });
  }
}
