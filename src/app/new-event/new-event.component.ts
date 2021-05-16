import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    attendance_type: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    venue: new FormControl(''),
    date: new FormGroup({
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      hours: new FormControl(''),
      mins: new FormControl('')
    })
  });

  days: Array<number>;
  months: Array<string>;
  years: Array<number>;
  hours: Array<number>;
  mins: Array<number>;
  today = new Date();

  editMode:boolean;

  constructor(private _auth: AuthService,private _eventService: EventsService, 
    private _router: Router) {
  }

  ngOnInit(): void {
    this.days = this._getDays();
    this.months = this._getMonths();
    this.years = this._getYears();
    this.hours = this._getHours();
    this.mins = this._getMinutes();
    this._setDefaultDate();
  }

  createEvent(formValues) {
    let date = formValues.date;
    let d = date.day, m = date.month, y = date.year;
    let hours = date.hours, minutes = date.mins;
    let date_str = d + '-' + m + '-' + y
    let new_date = new Date(date_str);
    new_date.setHours(hours);
    new_date.setMinutes(minutes);
    formValues.date = new_date;
    formValues.user_id = '';
    this._eventService.saveNewEvent(formValues).subscribe(event => {
      this._router.navigate(['/my-events']);
    });
  }

  _getDays(): Array<number> {
    let a = new Array(28);
    for (let i = 0; i < a.length; i++) {
      a[i] = i + 1;
    }
    return a;
  }

  _getMonths(): Array<string> {
    let a = new Array(
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    return a;
  }

  _getYears(): Array<number> {
    let a = new Array()
    for (let i = 0; i < 101; i++) {
      a.push(1950 + i);
    }
    return a;
  }

  _getHours(): Array<number> {
    let a = new Array()
    for (let i = 0; i < 24; i++) {
      a.push(i);
    }
    return a;
  }
  
  _getMinutes(): Array<number> {
    let a = new Array()
    for (let i = 0; i < 60; i++) {
      a.push(i);
    }
    return a;
  }

  isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
  }

  hasOnlyThirty(m: string): boolean {
    let months = ['Sep', 'Apr', 'Jun', 'Nov'];
    return months.includes(m);
  }

  _setDefaultDate() {
    let today = new Date();
    let date = this.eventForm.controls.date;
    let d, m, y, h, min;
    y = today.getFullYear();
    m = this._getMonths()[today.getMonth()]
    d = today.getDate();
    h = today.getHours();
    min = today.getMinutes();
    date.setValue({ day: d, month: m, year: y, hours: h, mins: min});
  }

  cancel() {
    this._router.navigate(['../'])
  }

}
