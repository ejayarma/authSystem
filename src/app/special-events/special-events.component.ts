import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { Event } from '../events/event';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})

export class SpecialEventsComponent implements OnInit {

  specialEvents: Event[];
  buttonType = 'btn-success';

  constructor(private _eventService: EventsService, 
    private _router: Router) { }

  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

}
