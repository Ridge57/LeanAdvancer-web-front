import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class IdeeService {


  constructor(private http: HttpClient, private hostServ: HostService) { }

  addIdee(idee: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/addIdee", idee, { headers })
  }

  getLast(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/derniereIdee", { headers })
  }

  getAll(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/idees", { headers })
  }
  findIdee(SearchParam: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/findIdee", SearchParam, { headers })
  }

  getTotalToday(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getTotalTodayIdee", { headers })
  }

  getSuggestionsProcessingRate(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getSuggestionsProcessingRate", { headers })
  }

  getNbreIdeesParMois(year: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getNbreIdeesParMois/" + year, { headers })
  }

  getIdeesCurrentYear(year: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getIdeesCurrentYear/" + year, { headers })
  }
  findIdeasByStatus(status: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/findIdeasByStatus", status, { headers })
  }

  getIdeaStatusList(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getIdeaStatusList", { headers })
  }

  getClosedIdeas(): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getClosedIdeas", { headers })
  }

  updateIdeeStatus(idee: any): any {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/updateIdeeStatus", idee, { headers })
  }
}
