import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http : HttpClient,private hostServ:HostService) { }

  getCheckList(zone:any){
    return this.http.post("http://"+this.hostServ.host+":8080/tachesByZone",zone)
  }
  
  saveCheckList(zone, checklistCompleted:any){
    return this.http.post("http://"+this.hostServ.host+":8080/addHistoriqTache/"+zone,checklistCompleted)
  }

  getAllHistoriqCheckList(){
    return this.http.get("http://"+this.hostServ.host+":8080/getAllHistoriqChecklist")
  }

  getNombreTachesATraiter(){
    return this.http.get("http://"+this.hostServ.host+":8080/getNombreTachesATraiter")
  }

  getTachesATraiter(){
    return this.http.get("http://"+this.hostServ.host+":8080/getTachesATraiter")
  }

  getHistoriqTachesByHistoriqChecklist(historiqChecklist:any){
    return this.http.post("http://"+this.hostServ.host+":8080/getHistoriqTachesByHistoriqChecklist",historiqChecklist)
  }

  getTachesByZone(zone){
    return this.http.post("http://"+this.hostServ.host+":8080/tachesByZone",zone)
  }

  saveTache(tache){
    return this.http.post("http://"+this.hostServ.host+":8080/saveTache",tache)
  }

  updateImageForTask(map){
    return this.http.post("http://"+this.hostServ.host+":8080/updateImageForTask",map)
  }

  manyTachesToDelete(tachesToDeleteTab:any){
    return this.http.post("http://"+this.hostServ.host+":8080/manyTachesToDelete",tachesToDeleteTab)
  }

  addNewTask(task:any){
    return this.http.post("http://"+this.hostServ.host+":8080/addNewTask",task)
  }

  getTraitementTachesStatusAtraiterEtSolde(){
    return this.http.get("http://"+this.hostServ.host+":8080/getTraitementTachesStatusAtraiterEtSolde")
  }

  updateHistoriqTache(HistoriqTache:any){
    return this.http.post("http://"+this.hostServ.host+":8080/updateHistoriqTache",HistoriqTache)
  }
  
}
