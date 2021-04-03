import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  
  getAllZones():any{
    return this.http.get(this.hostServ.host+"/zones")
  }

  getZonesSortedByNbIrritant(year:any):any{
    return this.http.get(this.hostServ.host+"/getZonesSortedByNbIrritant/"+year)
  }

  saveZone(zone:any):any{
    return this.http.post(this.hostServ.host+"/Zone",zone)
  }

  deleteZone(idZone:number){
    return this.http.delete(this.hostServ.host+"/deleteZone/"+idZone)
  }
}
