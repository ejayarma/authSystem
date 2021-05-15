import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      year: new FormControl('')
    })
  });

  days: Array<number>;
  months: Array<string>;
  years: Array<number>;
  today = new Date();

  editMode:boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.days = this.getDays();
    this.months = this.getMonths();
    this.years = this.getYears();
    this._setDefaultDate();
  }

  createEvent(formValues: Event) {
    console.log(formValues);
  }

  getDays(): Array<number> {
    let a = new Array(28);
    for (let i = 0; i < a.length; i++) {
      a[i] = i + 1;
    }
    return a;
  }

  getMonths(): Array<string> {
    let a = new Array(
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    return a;
  }

  getYears(): Array<number> {
    let a = new Array()
    for (let i = 0; i < 101; i++) {
      a.push(1950 + i);
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
    let d: number, m: any, y: number;
    y = today.getFullYear();
    m = this.getMonths()[today.getMonth()]
    d = today.getDate();
    if (!date.value.day) {
      date.setValue({ day: d, month: m, year: y });
    }
  }

  cancel() {
    this.router.navigate(['../'])
  }

}
