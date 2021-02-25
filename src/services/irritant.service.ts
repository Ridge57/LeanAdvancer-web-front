import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HostService } from 'src/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class IrritantService {

  constructor(private http:HttpClient, private hostServ:HostService) { }

  addIrritant(irr:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/Irritant",irr)
  }

  getAll(){
    return this.http.get("http://"+this.hostServ.host+":8080/irritants")
  }

  findByStatus(status:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/findByStatus",status)
  }

  getIrritantsCurrentYear(year:number){
    return this.http.get("http://"+this.hostServ.host+":8080/getIrritantsCurrentYear/"+year)
  }

  findIrritant(SearchParam:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/findIrritant",SearchParam)
  }
  
  getZones():any{
    return this.http.get("http://"+this.hostServ.host+":8080/zones")
  }

  getLast():any{
    return this.http.get("http://"+this.hostServ.host+":8080/dernier")
  }

  getStatusList():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getStatusList")
  }

  updateIrritantStatus(irritant:any):any{
    return this.http.post("http://"+this.hostServ.host+":8080/updateIrritantStatus",irritant)
  }

  getCategories():any{
    return this.http.get("http://"+this.hostServ.host+":8080/categories")
  }

  addCategorie(cat:any){
    return this.http.post("http://"+this.hostServ.host+":8080/Categorie",cat)
  }

  deleteCat(idCat:number){
    return this.http.delete("http://"+this.hostServ.host+":8080/deleteCat/"+idCat)
  }

  getTotalToday():any{
    return this.http.get("http://"+this.hostServ.host+":8080/getTotalToday")
  }

  getIrritantProcessingRate(){
    return this.http.get("http://"+this.hostServ.host+":8080/getIrrProcessingRate")
  }
  getNbreIrritantsParMois(year:number):any{
    return this.http.get("http://"+this.hostServ.host+":8080/getNbreIrritantsParMois/"+year)
  }
  
  getSortedCategoriesIrritant(year:number):any{
    return this.http.get("http://"+this.hostServ.host+":8080/getSortedCategoriesIrritant/"+year)
  }
}
