import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http: HttpClient, private hostServ: HostService) { }

  getStdByZone(zone: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/standardByZone", zone, { headers })
  }

  getstandardsMoisCourant() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/standardsMoisCourant", { headers })
  }

  getAllStandards() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/standards", { headers })
  }

  getStandardById(id: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getStandard/" + id, { headers })
  }

  getAllStandardSteps(idStd: number): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/standardsteps/" + idStd, { headers })
  }

  saveStandard(data: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/saveStandard", data, { headers })
  }

  deleteStandard(id: number): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.delete(this.hostServ.host + "/deleteStandard/" + id, { headers })
  }

}
