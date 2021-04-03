import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class IdeeService {


  constructor(private http:HttpClient,private hostServ:HostService) { }

  addIdee(idee:any):any{
    return this.http.post(this.hostServ.host+"/addIdee",idee)
  }

  getLast():any{
    return this.http.get(this.hostServ.host+"/derniereIdee")
  }

  getAll():any{
    return this.http.get(this.hostServ.host+"/idees")
  }
  findIdee(SearchParam:any):any{
    return this.http.post(this.hostServ.host+"/findIdee",SearchParam)
  }

  getTotalToday():any{
    return this.http.get(this.hostServ.host+"/getTotalTodayIdee")
  }

  getSuggestionsProcessingRate():any{
    return this.http.get(this.hostServ.host+"/getSuggestionsProcessingRate")
  }

  getNbreIdeesParMois(year:number){
    return this.http.get(this.hostServ.host+"/getNbreIdeesParMois/"+year)
  }
  
  getIdeesCurrentYear(year:number){
    return this.http.get(this.hostServ.host+"/getIdeesCurrentYear/"+year)
  }
  findIdeasByStatus(status:any):any{
    return this.http.post(this.hostServ.host+"/findIdeasByStatus",status)
  }

  getIdeaStatusList():any{
    return this.http.get(this.hostServ.host+"/getIdeaStatusList")
  }

  getClosedIdeas():any {
     return this.http.get(this.hostServ.host+"/getClosedIdeas")
  }
 
  updateIdeeStatus(idee:any):any{
    return this.http.post(this.hostServ.host+"/updateIdeeStatus",idee)
  }
}
