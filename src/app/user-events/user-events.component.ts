import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Event } from '../events/event';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {

  myEvents: Event[];
  buttonType = 'btn-success';

  constructor(private _eventService: EventsService) { }


  ngOnInit(): void {
    this._eventService.getUserEvents().subscribe(data => {
      this.myEvents = data;
    })
  }
 
}
