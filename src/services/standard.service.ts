import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http: HttpClient, private hostServ: HostService) { }

  getStdByZone(zone: any): any {
    return this.http.post(this.hostServ.host + "/standardByZone", zone)
  }

  getstandardsMoisCourant() {
    return this.http.get(this.hostServ.host + "/standardsMoisCourant")
  }

  getAllStandards() {
    return this.http.get(this.hostServ.host + "/standards")
  }

  saveStandard(etapes: any, titre: string, idZone: number): any {
    return this.http.post(this.hostServ.host + "/saveStandard/" + titre + "/" + idZone, etapes)
  }

  deleteStandard(id: number): any {
    return this.http.delete(this.hostServ.host + "/deleteStandard/" + id)
  }

}
