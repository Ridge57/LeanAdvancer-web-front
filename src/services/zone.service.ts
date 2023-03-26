import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient, private hostServ: HostService) { }


  getAllZones(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/zones", { headers })
  }

  getZonesSortedByNbIrritant(year: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getZonesSortedByNbIrritant/" + year, { headers })
  }

  saveZone(zone: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/Zone", zone, { headers })
  }

  deleteZone(idZone: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.delete(this.hostServ.host + "/deleteZone/" + idZone, { headers })
  }
}
