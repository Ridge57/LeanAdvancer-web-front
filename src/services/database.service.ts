import { Injectable } from '@angular/core';
import { HostService } from 'src/services/host.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient, private hostServ: HostService) { }

  exportDataBase(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/exportDatabase", { headers })
  }

}
