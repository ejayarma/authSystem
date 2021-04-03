import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];

  constructor(private _eventService: EventsService) { }

  ngOnInit(): void {
    this._eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    );
  }

}
