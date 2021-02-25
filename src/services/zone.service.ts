import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  
  getAllZones():any{
    return this.http.get("http://"+this.hostServ.host+":8080/zones")
  }

  getZonesSortedByNbIrritant(year:any):any{
    return this.http.get("http://"+this.hostServ.host+":8080/getZonesSortedByNbIrritant/"+year)
  }

  saveZone(zone:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/Zone",zone)
  }

  deleteZone(idZone:number){
    return this.http.delete("http://"+this.hostServ.host+":8080/deleteZone/"+idZone)
  }
}
