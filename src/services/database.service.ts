import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  exportDataBase():any{
    return this.http.get(this.hostServ.host+"/exportDatabase")
  }

}
