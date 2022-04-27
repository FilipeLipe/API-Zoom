import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MeetingDTO } from './core/model';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const apiUrl = 'http://localhost:8080/WebServiceZoom/webresources/zoom/';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  pathCreateMeeting = 'http://localhost:8080/WebServiceZoom/webresources/zoom/Meeting/Create';
  pathDeleteMeeting = 'http://localhost:8080/WebServiceZoom/webresources/zoom/Meeting/Delete';

  constructor(
    private http: HttpClient

  ){

  } 
  
  public CreateMeeting(body: any): Observable<MeetingDTO> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<MeetingDTO>(this.pathCreateMeeting, body, {headers: headers});
  }

  public DeleteMeeting(idMeeting: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<any>(this.pathDeleteMeeting, idMeeting, {headers: headers});
  }
  
  
}
