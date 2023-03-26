import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient, private hostServ: HostService) { }

  getCheckList(zone: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/tachesByZone", zone, { headers })
  }

  saveCheckList(zone, checklistCompleted: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/addHistoriqTache/" + zone, checklistCompleted, { headers })
  }

  getAllHistoriqCheckList() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getAllHistoriqChecklist", { headers })
  }

  getNombreTachesATraiter() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getNombreTachesATraiter", { headers })
  }

  getTachesATraiter() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getTachesATraiter", { headers })
  }

  getHistoriqTachesByHistoriqChecklist(historiqChecklist: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/getHistoriqTachesByHistoriqChecklist", historiqChecklist, { headers })
  }

  getTachesByZone(zone) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/tachesByZone", zone, { headers })
  }

  saveTache(tache) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/saveTache", tache, { headers })
  }

  updateImageForTask(map) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/updateImageForTask", map, { headers })
  }

  manyTachesToDelete(tachesToDeleteTab: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/manyTachesToDelete", tachesToDeleteTab, { headers })
  }

  deleteTache(idTache: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.delete(this.hostServ.host + "/deleteTache/" + idTache, { headers })
  }

  addNewTask(task: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/addNewTask", task, { headers })
  }

  getTraitementTachesStatusAtraiterEtSolde() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.get(this.hostServ.host + "/getTraitementTachesStatusAtraiterEtSolde", { headers })
  }

  updateHistoriqTache(HistoriqTache: any) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("accessToken"))
    return this.http.post(this.hostServ.host + "/updateHistoriqTache", HistoriqTache, { headers })
  }

}
