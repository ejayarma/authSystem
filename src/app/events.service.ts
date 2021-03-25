import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _eventsUrl = 'http://localhost:3000/api/events';
  private _specialEventUrl = 'http://localhost:3000/api/specialevents';

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
}
