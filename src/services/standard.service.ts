import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http:HttpClient,private hostServ:HostService) { }

  getStdByZone(zone:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/standardByZone",zone)
  }

  getstandardsMoisCourant(){
    return this.http.get("http://"+this.hostServ.host+":8080/standardsMoisCourant")
  }

  getAllStandards(){
    return this.http.get("http://"+this.hostServ.host+":8080/standards")
  }

  saveStandard(std:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/saveStandard",std)
  }

  deleteStandard(id:number):any{
    return this.http.delete("http://"+this.hostServ.host+":8080/deleteStandard/"+id)
  }
  
}
