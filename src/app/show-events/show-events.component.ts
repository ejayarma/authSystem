import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../events/event';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {
  @Input() events: Event[];
  @Input() btnType: string;
  constructor() { }

  ngOnInit(): void {
  }

}
