import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './events/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _eventsUrl = 'http://localhost:3000/events/';
  private _specialEventUrl = 'http://localhost:3000/events/specialevents';
  private _saveEventUrl = 'http://localhost:3000/events/save-event';
  private _userEventsUrl = 'http://localhost:3000/events/user-events';

  constructor(private http: HttpClient) { }

  getEvents() : Observable<Event[]> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};
    return this.http.get<Event[]>(this._eventsUrl, options);
  }

  getSpecialEvents() : Observable<Event[]> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};
    return this.http.get<Event[]>(this._specialEventUrl, options);
  }

  getUserEvents() : Observable<Event[]> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};
    return this.http.get<Event[]>(this._userEventsUrl, options);
  }

  saveNewEvent(event: Event) : Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};
    return this.http.post<Event[]>(this._saveEventUrl, event, options);
  }
}
