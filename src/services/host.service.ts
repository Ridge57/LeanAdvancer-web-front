import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  //host = "https://lean-foundation-back.herokuapp.com/"
  host = "http://localhost:8080"
}