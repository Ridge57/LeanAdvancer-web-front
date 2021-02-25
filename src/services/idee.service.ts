import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class IdeeService {


  constructor(private http:HttpClient,private hostServ:HostService) { }

  addIdee(idee:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/addIdee",idee)
  }

  getLast():any{
    return this.http.get("http://"+this.hostServ.host+":8080/derniereIdee")
  }

  getAll():any{
    return this.http.get("http://"+this.hostServ.host+":8080/idees")
  }
  findIdee(SearchParam:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/findIdee",SearchParam)
  }

  getTotalToday():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getTotalTodayIdee")
  }

  getSuggestionsProcessingRate():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getSuggestionsProcessingRate")
  }

  getNbreIdeesParMois(year:number){
    return this.http.get("http://"+this.hostServ.host+":8080/getNbreIdeesParMois/"+year)
  }
  
  getIdeesCurrentYear(year:number){
    return this.http.get("http://"+this.hostServ.host+":8080/getIdeesCurrentYear/"+year)
  }
  findIdeasByStatus(status:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/findIdeasByStatus",status)
  }

  getIdeaStatusList():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getIdeaStatusList")
  }

  getClosedIdeas():any {
     return this.http.get("http://"+this.hostServ.host+":8080/getClosedIdeas")
  }
 
  updateIdeeStatus(idee:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/updateIdeeStatus",idee)
  }
}
