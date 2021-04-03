import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http : HttpClient,private hostServ:HostService) { }

  getCheckList(zone:any){
    return this.http.post(this.hostServ.host+"/tachesByZone",zone)
  }
  
  saveCheckList(zone, checklistCompleted:any){
    return this.http.post(this.hostServ.host+"/addHistoriqTache/"+zone,checklistCompleted)
  }

  getAllHistoriqCheckList(){
    return this.http.get(this.hostServ.host+"/getAllHistoriqChecklist")
  }

  getNombreTachesATraiter(){
    return this.http.get(this.hostServ.host+"/getNombreTachesATraiter")
  }

  getTachesATraiter(){
    return this.http.get(this.hostServ.host+"/getTachesATraiter")
  }

  getHistoriqTachesByHistoriqChecklist(historiqChecklist:any){
    return this.http.post(this.hostServ.host+"/getHistoriqTachesByHistoriqChecklist",historiqChecklist)
  }

  getTachesByZone(zone){
    return this.http.post(this.hostServ.host+"/tachesByZone",zone)
  }

  saveTache(tache){
    return this.http.post(this.hostServ.host+"/saveTache",tache)
  }

  updateImageForTask(map){
    return this.http.post(this.hostServ.host+"/updateImageForTask",map)
  }

  manyTachesToDelete(tachesToDeleteTab:any){
    return this.http.post(this.hostServ.host+"/manyTachesToDelete",tachesToDeleteTab)
  }

  deleteTache(idTache:any){
    return this.http.delete(this.hostServ.host+"/deleteTache/"+idTache)
  }

  addNewTask(task:any){
    return this.http.post(this.hostServ.host+"/addNewTask",task)
  }

  getTraitementTachesStatusAtraiterEtSolde(){
    return this.http.get(this.hostServ.host+"/getTraitementTachesStatusAtraiterEtSolde")
  }

  updateHistoriqTache(HistoriqTache:any){
    return this.http.post(this.hostServ.host+"/updateHistoriqTache",HistoriqTache)
  }
  
}
