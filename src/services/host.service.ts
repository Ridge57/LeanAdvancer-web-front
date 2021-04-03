import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  //host = "https://leanfoundation-back-app.herokuapp.com"
  host="http://localhost:8080"
}